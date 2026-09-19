import { useEffect, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { findCourse, lessonPath } from "../content/courses";
import { meleRelatedTo } from "../content/mele";
import { LessonLayout } from "../lesson/LessonLayout";
import { useProgress } from "../progress/useProgress";
import { BackToTop } from "../widgets/BackToTop";
import { NotFoundPage } from "./NotFoundPage";

const LESSON_SLUG_PATTERN = /^lesson-(\d{2})$/;

/** slug は routes.tsx の振り分けから props で受ける。無ければ URL のパラメータを読む */
export function LessonPage({ courseSlug: courseProp, lessonSlug: lessonProp }: { courseSlug?: string; lessonSlug?: string } = {}) {
  const params = useParams();
  const courseSlug = courseProp ?? params.courseSlug ?? "";
  const lessonSlug = lessonProp ?? params.lessonSlug ?? "";
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
  const songs = meleRelatedTo(`${course.slug}/lesson-${String(lesson.number).padStart(2, "0")}`);

  return (
    <main className="lessonpage" style={{ "--course-accent": course.accent } as CSSProperties}>
      <Link className="crumb" to={`/${course.slug}`}>
        <span lang="haw">{course.name}</span> のレッスン一覧
      </Link>

      <LessonLayout course={course} lesson={lesson} />

      {songs.length > 0 && (
        <aside className="lesson__mele" aria-label="このレッスンに関わる曲">
          <h2 className="lesson__mele-title">この曲を1行ずつ読む</h2>
          <ul className="lesson__mele-list">
            {songs.map((m) => (
              <li key={m.id}>
                <Link to={`/mele/${m.id}`}>
                  <span lang="haw">{m.title}</span>
                  {m.protection === "locked" && <span aria-label="パスワードが要る曲"> 🔒</span>}
                </Link>
                <span className="lesson__mele-summary">{m.summary}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

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
      <BackToTop />
    </main>
  );
}
