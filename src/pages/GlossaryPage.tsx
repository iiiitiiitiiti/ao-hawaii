import { useMemo, useState } from "react";
import { COURSES } from "../content/courses";
import { GLOSSARY, type TermCategory } from "../content/glossary";

const CATEGORY_LABEL: Record<TermCategory, string> = Object.fromEntries(
  COURSES.map((c) => [c.slug, `${c.name} — ${c.subtitle}`]),
) as Record<TermCategory, string>;

/** ʻokina・kahakō を落として比較する。検索で ʻ を打てなくても引けるように */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ʻ/g, "")
    .toLowerCase();
}

export function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TermCategory | "">("");

  const terms = useMemo(() => {
    const q = fold(query.trim());
    return GLOSSARY.filter((t) => (!category || t.category === category) && (!q || fold(t.hawaiian).includes(q) || t.meaning.includes(query.trim())))
      .slice()
      .sort((a, b) => fold(a.hawaiian).localeCompare(fold(b.hawaiian)));
  }, [query, category]);

  return (
    <main className="glossary">
      <h1>用語集</h1>
      <p className="glossary__lead">
        全<span className="num">{GLOSSARY.length}</span>語。ʻokina や kahakō を省いて検索しても引けます（<span lang="haw">olelo</span> で <span lang="haw">ʻōlelo</span> が出る）。
      </p>
      <div className="glossary__controls">
        <input
          className="glossary__search"
          type="search"
          placeholder="語または意味で絞り込む"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="用語を検索"
        />
        <select className="glossary__select" value={category} onChange={(e) => setCategory(e.target.value as TermCategory | "")} aria-label="講座で絞り込む">
          <option value="">すべての講座</option>
          {COURSES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {CATEGORY_LABEL[c.slug as TermCategory]}
            </option>
          ))}
        </select>
      </div>
      <dl className="glossary__list">
        {terms.map((t) => (
          <div className="glossary__item" key={t.id} id={t.id}>
            <dt className="glossary__word">
              <span lang="haw">{t.hawaiian}</span>
              <span className="glossary__cat">{COURSES.find((c) => c.slug === t.category)?.name}</span>
            </dt>
            <dd className="glossary__meaning">
              {t.meaning}
              {t.note && <span className="glossary__note">{t.note}</span>}
              <a className="glossary__src" href={t.sourceUrl} target="_blank" rel="noreferrer">
                出典
              </a>
            </dd>
          </div>
        ))}
      </dl>
      {terms.length === 0 && <p className="glossary__empty">該当する語がありません。</p>}
    </main>
  );
}
