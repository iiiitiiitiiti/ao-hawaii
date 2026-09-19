import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { findCourse, lessonPath } from "../content/courses";
import { listWrittenLessons } from "../lesson/lessonModules";
import { useProgress } from "../progress/useProgress";
import { NotFoundPage } from "./NotFoundPage";

/** slug は routes.tsx の振り分けから props で受ける。無ければ URL の courseSlug を読む */
export function CoursePage({ courseSlug: slugProp }: { courseSlug?: string } = {}) {
  const params = useParams();
  const courseSlug = slugProp ?? params.courseSlug ?? "";
  const course = findCourse(courseSlug);
  const { progress } = useProgress();
  if (!course) return <NotFoundPage />;
  const written = listWrittenLessons(course.slug);

  return (
    <main className="coursepage" style={{ "--course-accent": course.accent } as CSSProperties}>
      <Link className="crumb" to="/">
        講座一覧
      </Link>
      <header className="coursepage__header">
        <h1 className="coursepage__name" lang="haw">
          {course.name}
        </h1>
        <p className="coursepage__sub">{course.subtitle}</p>
        <p className="coursepage__lead">{course.lead}</p>
      </header>
      <ol className="lesson-list">
        {course.lessons.map((lesson) => {
          const isWritten = written.includes(lesson.number);
          const isDone = progress.completedLessonIds.includes(lesson.id);
          return (
            <li className={`lesson-list__item${isDone ? " is-done" : ""}`} key={lesson.id}>
              {isWritten ? (
                <Link className="lesson-list__link" to={lessonPath(course.slug, lesson.number)}>
                  <span className="lesson-list__no num">{String(lesson.number).padStart(2, "0")}</span>
                  <span className="lesson-list__text">
                    <span className="lesson-list__title">{lesson.title}</span>
                    <span className="lesson-list__goal">{lesson.goal}</span>
                  </span>
                  <span className="lesson-list__minutes">
                    <span className="num">{lesson.minutes}</span>分
                  </span>
                </Link>
              ) : (
                <div className="lesson-list__link is-pending">
                  <span className="lesson-list__no num">{String(lesson.number).padStart(2, "0")}</span>
                  <span className="lesson-list__text">
                    <span className="lesson-list__title">
                      {lesson.title} <span className="pending-badge">準備中</span>
                    </span>
                    <span className="lesson-list__goal">{lesson.goal}</span>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
