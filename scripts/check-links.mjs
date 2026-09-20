import { readFileSync, readdirSync, statSync } from "node:fs";
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

// HEAD を拒む（404・405・403・5xx）サーバーや、混み合って切れる相手があるので、GET で2回まで試し直す
async function probe(url) {
  let status = await request(url, "HEAD");
  if (status === 200) return status;
  for (const wait of [0, 3000]) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    status = await request(url, "GET");
    if (status !== 0 && status !== 404) return status;
  }
  return status;
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
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      results.set(url, await probe(url));
    }
  }),
);

const dead = [];
const blocked = [];
for (const [url, status] of results) {
  const files = [...byUrl.get(url)].join(", ");
  if (status === 0 || status === 404 || status === 410) dead.push(`${status || "接続不能"} ${url}  ← ${files}`);
  else if (status === 403 || status === 429 || status === 503) blocked.push(`${status} ${url}`);
}
const ok = urls.length - dead.length - blocked.length;
console.log(`\n正常 ${ok} / 要目視（自動アクセス拒否） ${blocked.length} / 切れ ${dead.length}`);
if (dead.length) console.log(`\n## 切れ\n${dead.sort().join("\n")}`);
if (blocked.length) console.log(`\n## 要目視\n${blocked.sort().join("\n")}`);
