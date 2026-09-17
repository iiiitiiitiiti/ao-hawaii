# 002. 画像は Commons 取得スクリプト経由でのみ取り込み、記録をテストで検査する

- 日付: 2026-09-18
- 対象: `scripts/fetch-image.mjs`、`src/content/images.json`、`tests/images.test.ts`、`src/widgets/Photo.tsx`

## 決定

画像は Wikimedia Commons から `npm run image -- "File:…" <id>` で取り込む。スクリプトが API の `extmetadata` から作者・ライセンス・出典 URL・版・取得日を `images.json` に書き、手で manifest を編集しない。許可ライセンスは Public domain（PD 変種を含む）/ CC0 / CC BY / CC BY-SA（地域版 "3.0 us" を含む）。多重ライセンスはカンマで分け、1つでも許可があれば可。NC・ND は不可。

`<Photo id>` は manifest に無い id で例外を投げ、テストが「本文の参照が manifest にある」「manifest の全件が実体を持ち許可ライセンス内」「public/images に manifest 外のファイルが無い」を検査する。図版の直下には必ず出典帯（Commons リンク・作者・ライセンス）を出し、`/credits` に全件を並べる。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| Commons へホットリンク | Commons 側のファイル名変更で図が消える。ローカルに複製し、出典を manifest に固定する |
| 手動で保存し出典を手書き | 作者・ライセンスの写し間違いが起きる。今回も Artist 欄に「This file was created by X. It is not in the public domain…」の定型文が入る例があり、機械的に取って整形するほうが安全だった |
| NC ライセンスも許可 | 自分用の非商用サイトなら使えるが、公開先が GitHub Pages で線引きが曖昧になる。判定を単純にするため不可にした |

## 影響範囲

- 被写体側の権利（人物の肖像、現代の彫像）はライセンス欄に出ない。`subjectNote` を人が書く欄として持ち、人物が主題の現代写真は公開行事（Merrie Monarch のステージ等）のものに限った
- PNG のサムネイルが大きい場合（2.7MB の地図）は `sips` で JPEG に変換し、manifest の `file` と `subjectNote` に記した

## 検証

61枚を取り込み、`tests/images.test.ts` の全件が通る。プレビューとモバイル幅（390px）で図版と出典帯の描画を目視した。
