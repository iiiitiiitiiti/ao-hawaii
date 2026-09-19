# Aʻo Hawaiʻi — ハワイを学ぶ講座

自分用の学習サイト。地理・生態系・神話・歴史・フラ・ハワイ語の6講座を、出典に当たりながら講座形式で読む。歌詞を1行ずつ読む「メレを読む」と、ウクレレ教材（旧 instrument-lessons を2026-09-19 に統合。`docs/decisions/013`）も同じサイトにある。

- 公開: https://iiiitiiitiiti.github.io/ao-hawaii/ （`main` へ push すると `.github/workflows/deploy.yml` が build → deploy）
- 設計: [docs/DESIGN.md](docs/DESIGN.md)、判断の記録: [docs/decisions/](docs/decisions/)

## 開発

```sh
npm install
npm run dev        # http://localhost:5173/ao-hawaii/
npm run lint       # 型検査
npm test           # 画像の記録・表記・用語集・全レッスン描画の検査
npm run build
```

## 講座

| 講座 | 内容 | 本数 |
|---|---|---|
| ʻĀina | 地理と自然環境（成り立ち・地形と気候・ahupuaʻa・火山・海・地名と風雨の名） | 6 |
| Nā Mea Ola | 生態系（到達と固有種・鳥・植物・海の生きもの・外来種と保全） | 5 |
| Moʻolelo | 神話（クムリポ・四大神・Pele と Hiʻiaka・Laka と Kapo・Māui と ʻōlelo noʻeau） | 5 |
| Mōʻaukala | 歴史（到達〜王国〜転覆〜州〜復興） | 5 |
| Hula | フラ（歴史・kahiko/ʻauana・用語・mele と kaona・hālau と ʻūniki・現在） | 6 |
| ʻŌlelo Hawaiʻi | ハワイ語文法（音と表記〜関係節と辞書の引き方） | 6 |

## ウクレレ教材（/ukulele）

- 本文は `content/ukulele/lesson-NN.mdx`、目次は `src/instruments/ukulele/curriculum.ts`、曲は `src/instruments/ukulele/songs/`
- 掲載曲の権利の記録は `docs/ukulele/songs-licensing.md`。保護期間中の曲は Drive の平文を `npm run song:lock` で暗号化して置く（`docs/decisions/ukulele/021`）
- 旧リポジトリの設計記録は `docs/decisions/ukulele/`（番号は旧リポのまま）、設計仕様とプランは `docs/ukulele/superpowers/`
- PWA（ホーム画面追加・オフライン）はサイト全体に掛かる。アイコンは `npm run icons` で `public/icon.svg` から作る

各レッスンの根拠は `docs/research/<講座>.md`（出典 URL つきの調査ノート）にある。本文は出典が複数あれば言い切り、1つならその出典を名指しし、0なら書かない（`docs/decisions/007`。禁止フレーズは `tests/hedging.test.ts` が検査する）。

## 本文を書く

- 目次は `src/content/courses.ts`、本文は `content/<講座>/lesson-NN.mdx`
- 用語は `src/content/glossary.ts` に足してから `<Terms ids={[...]} />` で引く
- 画像は Commons から `npm run image -- "File:Foo.jpg" foo-id` で取り込む（手で `images.json` を書かない）
- 各レッスンは `<Lead>` → 本文 → `<Terms>` → `<Quiz>` → `<Sources>` の順。確認問題と出典が無いとテストが落ちる
