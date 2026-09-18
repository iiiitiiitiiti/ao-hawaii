import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES, findLesson } from "../content/courses";
import { isNarrowScreen } from "../lib/narrow";
import { Sources } from "../widgets/Sources";
import type { LessonRef, MeleBody, MeleLine } from "./types";

function lessonLabel(ref: LessonRef): string {
  const [slug, rest] = ref.split("/");
  const number = Number(rest.replace("lesson-", ""));
  const course = COURSES.find((c) => c.slug === slug);
  return `${course?.name ?? slug} Lesson ${String(number).padStart(2, "0")}「${findLesson(slug, number)?.title ?? ""}」`;
}

function LineView({ line, showWords }: { line: MeleLine; showWords: boolean }) {
  // 全体トグルが「畳む」のときは、行ごとに開ける（スマホでは行訳だけを出し、気になる行だけ語注を見る）
  const [open, setOpen] = useState(false);
  const expanded = showWords || open;
  const hasNotes = line.notes !== undefined && line.notes.length > 0;
  return (
    <div className={`mele-line${expanded ? " is-open" : ""}`}>
      <p className="mele-line__haw" lang="haw">
        {line.haw}
      </p>
      {expanded && (
        <ol className="mele-line__words" aria-label="逐語の意味">
          {line.words.map((w, i) => (
            <li className="mele-word" key={i}>
              <span className="mele-word__w" lang="haw">
                {w.term ? <Link to={`/glossary#${w.term}`}>{w.w}</Link> : w.w}
              </span>
              <span className="mele-word__gloss">{w.gloss}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="mele-line__ja">
        {line.ja}
        {!showWords && (
          <button type="button" className="mele-line__more" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? "語注を閉じる" : hasNotes ? "語注とメモ" : "語注"}
          </button>
        )}
      </p>
      {expanded && line.notes && line.notes.length > 0 && (
        <ul className="mele-line__notes">
          {line.notes.map((n, i) => (
            <li key={i}>
              {n.text}
              {n.lesson && (
                <>
                  {" "}
                  → <Link to={`/${n.lesson}`}>{lessonLabel(n.lesson)}</Link>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** 曲の本体（歌詞・逐語注・行訳・kaona・版・出典）。公開曲も、復号した保護曲も同じ部品で出す */
export function MeleBodyView({ body }: { body: MeleBody }) {
  // 通して読むときは逐語注を畳む。既定は開く（文法を学ぶのが目的のため）。スマホでは既定で畳み、行ごとに開く
  const [showWords, setShowWords] = useState(() => !isNarrowScreen());
  return (
    <div className="mele-body">
      <label className="mele-body__toggle">
        <input type="checkbox" checked={showWords} onChange={(e) => setShowWords(e.target.checked)} />
        逐語の意味とメモを出す
      </label>

      {body.stanzas.map((stanza, si) => (
        <section className="mele-stanza" key={si} aria-label={`第${si + 1}連`}>
          <h3 className="mele-stanza__label">{stanza.label ?? si + 1}</h3>
          {stanza.lines.map((line, li) => (
            <LineView line={line} showWords={showWords} key={li} />
          ))}
        </section>
      ))}

      {body.kaona.length > 0 && (
        <section className="mele-kaona">
          <h2>
            <span lang="haw">kaona</span> — 隠された意味
          </h2>
          {body.kaona.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      <section className="mele-version">
        <h2>この歌詞の版</h2>
        <p>{body.version}</p>
      </section>

      <Sources items={body.sources} />
    </div>
  );
}
