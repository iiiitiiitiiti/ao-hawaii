/*
 * Wikimedia Commons から画像を取り込む。
 *
 *   npm run image -- "File:Foo.jpg" foo-id [--note "被写体の権利についての人の注記"]
 *   npm run image -- --list images.tsv        # 1行 = id \t File:Foo.jpg \t note(任意)
 *
 * 1280px 版を public/images/<id>.<ext> に保存し、src/content/images.json に
 * ライセンス・作者・出典 URL・取得日・版を書く。手で manifest を書かない。
 * 許可外のライセンス（NC・ND・不明）は保存せず終了コード 1 で止まる。
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "ao-hawaii/0.1 (personal study site; contact via GitHub iiiitiiitiiti)";
const MANIFEST = "src/content/images.json";
const OUT_DIR = "public/images";
const WIDTH = 1280;

/** 1つでも当たれば可（多重ライセンスは利用者が選べる）。NC・ND はここに当たらない */
const ALLOWED = [
  /^public domain$/i,
  /^pd\b/i,
  /^cc0\b/i,
  /^cc by(?: \d(?:\.\d)?)?$/i,
  /^cc by-sa(?: \d(?:\.\d)?)?$/i,
  /^attribution$/i,
  /^gfdl$/i,
];

export function isAllowedLicense(shortName) {
  return shortName
    .split(",")
    .map((s) => s.trim())
    .some((s) => ALLOWED.some((re) => re.test(s)));
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 429（レート制限）は待って引き直す。並行して調査が走っていると当たりやすい */
async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429 && res.status < 500) return res;
    await sleep(4000 * (i + 1));
  }
  throw new Error(`取得に失敗（再試行上限）: ${url}`);
}

async function api(params) {
  const url = new URL(API);
  for (const [k, v] of Object.entries({ format: "json", ...params })) url.searchParams.set(k, v);
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json();
}

async function fetchInfo(fileTitle) {
  const data = await api({
    action: "query",
    titles: fileTitle,
    prop: "imageinfo|revisions",
    iiprop: "url|extmetadata|size",
    iiurlwidth: String(WIDTH),
    rvprop: "ids",
  });
  const page = Object.values(data.query.pages)[0];
  if (!page || page.missing !== undefined || !page.imageinfo) {
    throw new Error(`Commons に見つかりません: ${fileTitle}`);
  }
  const info = page.imageinfo[0];
  const m = info.extmetadata ?? {};
  const get = (k) => m[k]?.value ?? "";
  return {
    title: page.title,
    pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_")).replace(/%3A/, ":")}`,
    thumbUrl: info.thumburl ?? info.url,
    originalUrl: info.url,
    width: info.thumbwidth ?? info.width,
    height: info.thumbheight ?? info.height,
    license: stripHtml(get("LicenseShortName")),
    licenseUrl: stripHtml(get("LicenseUrl")),
    author: stripHtml(get("Artist")),
    credit: stripHtml(get("Credit")),
    description: stripHtml(get("ImageDescription")).slice(0, 300),
    date: stripHtml(get("DateTimeOriginal")),
    revision: page.revisions?.[0]?.revid ?? null,
  };
}

/** 手元の日付を "YYYY-MM-DD" で返す（UTC だと深夜に前日になる） */
function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadManifest() {
  if (!existsSync(MANIFEST)) return [];
  return JSON.parse(readFileSync(MANIFEST, "utf8"));
}

function saveManifest(list) {
  list.sort((a, b) => a.id.localeCompare(b.id));
  writeFileSync(MANIFEST, JSON.stringify(list, null, 2) + "\n");
}

async function importOne(fileTitle, id, note = "") {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`id は小文字英数字とハイフンだけ: ${id}`);
  const info = await fetchInfo(fileTitle);
  if (!isAllowedLicense(info.license)) {
    throw new Error(`許可外のライセンス "${info.license}": ${fileTitle}`);
  }
  const ext = path.extname(new URL(info.thumbUrl).pathname).toLowerCase() || ".jpg";
  const file = `${id}${ext}`;
  mkdirSync(OUT_DIR, { recursive: true });
  const res = await fetchWithRetry(info.thumbUrl);
  if (!res.ok) throw new Error(`画像の取得に失敗 ${res.status}: ${info.thumbUrl}`);
  writeFileSync(path.join(OUT_DIR, file), Buffer.from(await res.arrayBuffer()));

  const manifest = loadManifest().filter((e) => e.id !== id);
  manifest.push({
    id,
    file,
    title: info.title,
    sourceUrl: info.pageUrl,
    author: info.author || "不明（Commons の記載なし）",
    credit: info.credit,
    license: info.license,
    licenseUrl: info.licenseUrl,
    description: info.description,
    date: info.date,
    width: info.width,
    height: info.height,
    revision: info.revision,
    fetchedAt: localDate(),
    subjectNote: note,
  });
  saveManifest(manifest);
  console.log(`✓ ${id}  ${info.license}  ${info.author.slice(0, 40)}  (${file})`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "--list") {
    const lines = readFileSync(args[1], "utf8").split("\n").filter((l) => l.trim() && !l.startsWith("#"));
    let failed = 0;
    for (const line of lines) {
      const [id, title, note] = line.split("\t").map((s) => s.trim());
      try {
        await importOne(title, id, note ?? "");
      } catch (e) {
        failed++;
        console.error(`✗ ${id}: ${e.message}`);
      }
    }
    if (failed) process.exit(1);
    return;
  }
  const [title, id] = args;
  const noteIdx = args.indexOf("--note");
  const note = noteIdx >= 0 ? args[noteIdx + 1] : "";
  if (!title || !id) {
    console.error('使い方: npm run image -- "File:Foo.jpg" foo-id [--note "..."]');
    process.exit(1);
  }
  await importOne(title, id, note);
}

// テストから isAllowedLicense を import できるよう、直接実行のときだけ main を走らせる
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
