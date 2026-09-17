# 001. 既存リポジトリと同じスタックを踏襲する

- 日付: 2026-09-18
- 対象: `package.json`、`vite.config.ts`、`.github/workflows/deploy.yml`

## 決定

Vite + React 19 + TypeScript + MDX + Vitest → GitHub Pages。instrument-lessons の構成をそのまま使い、レッスン基盤（目次は TS、本文は MDX、描画テスト）も同じ形にする。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| Python で静的 HTML を生成（quiz-atlas 方式） | 確認問題・用語ボックス・進捗など対話要素を素の JS で書き直すことになる。instrument-lessons の Lesson レイアウトと進捗ストアを流用するほうが速く、保守も1系統で済む |
| Astro + MDX | コンテンツサイトには最適だが、既存3リポと別スタックになる（instrument-lessons DDR 002 と同じ理由） |

## 影響範囲

- レッスンを足すときは `src/content/courses.ts` に1行、`content/<講座>/lesson-NN.mdx` に本文。CSS・ルーティングは触らない
- PWA は入れていない（練習中にオフラインで開く前提がない）。必要になれば instrument-lessons の `VitePWA` 設定を移せる

## 検証

`npm run lint` / `npm test`（126件）/ `npm run build` が通り、GitHub Pages の deploy.yml が成功して https://iiiitiiitiiti.github.io/ao-hawaii/ で描画を確認した。
