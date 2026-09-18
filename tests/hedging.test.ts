import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

// 2026-09-18 の方針（docs/decisions/007）: 「○○に記述がないため怪しい」型の書き方をしない。
// 出典が複数あれば言い切る、1つならその出典を名指しする、0なら書かない。
const ROOT = process.cwd();
const BANNED: RegExp[] = [
  /kind="unverified"/,
  /本サイトの調査では/,
  /記述がな/,
  /裏取り/,
  /未確認/,
  /未検証/,
  /可能性あり/,
  /断定は避け/,
  /諸説あり/,
  /確認できていません/,
  /確認できませんでした/,
];

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
