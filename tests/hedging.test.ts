import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { BANNED_PHRASES } from "../src/content/bannedPhrases";

// 禁止フレーズの一覧と方針は src/content/bannedPhrases.ts（曲データの検査と共有）
const ROOT = process.cwd();
const BANNED = BANNED_PHRASES;

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

describe("「怪しい」型の書き方を本文に残さない", () => {
  test("本文・表・Quiz・Sources に禁止フレーズと unverified ノートがない", () => {
    const hits: string[] = [];
    for (const file of mdxFiles()) {
      const rel = path.relative(ROOT, file);
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const re of BANNED) {
          if (re.test(line)) hits.push(`${rel}:${i + 1} ${re.source}`);
        }
      });
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });
});
