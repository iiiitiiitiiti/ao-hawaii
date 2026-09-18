import { MDXProvider } from "@mdx-js/react";
import { useRef } from "react";
import type { Course, Lesson } from "../content/courses";
import { getLessonComponent } from "./lessonModules";
import { LessonToc } from "./LessonToc";
import { mdxComponents } from "./mdxComponents";

export function LessonLayout({ course, lesson }: { course: Course; lesson: Lesson }) {
  const Body = getLessonComponent(course.slug, lesson.number);
  const bodyRef = useRef<HTMLDivElement>(null);
  return (
    <article className="lesson">
      <header className="lesson__header">
        <p className="lesson__course">
          <span lang="haw">{course.name}</span> — {course.subtitle}
          <span className="lesson__minutes">
            読む目安 <span className="num">{lesson.minutes}</span> 分
          </span>
        </p>
        <h1 className="lesson__title">
          <span className="lesson__no">Lesson {String(lesson.number).padStart(2, "0")}</span>
          {lesson.title}
        </h1>
        <p className="lesson__goal">
          <span className="lesson__goal-label">このレッスンの到達点</span>
          {lesson.goal}
        </p>
      </header>
      {Body && <LessonToc bodyRef={bodyRef} />}
      <div className="lesson__body" ref={bodyRef}>
        {Body ? (
          <MDXProvider components={mdxComponents}>
            <Body />
          </MDXProvider>
        ) : (
          <p className="lesson__pending">このレッスンの本文はまだ書かれていません。順に書き足していきます。</p>
        )}
      </div>
    </article>
  );
}
