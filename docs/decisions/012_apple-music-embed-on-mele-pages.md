# 012. 曲ページに Apple Music の埋め込みを置く（音源は持ち主が指定する）

- 日付: 2026-09-19
- 対象: `src/mele/types.ts`（`MeleMeta.appleMusic`）、`src/mele/validate.ts`、`src/pages/MelePage.tsx`、`src/styles.css`、`src/content/mele.ts`

## 決定

曲ページの「成り立ち」の下に「聴く」の節を置き、Apple Music の埋め込み（`embed.music.apple.com` の iframe）を出す。音源は持ち主が指定した曲ページの URL を `MeleMeta.appleMusic.url` に持ち、誰の録音かを `note` に書いて画面に出す。埋め込みは任意で、指定の無い曲には節を出さない。

## 背景

持ち主が Pauoa Ka Liko Ka Lehua の Apple Music の URL を送り、埋め込みを求めた。ウクレレ教材（instrument-lessons DDR 022）でも同日、合成のお手本の代わりに Apple Music の埋め込みを採っている。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| リンクだけ置く | 曲ページを離れないと聴けない。埋め込みなら読みながら聴ける。リンクは埋め込みの下に併記する |
| YouTube の埋め込み | 持ち主は Apple Music を使う。YouTube は削除・差し替えが起きやすい |
| 埋め込み URL をそのまま持つ | `music.apple.com` の URL を持てば、リンクと埋め込みの両方を1つの値から作れる。検査も1つで済む |
| 音源を自動で探す | 同じ曲に録音が多く、持ち主が踊る版と違う録音を出すおそれがある。持ち主の指定だけを載せる |

## 影響

- iframe は Apple のドメインを読む。GitHub Pages は CSP を出さないので動く。Apple Music に入っていない端末では30秒の試聴になる（画面にそう書く）
- `validateMeta` が URL の形（`music.apple.com/<国>/album/<曲>/<albumId>?i=<trackId>`）と note の有無を検査する
