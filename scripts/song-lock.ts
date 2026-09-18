/**
 * 鍵付きの曲の本体を暗号化する（docs/decisions/021）。手元でだけ実行する。CI は Drive を見ない。
 *
 *   npm run song:lock   Drive の平文 ukulele/<id>.json を検査して暗号化し、src/instruments/ukulele/songs/locked/<id>.json へ書く
 *
 * パスフレーズと salt は ao-hawaii と共有する。--init は持たない（salt を新しく作ると ao-hawaii と分岐するため）。
 * 正本は Drive の ao-hawaii-private/keyinfo.json。リポジトリの song-keyinfo.json がそれと一致しなければ書かずに終了する。
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
import { decryptJson, deriveKey, encryptJson, type KeyInfo } from "../src/core/lock/crypto.ts";
import { UKULELE_SONGS } from "../src/instruments/ukulele/songs/index.ts";
import type { SongBody } from "../src/instruments/ukulele/songs/types.ts";
import { songBodyErrors } from "../src/instruments/ukulele/songs/validate.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SONGS_DIR = path.join(ROOT, "src", "instruments", "ukulele", "songs");
const KEYINFO_PATH = path.join(SONGS_DIR, "song-keyinfo.json");
const LOCKED_DIR = path.join(SONGS_DIR, "locked");
const aad = (id: string) => `ukulele:${id}`;

function privateDir(): string {
  const candidates = [
    process.env.AO_HAWAII_PRIVATE,
    ...(process.platform === "win32" ? ["G:\\マイドライブ\\ao-hawaii-private"] : []),
    ...(() => {
      const cloud = path.join(homedir(), "Library", "CloudStorage");
      if (!existsSync(cloud)) return [];
      return readdirSync(cloud)
        .filter((d) => d.startsWith("GoogleDrive-"))
        .map((d) => path.join(cloud, d, "マイドライブ", "ao-hawaii-private"));
    })(),
  ].filter((p): p is string => !!p);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error(`Drive の ao-hawaii-private が見つかりません。環境変数 AO_HAWAII_PRIVATE に場所を入れてください（候補: ${candidates.join(" / ")}）`);
  return found;
}

/** Drive の keyinfo.json を正本にして、リポジトリのコピーと一致することを確かめる */
function loadKeyInfo(dir: string): KeyInfo {
  const masterPath = path.join(dir, "keyinfo.json");
  if (!existsSync(masterPath)) throw new Error(`正本 ${masterPath} がありません。ao-hawaii で npm run mele:lock を1回実行すると作られます`);
  const master = readFileSync(masterPath, "utf8").trim();
  if (!existsSync(KEYINFO_PATH)) {
    writeFileSync(KEYINFO_PATH, master + "\n", "utf8");
    console.log(`song-keyinfo.json を正本から写しました: ${path.relative(ROOT, KEYINFO_PATH)}`);
  } else if (readFileSync(KEYINFO_PATH, "utf8").trim() !== master) {
    throw new Error(`song-keyinfo.json が正本（${masterPath}）と一致しません。ao-hawaii の mele-keyinfo.json と同じ内容に直してください`);
  }
  return JSON.parse(master) as KeyInfo;
}

async function lock(dir: string): Promise<void> {
  const passPath = path.join(dir, "passphrase.txt");
  if (!existsSync(passPath)) throw new Error(`パスフレーズ ${passPath} がありません（ao-hawaii の mele:lock --init が作るもの）`);
  const info = loadKeyInfo(dir);
  const key = await deriveKey(readFileSync(passPath, "utf8").trim(), info);

  const srcDir = path.join(dir, "ukulele");
  const files = existsSync(srcDir) ? readdirSync(srcDir).filter((f) => f.endsWith(".json")) : [];
  if (files.length === 0) {
    console.log(`暗号化する平文がありません: ${srcDir}`);
    return;
  }
  mkdirSync(LOCKED_DIR, { recursive: true });

  let failed = false;
  for (const file of files) {
    const id = file.replace(/\.json$/, "");
    const song = UKULELE_SONGS.find((s) => s.id === id);
    if (!song || song.licensing.status !== "protected") {
      console.error(`✗ ${id}: songs/index.ts に status: "protected" の曲として登録されていません`);
      failed = true;
      continue;
    }
    const body = JSON.parse(readFileSync(path.join(srcDir, file), "utf8")) as SongBody;
    const errors = [
      ...(body.progression ? [] : [`${id}: 鍵付きの曲は progression が必須です`]),
      ...songBodyErrors(id, song.chords, body),
    ];
    if (errors.length > 0) {
      console.error(`✗ ${id}: 検査に通りません（暗号化しません）\n  ${errors.join("\n  ")}`);
      failed = true;
      continue;
    }
    const env = await encryptJson(body, key, aad(id));
    const back = await decryptJson<SongBody>(env, key, aad(id));
    if (JSON.stringify(back) !== JSON.stringify(body)) throw new Error(`${id}: 暗号化の往復で内容が一致しません`);
    writeFileSync(path.join(LOCKED_DIR, `${id}.json`), JSON.stringify(env) + "\n", "utf8");
    console.log(`✓ ${id}: ${lyricCount(body)}行の歌詞コード譜とお手本を暗号化しました`);
  }
  if (failed) process.exitCode = 1;
}

function lyricCount(body: SongBody): number {
  return body.sheet.split("\n").filter((l) => l.trim()).length;
}

await lock(privateDir());
