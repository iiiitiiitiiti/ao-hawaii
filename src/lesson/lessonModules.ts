import type { ComponentType } from "react";
import { COURSES } from "../content/courses";

/** termIds は remarkTermIds が本文の <Terms ids> から作る */
type MdxModule = { default: ComponentType; termIds?: string[] };

const modules = import.meta.glob<MdxModule>("../../content/*/lesson-*.mdx", { eager: true });

function pathFor(courseSlug: string, lessonNumber: number): string {
  return `../../content/${courseSlug}/lesson-${String(lessonNumber).padStart(2, "0")}.mdx`;
}

/** レッスン本文の MDX コンポーネントを返す。本文が未執筆なら undefined。 */
export function getLessonComponent(courseSlug: string, lessonNumber: number): ComponentType | undefined {
  return modules[pathFor(courseSlug, lessonNumber)]?.default;
}

/** 本文ファイルが存在するレッスン番号を返す。目次に無い本文の検出にも使う。 */
export function listWrittenLessons(courseSlug: string): number[] {
  const prefix = `../../content/${courseSlug}/lesson-`;
  return Object.keys(modules)
    .filter((path) => path.startsWith(prefix))
    .map((path) => Number(path.slice(prefix.length, prefix.length + 2)))
    .sort((a, b) => a - b);
}

/** 本文が書かれている全レッスン（講座 slug と番号）。 */
export function listAllWritten(): { courseSlug: string; number: number }[] {
  return Object.keys(modules).map((path) => {
    const m = /content\/([^/]+)\/lesson-(\d{2})\.mdx$/.exec(path);
    if (!m) throw new Error(`本文のパスが規約外です: ${path}`);
    return { courseSlug: m[1], number: Number(m[2]) };
  });
}

/** その用語を <Terms> に載せているレッスン（講座順・番号順）。用語集の逆引きに使う */
export function lessonsUsingTerm(termId: string): { courseSlug: string; number: number }[] {
  const order = (slug: string) => COURSES.findIndex((c) => c.slug === slug);
  return listAllWritten()
    .filter(({ courseSlug, number }) => modules[pathFor(courseSlug, number)]?.termIds?.includes(termId))
    .sort((a, b) => order(a.courseSlug) - order(b.courseSlug) || a.number - b.number);
}
