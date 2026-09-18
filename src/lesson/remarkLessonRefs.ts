import type { Link, Nodes, Parent, Root, Text } from "mdast";
import { COURSES, lessonPath } from "../content/courses.ts";

/**
 * 本文中の「講座 Moʻolelo Lesson 05」「（Moʻolelo Lesson 04）」「Lesson 03」を、そのレッスンへのリンクに変える remark プラグイン。
 *
 * - 講座名付きの参照を先に拾う（「講座」の語は有っても無くてもよい）。講座名の無い「Lesson NN」は、その本文が属する講座のレッスンとみなす
 * - 対象はテキストノードだけ。JSX の属性値（<Example src="講座 Hula Lesson 04">）や JS 式（Quiz・Sources の配列）の中は変えない
 * - 目次に無いレッスンを指す参照、講座に属さない本文（content/pages）の講座名なし参照は、ビルドを落とす
 *
 * MDX の本文は書き換えない。今後書く本文にも同じ規則で効く（docs/decisions/009）。
 */

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// 長い名前を先に並べる（部分一致で短い名前に取られないように）
const NAMES = [...COURSES].sort((a, b) => b.name.length - a.name.length).map((c) => escape(c.name));
const REF = new RegExp(`(?:講座\\s*)?(?:(${NAMES.join("|")})\\s*(?:の\\s*)?)?Lesson\\s+(\\d{2})`, "g");

const SLUG_BY_NAME = new Map(COURSES.map((c) => [c.name, c.slug]));

function courseOfFile(filePath: string | undefined): string | undefined {
  const m = filePath ? /content[\\/]([^\\/]+)[\\/]lesson-\d{2}\.mdx$/.exec(filePath) : null;
  return m ? m[1] : undefined;
}

/** テキスト1つを、参照のところで区切ってテキストとリンクの列に変える。参照が無ければ undefined */
export function splitLessonRefs(value: string, fileCourse: string | undefined, where: string): (Text | Link)[] | undefined {
  const out: (Text | Link)[] = [];
  let last = 0;
  for (const m of value.matchAll(REF)) {
    const [whole, name, digits] = m;
    const courseSlug = name ? SLUG_BY_NAME.get(name) : fileCourse;
    if (!courseSlug) throw new Error(`${where}: 「${whole}」がどの講座のレッスンか決められません（講座名を書いてください）`);
    const number = Number(digits);
    const course = COURSES.find((c) => c.slug === courseSlug);
    if (!course?.lessons.some((l) => l.number === number)) {
      throw new Error(`${where}: 「${whole}」の参照先 ${lessonPath(courseSlug, number)} は目次にありません`);
    }
    const start = m.index ?? 0;
    if (start > last) out.push({ type: "text", value: value.slice(last, start) });
    out.push({ type: "link", url: lessonPath(courseSlug, number), children: [{ type: "text", value: whole }] });
    last = start + whole.length;
  }
  if (out.length === 0) return undefined;
  if (last < value.length) out.push({ type: "text", value: value.slice(last) });
  return out;
}

function walk(node: Nodes, fileCourse: string | undefined, where: string): void {
  if (!("children" in node)) return;
  const parent = node as Parent;
  const next: Parent["children"] = [];
  for (const child of parent.children) {
    if (child.type === "text") {
      const parts = splitLessonRefs(child.value, fileCourse, where);
      if (parts) {
        next.push(...parts);
        continue;
      }
    } else if (child.type !== "link" && child.type !== "linkReference") {
      walk(child, fileCourse, where);
    }
    next.push(child);
  }
  parent.children = next;
}

export function remarkLessonRefs() {
  return (tree: Root, file: { path?: string }) => {
    walk(tree, courseOfFile(file.path), file.path ?? "(unknown)");
  };
}
