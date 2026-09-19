import { MDXProvider } from "@mdx-js/react";
import type { Instrument, Lesson } from "./types";
import { getLessonComponent } from "./lessonModules";

export type LessonLayoutProps = {
  instrument: Instrument;
  lesson: Lesson;
};

export function LessonLayout({ instrument, lesson }: LessonLayoutProps) {
  const Body = getLessonComponent(instrument.slug, lesson.number);
  const stage = instrument.curriculum.stages.find((item) => item.number === lesson.stage);

  const days =
    lesson.days[0] === lesson.days[1]
      ? `${lesson.days[0]}日目`
      : `${lesson.days[0]}〜${lesson.days[1]}日目`;

  return (
    <article className="uke-lesson">
      <header className="uke-lesson__header">
        <p className="uke-lesson__stage">
          Stage {lesson.stage} {stage?.title} ・ {days}
        </p>
        {/* 見出しの読み上げ名に「Lesson NN」を残したまま、番号だけ字面を変える */}
        <h1 className="uke-lesson__title">
          <span className="uke-lesson__no">Lesson {String(lesson.number).padStart(2, "0")}</span>
          {lesson.title}
        </h1>
        <p className="uke-lesson__goal">
          <span className="uke-lesson__goal-label">このレッスンの到達点</span>
          {lesson.goal}
        </p>
      </header>
      <div className="uke-lesson__body">
        {Body ? (
          <MDXProvider components={instrument.mdxComponents}>
            <Body />
          </MDXProvider>
        ) : (
          <p className="uke-lesson__pending">
            このレッスンの本文はまだ書かれていません。順に書き足していきます。
          </p>
        )}
      </div>
    </article>
  );
}
