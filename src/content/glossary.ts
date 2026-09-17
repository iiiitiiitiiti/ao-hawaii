/**
 * 用語集の正本。レッスン本文の <Terms ids={[...]} /> と /glossary の両方がここを読む。
 *
 * hawaiian は ʻokina（U+02BB）と kahakō を必ず付ける。sourceUrl と checkedAt は必須で、
 * 辞書（wehewehe.org）で確認した日を書く。tests/glossary.test.ts が形を検査する。
 */

export type TermCategory = "hula" | "olelo" | "aina" | "mea-ola" | "moolelo" | "moaukala";

export type Term = {
  id: string;
  hawaiian: string;
  /** 日本語の短い訳語（1行） */
  meaning: string;
  /** 補足。用法・流派差・語源など */
  note?: string;
  category: TermCategory;
  sourceUrl: string;
  checkedAt: string;
};

export const GLOSSARY: Term[] = [];

export function findTerm(id: string): Term | undefined {
  return GLOSSARY.find((t) => t.id === id);
}
