export type Source = {
  /** 表示名（書名・機関名・ページ名） */
  label: string;
  url?: string;
  /** 補足（版・年・どこを参照したか） */
  note?: string;
};

/** 出典。レッスン末尾に置く。URL の無い書籍も書ける。 */
export function Sources({ items }: { items: Source[] }) {
  return (
    <section className="sources" aria-label="出典">
      <h3 className="sources__title">出典</h3>
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
    </section>
  );
}
