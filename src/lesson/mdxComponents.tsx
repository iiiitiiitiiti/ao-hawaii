import type { MDXComponents } from "mdx/types";
import { Example } from "../widgets/Example";
import { H } from "../widgets/H";
import { Lead } from "../widgets/Lead";
import { Note } from "../widgets/Note";
import { Photo } from "../widgets/Photo";
import { Quiz } from "../widgets/Quiz";
import { Sources } from "../widgets/Sources";
import { Terms } from "../widgets/Terms";

/**
 * レッスン本文（MDX）から使えるコンポーネント。
 * ここに登録し忘れたまま本文で使うと、そのレッスンを開いた時点で例外になる。
 * tests/lessonRender.test.tsx が全レッスンを実際に描画して検査する。
 */
export const mdxComponents: MDXComponents = {
  Example,
  H,
  Lead,
  Note,
  Photo,
  Quiz,
  Sources,
  Terms,
  // 表は横に長くなりがちなので、はみ出しを枠内スクロールにする
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};
