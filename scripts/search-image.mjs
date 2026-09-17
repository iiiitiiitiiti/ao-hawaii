/*
 * Wikimedia Commons を検索して候補のファイル名とライセンスを一覧する。
 *   node scripts/search-image.mjs "Haleakala crater" [件数]
 * 取り込みは fetch-image.mjs で行う（ここでは保存しない）。
 */
const UA = "ao-hawaii/0.1 (personal study site; contact via GitHub iiiitiiitiiti)";
const API = "https://commons.wikimedia.org/w/api.php";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(params) {
  const url = new URL(API);
  for (const [k, v] of Object.entries({ format: "json", ...params })) url.searchParams.set(k, v);
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      await sleep(5000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }
  throw new Error("レート制限が続いている");
}

const [query, limitArg] = process.argv.slice(2);
if (!query) {
  console.error('使い方: node scripts/search-image.mjs "検索語" [件数]');
  process.exit(1);
}
const limit = Number(limitArg ?? 10);
const search = await get({ action: "query", list: "search", srnamespace: "6", srsearch: query, srlimit: String(limit) });
const titles = (search.query?.search ?? []).map((s) => s.title);
if (titles.length === 0) {
  console.log("該当なし");
  process.exit(0);
}
const info = await get({ action: "query", titles: titles.join("|"), prop: "imageinfo", iiprop: "extmetadata|size" });
for (const page of Object.values(info.query.pages)) {
  const m = page.imageinfo?.[0]?.extmetadata ?? {};
  const lic = m.LicenseShortName?.value ?? "?";
  const artist = (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").slice(0, 30);
  const size = page.imageinfo?.[0] ? `${page.imageinfo[0].width}x${page.imageinfo[0].height}` : "";
  console.log(`${lic.padEnd(18)} ${size.padEnd(10)} ${artist.padEnd(30)} ${page.title}`);
}
