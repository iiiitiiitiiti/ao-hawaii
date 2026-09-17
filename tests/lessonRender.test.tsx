import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { COURSES, findCourse, findLesson } from "../src/content/courses";
import { LessonLayout } from "../src/lesson/LessonLayout";
import { listAllWritten } from "../src/lesson/lessonModules";

const written = listAllWritten();

function renderLesson(courseSlug: string, number: number) {
  const course = findCourse(courseSlug);
  const lesson = findLesson(courseSlug, number);
  if (!course || !lesson) throw new Error(`目次に無い本文: ${courseSlug}/lesson-${number}`);
  return render(<LessonLayout course={course} lesson={lesson} />);
}

describe("目次と本文の対応", () => {
  test("本文がある全レッスンが目次に載っている", () => {
    for (const w of written) {
      expect(findLesson(w.courseSlug, w.number), `${w.courseSlug}/lesson-${w.number}`).toBeDefined();
    }
  });

  test("講座の slug と id が重複していない", () => {
    const slugs = COURSES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const ids = COURSES.flatMap((c) => c.lessons.map((l) => l.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe.skipIf(written.length === 0)("レッスン本文の描画", () => {
  /*
   * MDX は本文で使われた大文字始まりのタグを mdxComponents から解決する。
   * 登録し忘れ・用語集に無い id・manifest に無い画像は、開いた瞬間に例外になって画面が真っ白になる。
   * 実際に描画して確かめる。
   */
  test.each(written.map((w) => [w.courseSlug, w.number] as const))("%s/lesson-%i が例外なく描画できる", (slug, number) => {
    expect(() => renderLesson(slug, number)).not.toThrow();
  });

  /*
   * CommonMark では、閉じの ** の直前が句読点で直後が文字だと閉じ記号として働かない。
   * 「**大事です。**続き」と書くと太字にならず、記号がそのまま本文に出る。
   */
  test.each(written.map((w) => [w.courseSlug, w.number] as const))("%s/lesson-%i の本文に Markdown の記号が残っていない", (slug, number) => {
    const { container } = renderLesson(slug, number);
    const body = container.querySelector(".lesson__body");
    expect(body?.textContent).not.toContain("**");
  });

  test.each(written.map((w) => [w.courseSlug, w.number] as const))("%s/lesson-%i に確認問題と出典がある", (slug, number) => {
    const { container } = renderLesson(slug, number);
    expect(container.querySelector(".quiz"), "確認問題").not.toBeNull();
    expect(container.querySelector(".sources"), "出典").not.toBeNull();
  });
});
