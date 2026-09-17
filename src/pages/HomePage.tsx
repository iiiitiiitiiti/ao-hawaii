import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { COURSES, TOTAL_LESSONS, lessonPath } from "../content/courses";
import { listWrittenLessons } from "../lesson/lessonModules";
import { useProgress } from "../progress/useProgress";

export function HomePage() {
  const { progress } = useProgress();
  const done = progress.completedLessonIds.length;

  return (
    <main className="home">
      <section className="hero">
        <p className="hero__eyebrow" lang="haw">
          E aʻo kākou — いっしょに学ぼう
        </p>
        <h1 className="hero__title">
          ハワイの土地・生きもの・物語・歴史・フラ・ことばを、出典に当たりながら講座で学ぶ
        </h1>
        <p className="hero__lead">
          <span lang="haw">aʻo</span> は「学ぶ」と「教える」の両方を指すことば。6つの講座、全<span className="num">{TOTAL_LESSONS}</span>
          レッスン。ハワイ語の表記の約束だけ先に <Link to="/notation">表記について</Link> で確認しておくと、どの講座からでも読めます。
        </p>
        {done > 0 && (
          <p className="hero__progress">
            完了 <span className="num">{done}</span> / <span className="num">{TOTAL_LESSONS}</span> レッスン
          </p>
        )}
      </section>

      <section className="courses" aria-label="講座一覧">
        {COURSES.map((course) => {
          const written = listWrittenLessons(course.slug);
          const completed = course.lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
          return (
            <article className="course-card" key={course.slug} style={{ "--course-accent": course.accent } as CSSProperties}>
              <Link className="course-card__head" to={`/${course.slug}`}>
                <h2 className="course-card__name" lang="haw">
                  {course.name}
                </h2>
                <p className="course-card__sub">{course.subtitle}</p>
              </Link>
              <p className="course-card__lead">{course.lead}</p>
              <ol className="course-card__lessons">
                {course.lessons.map((lesson) => {
                  const isWritten = written.includes(lesson.number);
                  const isDone = progress.completedLessonIds.includes(lesson.id);
                  return (
                    <li key={lesson.id} className={isDone ? "is-done" : undefined}>
                      {isWritten ? (
                        <Link to={lessonPath(course.slug, lesson.number)}>
                          <span className="num">{String(lesson.number).padStart(2, "0")}</span> {lesson.title}
                        </Link>
                      ) : (
                        <span className="is-pending">
                          <span className="num">{String(lesson.number).padStart(2, "0")}</span> {lesson.title}
                          <span className="pending-badge">準備中</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
              <p className="course-card__meta">
                <span className="num">{completed}</span> / <span className="num">{course.lessons.length}</span> 完了
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
