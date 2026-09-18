import { readFileSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { COURSES, findCourse, findLesson } from "../src/content/courses";
import { LessonLayout } from "../src/lesson/LessonLayout";
import { listAllWritten } from "../src/lesson/lessonModules";
import { splitLessonRefs } from "../src/lesson/remarkLessonRefs";

const ROOT = process.cwd();
const written = listAllWritten();
const LINK_HREF = /^\/([a-z-]+)\/lesson-(\d{2})$/;

/** raw MDX の「Lesson NN」の数。JSX の属性値（src="講座 Hula Lesson 04" など）の中はリンクにしないので数えない */
function expectedRefs(raw: string): number {
  const withoutAttrs = raw.replace(/=\s*"[^"]*"/g, '=""');
  return [...withoutAttrs.matchAll(/Lesson\s+\d{2}/g)].length;
}

function renderLesson(courseSlug: string, number: number) {
  const course = findCourse(courseSlug)!;
  const lesson = findLesson(courseSlug, number)!;
  return render(
    <MemoryRouter>
      <LessonLayout course={course} lesson={lesson} />
    </MemoryRouter>,
  );
}

describe("本文中のレッスン参照（remarkLessonRefs）", () => {
  test("講座名付きの参照は、その講座へ解決する（「講座」の語が無くてもよい）", () => {
    const parts = splitLessonRefs("海の神です（Moʻolelo Lesson 04）。", "mea-ola", "t");
    const link = parts?.find((p) => p.type === "link");
    expect(link && link.type === "link" && link.url).toBe("/moolelo/lesson-04");
  });

  test("講座名の無い参照は、本文の講座のレッスンへ解決する", () => {
    const parts = splitLessonRefs("詳しくは Lesson 03 で。", "hula", "t");
    expect(parts?.map((p) => (p.type === "link" ? p.url : p.value))).toEqual(["詳しくは ", "/hula/lesson-03", " で。"]);
  });

  test("1つのテキストに複数の参照があっても、それぞれの講座へ解決する", () => {
    const parts = splitLessonRefs("講座 Mōʻaukala Lesson 05、ʻŌlelo Hawaiʻi Lesson 01", "hula", "t");
    expect(parts?.filter((p) => p.type === "link").map((p) => (p.type === "link" ? p.url : ""))).toEqual(["/moaukala/lesson-05", "/olelo/lesson-01"]);
  });

  test("目次に無いレッスンを指す参照は例外にする（ビルドを落とす）", () => {
    expect(() => splitLessonRefs("Lesson 09", "hula", "t")).toThrow(/目次にありません/);
  });

  test("講座に属さない本文での講座名なし参照は例外にする", () => {
    expect(() => splitLessonRefs("Lesson 01 で扱う", undefined, "content/pages/x.mdx")).toThrow(/どの講座/);
  });

  test("講座名が <H> や太字で分断された参照が本文に無い（素の参照として別講座へ繋がってしまうため）", () => {
    for (const w of written) {
      const file = path.join(ROOT, "content", w.courseSlug, `lesson-${String(w.number).padStart(2, "0")}.mdx`);
      const raw = readFileSync(file, "utf8");
      expect(raw, file).not.toMatch(/<\/H>\s*(の\s*)?Lesson\s+\d{2}/);
      expect(raw, file).not.toMatch(/\*\*\s*(の\s*)?Lesson\s+\d{2}/);
    }
  });

  test("参照が無いテキストはそのまま", () => {
    expect(splitLessonRefs("Hula の歴史", "hula", "t")).toBeUndefined();
  });

  test.each(written.map((w) => [w.courseSlug, w.number] as const))("%s/lesson-%i: 参照がすべてリンクになり、正しい講座を指す", (slug, number) => {
    const file = path.join(ROOT, "content", slug, `lesson-${String(number).padStart(2, "0")}.mdx`);
    const expected = expectedRefs(readFileSync(file, "utf8"));
    const { container } = renderLesson(slug, number);
    const links = [...container.querySelectorAll<HTMLAnchorElement>(".lesson__body a")].filter((a) => LINK_HREF.test(a.getAttribute("href") ?? ""));
    expect(links.length, "Lesson NN の出現数とリンク数").toBe(expected);

    for (const a of links) {
      const [, hrefSlug] = LINK_HREF.exec(a.getAttribute("href")!)!;
      const named = COURSES.find((c) => a.textContent?.includes(c.name));
      expect(hrefSlug, `「${a.textContent}」のリンク先`).toBe(named ? named.slug : slug);
    }
  });
});
