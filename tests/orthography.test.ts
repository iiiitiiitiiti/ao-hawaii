import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { GLOSSARY } from "../src/content/glossary";

// vitest はリポジトリのルートで走る（jsdom 環境では import.meta.url が file: にならない）
const ROOT = process.cwd();
const BAD = /['‘’`´]/;

function mdxFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".mdx")) out.push(full);
    }
  };
  walk(path.join(ROOT, "content"));
  return out;
}

describe("ハワイ語の表記", () => {
  test("用語集の語にアポストロフィ類が混ざっていない（ʻokina は U+02BB）", () => {
    for (const t of GLOSSARY) {
      expect(BAD.test(t.hawaiian), `${t.id}: ${t.hawaiian}`).toBe(false);
    }
  });

  test("本文の <H>…</H> と Example の haw にアポストロフィ類が混ざっていない", () => {
    for (const file of mdxFiles()) {
      const text = readFileSync(file, "utf8");
      const rel = path.relative(ROOT, file);
      for (const m of text.matchAll(/<H>([^<]*)<\/H>/g)) {
        expect(BAD.test(m[1]), `${rel}: <H>${m[1]}</H>`).toBe(false);
      }
      for (const m of text.matchAll(/haw="([^"]*)"/g)) {
        expect(BAD.test(m[1]), `${rel}: haw="${m[1]}"`).toBe(false);
      }
    }
  });
});
