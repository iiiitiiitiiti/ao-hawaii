import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { IMAGES as images } from "../src/content/images";
import { isAllowedLicense } from "../scripts/fetch-image.mjs";

// vitest はリポジトリのルートで走る（jsdom 環境では import.meta.url が file: にならない）
const ROOT = process.cwd();

/** content/ 以下の MDX が <Photo id="..." /> で参照している id を集める */
function referencedPhotoIds(): { id: string; file: string }[] {
  const out: { id: string; file: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".mdx")) {
        const text = readFileSync(full, "utf8");
        for (const m of text.matchAll(/<Photo\s[^>]*?id="([^"]+)"/g)) out.push({ id: m[1], file: path.relative(ROOT, full) });
      }
    }
  };
  walk(path.join(ROOT, "content"));
  return out;
}

describe("画像の記録（images.json）", () => {
  test("manifest の全件がファイルとして存在する", () => {
    for (const img of images) {
      expect(existsSync(path.join(ROOT, "public/images", img.file)), `${img.id} の実体 ${img.file}`).toBe(true);
    }
  });

  test("manifest の全件が許可ライセンス内で、出典と作者を持つ", () => {
    for (const img of images) {
      expect(isAllowedLicense(img.license), `${img.id}: ${img.license}`).toBe(true);
      expect(img.sourceUrl, `${img.id} の出典 URL`).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(img.author, `${img.id} の作者`).toBeTruthy();
      expect(img.fetchedAt, `${img.id} の取得日`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("id が重複していない", () => {
    const ids = images.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("本文が参照する id はすべて manifest にある", () => {
    const known = new Set(images.map((i) => i.id));
    for (const ref of referencedPhotoIds()) {
      expect(known.has(ref.id), `${ref.file} が参照する ${ref.id}`).toBe(true);
    }
  });

  test("public/images に manifest 外のファイルが無い", () => {
    const listed = new Set(images.map((i) => i.file));
    const dir = path.join(ROOT, "public/images");
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir)) {
      if (f.startsWith(".")) continue;
      expect(listed.has(f), `manifest に無いファイル ${f}`).toBe(true);
    }
  });
});

describe("ライセンス判定", () => {
  test.each([
    ["Public domain", true],
    ["PD-US", true],
    ["CC0", true],
    ["CC BY 2.0", true],
    ["CC BY-SA 4.0", true],
    ["CC BY-SA 3.0,GFDL", true],
    ["CC BY 3.0 us", true],
    ["CC BY-NC 2.0", false],
    ["CC BY-NC-SA 3.0", false],
    ["CC BY-ND 4.0", false],
    ["", false],
  ])("%s → %s", (name, ok) => {
    expect(isAllowedLicense(name)).toBe(ok);
  });
});
