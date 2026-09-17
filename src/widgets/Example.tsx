import type { ReactNode } from "react";

export type ExampleProps = {
  /** ハワイ語の文 */
  haw: string;
  /** 逐語（形態素）の分解。省略可 */
  gloss?: string;
  /** 日本語訳 */
  ja: string;
  /** 出典の短い表示（"HG §4.2" など） */
  src?: string;
  children?: ReactNode;
};

/** 例文。ハワイ語 → 逐語 → 訳 の3段で出す。文法レッスンの基本部品。 */
export function Example({ haw, gloss, ja, src, children }: ExampleProps) {
  return (
    <div className="example">
      <p className="example__haw" lang="haw">
        {haw}
      </p>
      {gloss && <p className="example__gloss">{gloss}</p>}
      <p className="example__ja">
        {ja}
        {src && <span className="example__src">{src}</span>}
      </p>
      {children && <div className="example__note">{children}</div>}
    </div>
  );
}
