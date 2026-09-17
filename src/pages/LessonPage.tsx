import { useEffect, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { findCourse, lessonPath } from "../content/courses";
import { LessonLayout } from "../lesson/LessonLayout";
import { useProgress } from "../progress/useProgress";
import { NotFoundPage } from "./NotFoundPage";

const LESSON_SLUG_PATTERN = /^lesson-(\d{2})$/;

export function LessonPage() {
  const { courseSlug = "", lessonSlug = "" } = useParams();
  const course = findCourse(courseSlug);
  const matched = LESSON_SLUG_PATTERN.exec(lessonSlug);
  const lesson = matched ? course?.lessons.find((l) => l.number === Number(matched[1])) : undefined;
  const { progress, toggleCompleted, markVisited } = useProgress();

  useEffect(() => {
    if (lesson) markVisited(lesson.id);
    window.scrollTo(0, 0);
  }, [lesson, markVisited]);

  if (!course || !lesson) return <NotFoundPage />;

  const isCompleted = progress.completedLessonIds.includes(lesson.id);
  const previous = course.lessons[lesson.number - 2];
  const next = course.lessons[lesson.number];

  return (
    <main className="lessonpage" style={{ "--course-accent": course.accent } as CSSProperties}>
      <Link className="crumb" to={`/${course.slug}`}>
        <span lang="haw">{course.name}</span> のレッスン一覧
      </Link>

      <LessonLayout course={course} lesson={lesson} />

      <div className="lesson__footer">
        <button type="button" className={`btn done-toggle${isCompleted ? " is-done" : ""}`} onClick={() => toggleCompleted(lesson.id)}>
          <span className="done-toggle__mark" aria-hidden="true">
            ✓
          </span>
          {isCompleted ? "完了を取り消す" : "完了にする"}
        </button>

        <nav className="lesson__nav" aria-label="レッスンの移動">
          <span className="lesson__nav-slot lesson__nav-slot--prev">
            {previous && (
              <Link to={lessonPath(course.slug, previous.number)}>
                <span className="lesson__nav-dir">前のレッスン</span>
                <span className="lesson__nav-name">{previous.title}</span>
              </Link>
            )}
          </span>
          <span className="lesson__nav-slot lesson__nav-slot--next">
            {next && (
              <Link to={lessonPath(course.slug, next.number)}>
                <span className="lesson__nav-dir">次のレッスン</span>
                <span className="lesson__nav-name">{next.title}</span>
              </Link>
            )}
          </span>
        </nav>
      </div>
    </main>
  );
}
