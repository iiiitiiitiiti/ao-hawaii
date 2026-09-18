# 009. 本文の「Lesson NN」をビルド時にリンクへ変え、用語は用語集と双方向につなぐ

- 日付: 2026-09-18
- 対象: `src/lesson/remarkLessonRefs.ts`・`remarkTermIds.ts`、`vite.config.ts`、`src/lesson/mdxComponents.tsx`、`src/widgets/Terms.tsx`、`src/pages/GlossaryPage.tsx`、`content/pages/notation.mdx`

## 決定

- 本文に書かれた「講座 Moʻolelo Lesson 05」「（Moʻolelo Lesson 04）」「Lesson 03」を、remark プラグインがビルド時にそのレッスンへのリンクへ変える。MDX の本文は書き換えない
  - 講座名付きの参照を先に拾う（「講座」の語の有無は問わない）。講座名の無い「Lesson NN」は、その本文が属する講座のレッスンとする
  - 対象はテキストノードだけ。JSX の属性値（`<Example src="講座 Hula Lesson 04">`）や JS 式（Quiz・Sources の配列）は変えない
  - 目次に無いレッスンを指す参照と、講座に属さない本文（`content/pages`）での講座名なし参照は、ビルドを落とす
- 例外として `content/pages/notation.mdx` の1行（「講座 <H>ʻŌlelo Hawaiʻi</H> の Lesson 01」）は、JSX でテキストが分断されるので本文を Markdown のリンクに書き換えた
- 内部リンクは `mdxComponents.a` で react-router の `Link` に差し替える（`href` が `/` で始まるときだけ）
- レッスンの用語ボックスの各語を、用語集のその語（`/glossary#<id>`）へのリンクにする。用語集は各語に「出てくるレッスン」と「出てくる曲」（公開曲のみ）を並べ、`#id` で来たときその語を強調する
- 各 MDX の `<Terms ids>` は、remark プラグインが `export const termIds` としてモジュールから出す。「出てくるレッスン」の逆引きはそれを読んで作り、手で索引を持たない

## 背景

公開時点の本文には、講座をまたぐ参照がテキストで書かれていたが（「Lesson NN」が計88回、うち講座名付き55回）、リンクは0件だった。ペレは地質・神話・フラの3講座に出てくるのに、行き来する手段が無かった。用語ボックスから用語集へのリンクも、用語集から登場レッスンへの逆引きも無かった。

プランレビュー（Fable）で、「講座」の語が無い講座名付き参照（`mea-ola/lesson-03` の「（Moʻolelo Lesson 04）」など）を同じ講座の素の参照として扱うと、黙って別のレッスンへ繋がる、と指摘された。講座名付きを先に処理し、テスト（`tests/lessonRefs.test.tsx`）でファイルごとに「Lesson NN の出現数＝リンク数」とリンク先の講座を照合する。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| 本文の参照を MDX に手でリンクとして書き込む | 33ファイルに差分が出て、今後 Mac で書く本文では書き忘れる。プラグインなら書き方を変えずに済み、参照先の誤りもビルドで捕まる |
| 共通の用語からの「関連レッスン」自動生成 | 共有語が多いだけの弱いつながりが混ざる。書き手が本文で名指しした参照のほうが質が高い |
| 逆引きを `?raw` で MDX 原文を読んで作る | `@mdx-js/rollup` が `?raw` 付きの読み込みも変換してしまい、原文が取れない |
| 逆引きの索引を手で持つ | 本文の `<Terms>` と食い違っても気づけない |

## 検証

- 全33レッスンで、出現数とリンク数が一致し、講座名付き参照は名指しした講座へ繋がる（`tests/lessonRefs.test.tsx`）
- 目次に無い参照（Lesson 09）を一時的に入れると `npm run build` が「参照先 /hula/lesson-09 は目次にありません」で落ちることを確認した
- 全245語の逆引きが、原文の `<Terms>` から数えた対応と一致する（`tests/termLinks.test.tsx`）
