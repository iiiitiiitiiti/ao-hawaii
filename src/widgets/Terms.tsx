import { findTerm } from "../content/glossary";

/** レッスン内の用語ボックス。用語集（glossary.ts）の正本から引く。 */
export function Terms({ ids, title = "このレッスンの用語" }: { ids: string[]; title?: string }) {
  return (
    <aside className="terms" aria-label={title}>
      <h3 className="terms__title">{title}</h3>
      <dl className="terms__list">
        {ids.map((id) => {
          const term = findTerm(id);
          if (!term) throw new Error(`用語集に無い id です: ${id}`);
          return (
            <div className="terms__item" key={id}>
              <dt className="terms__word">
                <span lang="haw">{term.hawaiian}</span>
              </dt>
              <dd className="terms__meaning">
                {term.meaning}
                {term.note && <span className="terms__note">{term.note}</span>}
              </dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}
