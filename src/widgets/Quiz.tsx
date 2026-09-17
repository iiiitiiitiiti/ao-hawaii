import { useState } from "react";

export type QuizItem = {
  q: string;
  /** 選択肢。正解は answer の添字 */
  choices: string[];
  answer: number;
  /** 答え合わせのあとに出す1〜2文 */
  why: string;
};

/** 確認問題。その場で答え合わせをするだけで、結果は保存しない。 */
export function Quiz({ items }: { items: QuizItem[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answered = Object.keys(picked).length;
  const correct = items.filter((item, i) => picked[i] === item.answer).length;

  return (
    <section className="quiz" aria-label="確認問題">
      <h3 className="quiz__title">確認問題</h3>
      <ol className="quiz__list">
        {items.map((item, i) => {
          const chosen = picked[i];
          const done = chosen !== undefined;
          return (
            <li className="quiz__item" key={i}>
              <p className="quiz__q">{item.q}</p>
              <div className="quiz__choices" role="group" aria-label={`問${i + 1}の選択肢`}>
                {item.choices.map((choice, j) => {
                  const state = !done ? "" : j === item.answer ? " is-correct" : j === chosen ? " is-wrong" : " is-muted";
                  return (
                    <button
                      key={j}
                      type="button"
                      className={`quiz__choice${state}`}
                      disabled={done}
                      onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {done && (
                <p className={`quiz__why${chosen === item.answer ? " is-correct" : " is-wrong"}`}>
                  <strong>{chosen === item.answer ? "正解" : "不正解"}</strong> — {item.why}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      {answered === items.length && (
        <p className="quiz__score">
          {items.length}問中 <span className="num">{correct}</span> 問正解
        </p>
      )}
    </section>
  );
}
