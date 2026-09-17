import type { ReactNode } from "react";

/**
 * ハワイ語のスパン。lang="haw" を付けて読み上げと字形（ʻokina の扱い）を分ける。
 * tests/orthography.test.ts が、この中に ASCII のアポストロフィが混ざっていないかを見る。
 */
export function H({ children }: { children: ReactNode }) {
  return (
    <span lang="haw" className="haw">
      {children}
    </span>
  );
}
