import { Link } from "react-router-dom";
import { findTerm } from "../content/glossary";
import { isNarrowScreen } from "../lib/narrow";

/** レッスン内の用語ボックス。用語集（glossary.ts）の正本から引く。スマホでは見出しだけ出して、タップで開く。 */
export function Terms({ ids, title = "このレッスンの用語" }: { ids: string[]; title?: string }) {
  return (
    <details className="terms" open={!isNarrowScreen()}>
      <summary className="terms__title">
        {title}
        <span className="num terms__count"> {ids.length}</span>
      </summary>
      <dl className="terms__list">
        {ids.map((id) => {
          const term = findTerm(id);
          if (!term) throw new Error(`用語集に無い id です: ${id}`);
          return (
            <div className="terms__item" key={id}>
              <dt className="terms__word">
                <Link className="terms__link" to={`/glossary#${id}`} lang="haw">
                  {term.hawaiian}
                </Link>
              </dt>
              <dd className="terms__meaning">
                {term.meaning}
                {term.note && <span className="terms__note">{term.note}</span>}
              </dd>
            </div>
          );
        })}
      </dl>
    </details>
  );
}
