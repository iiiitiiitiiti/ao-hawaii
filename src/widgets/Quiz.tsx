import { useState } from "react";

export type QuizItem = {
  q: string;
  /** 選択肢。正解は answer の添字 */
  choices: string[];
  answer: number;
  /** 答え合わせのあとに出す1〜2文 */
  why: string;
};

/** 確認問題。1問ずつめくって、その場で答え合わせをするだけで、結果は保存しない。 */
export function Quiz({ items }: { items: QuizItem[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const answered = Object.keys(picked).length;
  const correct = items.filter((item, i) => picked[i] === item.answer).length;
  const finished = answered === items.length;
  const item = items[current];
  const chosen = picked[current];
  const done = chosen !== undefined;
  const isLast = current === items.length - 1;

  return (
    <section className="quiz" aria-label="確認問題">
      <h3 className="quiz__title">
        確認問題
        <span className="quiz__progress">
          問 <span className="num">{current + 1}</span> / <span className="num">{items.length}</span>
        </span>
      </h3>
      <ol className="quiz__list" start={current + 1}>
        <li className="quiz__item" key={current}>
          <p className="quiz__q">{item.q}</p>
          <div className="quiz__choices" role="group" aria-label={`問${current + 1}の選択肢`}>
            {item.choices.map((choice, j) => {
              const state = !done ? "" : j === item.answer ? " is-correct" : j === chosen ? " is-wrong" : " is-muted";
              return (
                <button
                  key={j}
                  type="button"
                  className={`quiz__choice${state}`}
                  disabled={done}
                  onClick={() => setPicked((p) => ({ ...p, [current]: j }))}
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
      </ol>
      {done && !isLast && (
        <button type="button" className="btn quiz__next" onClick={() => setCurrent((c) => c + 1)}>
          次の問題へ
        </button>
      )}
      {finished && isLast && (
        <p className="quiz__score">
          {items.length}問中 <span className="num">{correct}</span> 問正解
          {correct < items.length && (
            <button type="button" className="quiz__retry" onClick={() => setCurrent(0)}>
              最初から見直す
            </button>
          )}
        </p>
      )}
      {current > 0 && (
        <button type="button" className="quiz__prev" onClick={() => setCurrent((c) => c - 1)}>
          前の問題
        </button>
      )}
    </section>
  );
}
