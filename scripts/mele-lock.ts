/**
 * 保護曲の本体を暗号化する（docs/decisions/008）。手元でだけ実行する。CI は Drive を見ない。
 *
 *   npm run mele:lock -- --init   パスフレーズ（Drive）とサイト共通の salt（リポジトリ）を作る。既にあれば何もしない
 *   npm run mele:lock             Drive の平文 mele/<id>.json を検査して暗号化し、src/content/mele-locked/<id>.json へ書く
 *
 * 平文とパスフレーズは Drive の ao-hawaii-private/ にだけ置く。場所は環境変数 AO_HAWAII_PRIVATE、
 * 無ければ Windows の G:\マイドライブ、Mac の ~/Library/CloudStorage/GoogleDrive-* /マイドライブ を探す。
 *
 * パスフレーズも歌詞も画面に出さない（会話ログに残るため）。検査の失敗文だけは該当行を含む。
 * Node の型除去で直接動かすので、import には拡張子 .ts を付ける。
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MELE } from "../src/content/mele.ts";
import { decryptJson, deriveKey, encryptJson, randomBytes, toBase64, type KeyInfo } from "../src/lib/lock/crypto.ts";
import type { MeleBody } from "../src/mele/types.ts";
import { validateBody } from "../src/mele/validate.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KEYINFO_PATH = path.join(ROOT, "src", "content", "mele-keyinfo.json");
const LOCKED_DIR = path.join(ROOT, "src", "content", "mele-locked");
const ITERATIONS = 600_000;
// 紛らわしい字（0/o、1/l/i）を除いた31字。20字で約99ビット
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

function privateDir(): string {
  const candidates = [
    process.env.AO_HAWAII_PRIVATE,
    // Mac では path.dirname("G:\\…") が "." になって存在判定が通ってしまうので、Windows でだけ候補に入れる
    ...(process.platform === "win32" ? ["G:\\マイドライブ\\ao-hawaii-private"] : []),
    ...(() => {
      const cloud = path.join(homedir(), "Library", "CloudStorage");
      if (!existsSync(cloud)) return [];
      return readdirSync(cloud)
        .filter((d) => d.startsWith("GoogleDrive-"))
        .map((d) => path.join(cloud, d, "マイドライブ", "ao-hawaii-private"));
    })(),
  ].filter((p): p is string => !!p);
  const found = candidates.find((p) => existsSync(path.dirname(p)));
  if (!found) throw new Error(`Drive が見つかりません。環境変数 AO_HAWAII_PRIVATE に ao-hawaii-private の場所を入れてください（候補: ${candidates.join(" / ")}）`);
  return found;
}

function generatePassphrase(): string {
  const bytes = randomBytes(20);
  const chars = [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join("");
  return chars.match(/.{4}/g)!.join("-");
}

function init(dir: string): void {
  mkdirSync(path.join(dir, "mele"), { recursive: true });
  const passPath = path.join(dir, "passphrase.txt");
  if (existsSync(passPath)) {
    console.log("passphrase.txt は既にあります（作り直しません）");
  } else {
    writeFileSync(passPath, generatePassphrase() + "\n", "utf8");
    console.log(`passphrase.txt を作りました（中身は表示しません）: ${passPath}`);
  }
  if (existsSync(KEYINFO_PATH)) {
    console.log("mele-keyinfo.json は既にあります（作り直しません）");
  } else {
    const info: KeyInfo = { v: 1, salt: toBase64(randomBytes(16)), iterations: ITERATIONS };
    writeFileSync(KEYINFO_PATH, JSON.stringify(info, null, 2) + "\n", "utf8");
    console.log(`mele-keyinfo.json を作りました: ${path.relative(ROOT, KEYINFO_PATH)}`);
  }
  syncKeyInfo(dir);
}

/**
 * salt は instrument-lessons と共有する（あちらの DDR 021）。正本は Drive の keyinfo.json。
 * 無ければリポジトリの値を正本として書き、あれば一致を確かめる。作り直すと両サイトの暗号文が読めなくなる。
 */
function syncKeyInfo(dir: string): KeyInfo {
  const masterPath = path.join(dir, "keyinfo.json");
  const repo = readFileSync(KEYINFO_PATH, "utf8").trim();
  if (!existsSync(masterPath)) {
    writeFileSync(masterPath, repo + "\n", "utf8");
    console.log(`Drive に keyinfo.json（salt の正本）を置きました: ${masterPath}`);
  } else if (readFileSync(masterPath, "utf8").trim() !== repo) {
    throw new Error(`mele-keyinfo.json が正本（${masterPath}）と一致しません。正本に合わせてください（instrument-lessons と共有）`);
  }
  return JSON.parse(repo) as KeyInfo;
}

async function lock(dir: string): Promise<void> {
  const passPath = path.join(dir, "passphrase.txt");
  if (!existsSync(passPath) || !existsSync(KEYINFO_PATH)) throw new Error("先に npm run mele:lock -- --init を実行してください");
  const info = syncKeyInfo(dir);
  const key = await deriveKey(readFileSync(passPath, "utf8").trim(), info);

  const srcDir = path.join(dir, "mele");
  const files = existsSync(srcDir) ? readdirSync(srcDir).filter((f) => f.endsWith(".json")) : [];
  if (files.length === 0) {
    console.log(`暗号化する平文がありません: ${srcDir}`);
    return;
  }
  mkdirSync(LOCKED_DIR, { recursive: true });

  let failed = false;
  for (const file of files) {
    const id = file.replace(/\.json$/, "");
    const meta = MELE.find((m) => m.id === id);
    if (!meta || meta.protection !== "locked") {
      console.error(`✗ ${id}: src/content/mele.ts に protection: "locked" として登録されていません`);
      failed = true;
      continue;
    }
    const body = JSON.parse(readFileSync(path.join(srcDir, file), "utf8")) as MeleBody;
    const errors = validateBody(id, body);
    if (errors.length > 0) {
      console.error(`✗ ${id}: 検査に通りません（暗号化しません）\n  ${errors.join("\n  ")}`);
      failed = true;
      continue;
    }
    const env = await encryptJson(body, key, id);
    const back = await decryptJson<MeleBody>(env, key, id);
    if (JSON.stringify(back) !== JSON.stringify(body)) throw new Error(`${id}: 暗号化の往復で内容が一致しません`);
    writeFileSync(path.join(LOCKED_DIR, `${id}.json`), JSON.stringify(env) + "\n", "utf8");
    const lines = body.stanzas.reduce((n, s) => n + s.lines.length, 0);
    console.log(`✓ ${id}: ${body.stanzas.length}連 ${lines}行を暗号化しました`);
  }
  if (failed) process.exitCode = 1;
}

const dir = privateDir();
if (process.argv.includes("--init")) init(dir);
else await lock(dir);
