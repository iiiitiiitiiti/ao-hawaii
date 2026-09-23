import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { choiceOrder, type QuizItem } from "../src/widgets/Quiz";

/** 全レッスンの <Quiz items={[…]} /> を取り出す。items は JS のオブジェクトリテラルとして書かれている */
function allQuizItems(): { file: string; item: QuizItem }[] {
  const out: { file: string; item: QuizItem }[] = [];
  for (const course of readdirSync("content")) {
    const dir = join("content", course);
    for (const name of readdirSync(dir).filter((n) => /^lesson-\d+\.mdx$/.test(n))) {
      const file = join(dir, name);
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(/<Quiz items=\{(\[[\s\S]*?\])\} \/>/g)) {
        const items = new Function(`return ${m[1]}`)() as QuizItem[];
        for (const item of items) out.push({ file, item });
      }
    }
  }
  return out;
}

describe("確認問題の選択肢の順", () => {
  const all = allQuizItems();

  it("問題が取り出せている", () => {
    expect(all.length).toBeGreaterThan(100);
  });

  it("並べ替えは元の選択肢をすべて1回ずつ含み、同じ問題なら毎回同じ順", () => {
    for (const { file, item } of all) {
      const order = choiceOrder(item);
      expect([...order].sort(), `${file}: ${item.q}`).toEqual(item.choices.map((_, i) => i));
      expect(choiceOrder(item)).toEqual(order);
    }
  });

  it("表示上の正解の位置が1か所に偏らない（どの位置も全体の4割未満）", () => {
    const counts = new Map<number, number>();
    for (const { item } of all) {
      const shown = choiceOrder(item).indexOf(item.answer);
      counts.set(shown, (counts.get(shown) ?? 0) + 1);
    }
    for (const [pos, n] of counts) expect(n / all.length, `位置 ${pos + 1}: ${n}/${all.length}`).toBeLessThan(0.4);
  });
});
