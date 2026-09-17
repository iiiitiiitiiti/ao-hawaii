import type { ReactNode } from "react";

type Kind = "point" | "caution" | "hula" | "unverified";

const LABEL: Record<Kind, string> = {
  point: "要点",
  caution: "注意",
  hula: "フラの現場では",
  unverified: "諸説あり・未確認",
};

/** 本文の脇に置く囲み。kind で見出しと色が変わる。 */
export function Note({ kind = "point", title, children }: { kind?: Kind; title?: string; children: ReactNode }) {
  return (
    <aside className={`note note--${kind}`}>
      <p className="note__label">{title ?? LABEL[kind]}</p>
      <div className="note__body">{children}</div>
    </aside>
  );
}
