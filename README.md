# Aʻo Hawaiʻi — ハワイを学ぶ講座

自分用の学習サイト。地理・生態系・神話・歴史・フラ・ハワイ語の6講座を、出典に当たりながら講座形式で読む。

- 公開: GitHub Pages（`main` へ push すると `.github/workflows/deploy.yml` が build → deploy）
- 設計: [docs/DESIGN.md](docs/DESIGN.md)、判断の記録: [docs/decisions/](docs/decisions/)

## 開発

```sh
npm install
npm run dev        # http://localhost:5173/ao-hawaii/
npm run lint       # 型検査
npm test           # 画像の記録・表記・用語集・全レッスン描画の検査
npm run build
```

## 本文を書く

- 目次は `src/content/courses.ts`、本文は `content/<講座>/lesson-NN.mdx`
- 用語は `src/content/glossary.ts` に足してから `<Terms ids={[...]} />` で引く
- 画像は Commons から `npm run image -- "File:Foo.jpg" foo-id` で取り込む（手で `images.json` を書かない）
- 各レッスンは `<Lead>` → 本文 → `<Terms>` → `<Quiz>` → `<Sources>` の順。確認問題と出典が無いとテストが落ちる
