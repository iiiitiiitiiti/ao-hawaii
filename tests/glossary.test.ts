import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { COURSES } from "../src/content/courses";
import { GLOSSARY } from "../src/content/glossary";

// vitest はリポジトリのルートで走る（jsdom 環境では import.meta.url が file: にならない）
const ROOT = process.cwd();

function referencedTermIds(): { id: string; file: string }[] {
  const out: { id: string; file: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".mdx")) {
        const text = readFileSync(full, "utf8");
        for (const m of text.matchAll(/<Terms\s[^>]*?ids=\{\[([^\]]*)\]\}/g)) {
          for (const id of m[1].matchAll(/"([^"]+)"/g)) out.push({ id: id[1], file: path.relative(ROOT, full) });
        }
      }
    }
  };
  walk(path.join(ROOT, "content"));
  return out;
}

describe("用語集", () => {
  test("id が重複していない", () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("全エントリが出典 URL と確認日を持ち、category が講座に対応する", () => {
    const slugs = new Set(COURSES.map((c) => c.slug));
    for (const t of GLOSSARY) {
      expect(t.sourceUrl, `${t.id} の出典`).toMatch(/^https?:\/\//);
      expect(t.checkedAt, `${t.id} の確認日`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(slugs.has(t.category), `${t.id} の category ${t.category}`).toBe(true);
      expect(t.meaning.trim(), `${t.id} の意味`).not.toBe("");
    }
  });

  test("本文の <Terms> が参照する id はすべて用語集にある", () => {
    const known = new Set(GLOSSARY.map((t) => t.id));
    for (const ref of referencedTermIds()) {
      expect(known.has(ref.id), `${ref.file} が参照する ${ref.id}`).toBe(true);
    }
  });
});
