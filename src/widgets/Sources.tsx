import { isNarrowScreen } from "../lib/narrow";

export type Source = {
  /** 表示名（書名・機関名・ページ名） */
  label: string;
  url?: string;
  /** 補足（版・年・どこを参照したか） */
  note?: string;
};

/** 出典。レッスン末尾に置く。URL の無い書籍も書ける。スマホでは見出しだけ出して、タップで開く。 */
export function Sources({ items }: { items: Source[] }) {
  return (
    <details className="sources" open={!isNarrowScreen()}>
      <summary className="sources__title">
        出典<span className="num sources__count"> {items.length}</span>
      </summary>
      <ul className="sources__list">
        {items.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ) : (
              s.label
            )}
            {s.note && <span className="sources__note"> — {s.note}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}
