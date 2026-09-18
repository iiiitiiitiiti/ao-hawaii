import { Link } from "react-router-dom";
import { MELE } from "../content/mele";

/** 「メレを読む」の曲一覧。講座ページの一覧と同じ部品で並べる */
export function MeleListPage() {
  return (
    <main className="coursepage melelist">
      <header className="coursepage__header">
        <h1 className="coursepage__name" lang="haw">
          Heluhelu Mele
        </h1>
        <p className="coursepage__sub">メレを読む</p>
        <p className="coursepage__lead">
          1曲ずつ、歌詞を1行ごとに「ハワイ語・語ごとの意味・行の訳・文法メモ」で読みます。文法メモは <span lang="haw">ʻŌlelo Hawaiʻi</span>{" "}
          講座の該当レッスンへつながっています。🔒 の曲は著作権の保護期間中のため、パスワードを入れた端末でだけ本文が読めます。
        </p>
      </header>
      <ol className="lesson-list">
        {MELE.map((m) => (
          <li className="lesson-list__item" key={m.id}>
            <Link className="lesson-list__link" to={`/mele/${m.id}`}>
              <span className="lesson-list__no" aria-label={m.protection === "locked" ? "パスワードが要る曲" : undefined}>
                {m.protection === "locked" ? "🔒" : "♪"}
              </span>
              <span className="lesson-list__text">
                <span className="lesson-list__title" lang="haw">
                  {m.title}
                </span>
                <span className="lesson-list__goal">{m.summary}</span>
              </span>
              <span className="lesson-list__minutes">{m.year}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
