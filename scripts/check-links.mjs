import { appendFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * 本文と出典欄の外部リンクを全部叩き、切れているものを一覧する。npm run links
 *
 * 対象: content/ の MDX、src/content/ の TS（用語集・メレ・年表）、images.json の sourceUrl と licenseUrl。
 * images.json の credit 欄は Commons から写した文字列でリンクとして出ないので見ない。
 * 判定: 404・410・接続不能を「切れ」とする。403・429・503 は自動アクセスを拒む応答で、
 * ブラウザでは開けることが多いので「要目視」に分ける。
 */
const ROOTS = ["content", "src/content"];
const CONCURRENCY = 12;
const TIMEOUT_MS = 25_000;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
// 同じホストで接続不能が続けてこの本数に達したら、そのホストの残りは叩かずに「要目視」へまとめる。
// wehe.hilo.hawaii.edu（約190本）は GitHub Actions の一部のマシンからの接続に応答せず、1本ずつ時間切れを待つと
// 検査が数時間かかった（2026-09-28。同時に叩く本数を2本に絞っても応答しなかった）
const HOST_DOWN_AFTER = 3;
// 手元からは開けるが GitHub Actions からは接続できないホスト（2026-09-28 の初回実行と再実行で確認）。
// 接続不能のときだけ「切れ」にせず「要目視」へ回す。404・410 は従来どおり「切れ」にする
const UNREACHABLE_FROM_CI = new Set(["rainfall.geography.hawaii.edu"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(mdx|ts|json)$/.test(name)) out.push(p);
  }
  return out;
}

function extract(file) {
  const text = readFileSync(file, "utf8");
  if (file.endsWith("images.json")) {
    return JSON.parse(text).flatMap((img) => [img.sourceUrl, img.licenseUrl]).filter(Boolean);
  }
  const urls = [];
  for (const m of text.matchAll(/https?:\/\/[^\s"'<>`\]）]+/g)) {
    let u = m[0];
    // Commons のファイル名などに丸括弧が入るので、閉じ括弧は対応が取れる分だけ残す
    while (u.endsWith(")") && (u.match(/\)/g) ?? []).length > (u.match(/\(/g) ?? []).length) u = u.slice(0, -1);
    u = u.replace(/[.,、。]+$/, "");
    urls.push(u);
  }
  return urls;
}

async function request(url, method) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { method, redirect: "follow", headers: { "user-agent": UA }, signal: ctrl.signal });
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

// HEAD を拒む（404・405・403・5xx）サーバーや、混み合うと 410 を返す相手（arts.gov）があるので、GET で2回まで試し直す
async function probe(url) {
  let status = await request(url, "HEAD");
  if (status === 200) return status;
  for (const wait of [0, 3000]) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    status = await request(url, "GET");
    if (status !== 0 && status !== 404 && status !== 410) return status;
  }
  return status;
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

const SKIPPED = -1;
const hostMisses = new Map();
const downHosts = new Set();
async function probeHost(url) {
  const host = hostOf(url);
  if (downHosts.has(host)) return SKIPPED;
  const status = await probe(url);
  if (status !== 0) hostMisses.set(host, 0);
  else if ((hostMisses.get(host) ?? 0) + 1 >= HOST_DOWN_AFTER) downHosts.add(host);
  else hostMisses.set(host, (hostMisses.get(host) ?? 0) + 1);
  return status;
}

async function runPool(list) {
  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < list.length) {
        const url = list[cursor++];
        results.set(url, await probeHost(url));
      }
    }),
  );
}

const byUrl = new Map();
for (const root of ROOTS) {
  for (const file of walk(root)) {
    for (const url of extract(file)) {
      if (!byUrl.has(url)) byUrl.set(url, new Set());
      byUrl.get(url).add(file);
    }
  }
}
const urls = [...byUrl.keys()];
console.log(`${urls.length} 本のリンクを検査します`);

const results = new Map();
await runPool(urls);

// 一時的に落ちているだけのサーバーがある（soest.hawaii.edu など）。切れと出たものは1分おいてもう一度だけ試す
const suspects = [...results]
  .filter(([u, s]) => (s === 0 || s === 404 || s === 410) && !downHosts.has(hostOf(u)))
  .map(([u]) => u);
if (suspects.length) {
  await new Promise((r) => setTimeout(r, 60_000));
  await runPool(suspects);
}

const dead = [];
const blocked = [];
let blockedUrls = 0;
for (const host of downHosts) {
  const hostUrls = urls.filter((u) => hostOf(u) === host);
  const skipped = hostUrls.filter((u) => results.get(u) === SKIPPED).length;
  blocked.push(`接続不能（${HOST_DOWN_AFTER}本続けて届かず、${hostUrls.length}本中${skipped}本は未検査） ${host}`);
  blockedUrls += hostUrls.length;
}
for (const [url, status] of results) {
  const files = [...byUrl.get(url)].join(", ");
  if (downHosts.has(hostOf(url))) continue;
  if (status === 0 && UNREACHABLE_FROM_CI.has(hostOf(url))) {
    blocked.push(`接続不能（GitHub から届かないホスト） ${url}`);
    blockedUrls++;
  } else if (status === 0 || status === 404 || status === 410) dead.push(`${status || "接続不能"} ${url}  ← ${files}`);
  else if (status === 403 || status === 429 || status === 503) {
    blocked.push(`${status} ${url}`);
    blockedUrls++;
  }
}
const ok = urls.length - dead.length - blockedUrls;
console.log(`\n正常 ${ok} / 要目視（自動アクセス拒否・接続不能） ${blockedUrls} / 切れ ${dead.length}`);
if (dead.length) console.log(`\n## 切れ\n${dead.sort().join("\n")}`);
if (blocked.length) console.log(`\n## 要目視\n${blocked.sort().join("\n")}`);

// 週1回の自動実行（.github/workflows/links.yml）で、切れがあればジョブを失敗させて持ち主にメールで知らせる
if (process.env.GITHUB_STEP_SUMMARY) {
  const summary = [`正常 ${ok} / 要目視 ${blockedUrls} / 切れ ${dead.length}`, ...dead.map((d) => `- ${d}`)].join("\n");
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
}
if (dead.length) process.exitCode = 1;
