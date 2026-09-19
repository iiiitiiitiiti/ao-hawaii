# 013. ウクレレ教材（instrument-lessons）を ao-hawaii に統合し、サイト全体を PWA にする

- 日付: 2026-09-19
- 対象:
  - 取り込んだもの: `src/instruments/**`（旧リポの src/core と src/instruments）、`src/instruments/pages/`、`content/ukulele/`、`tests/instruments/`
  - 記録: `docs/decisions/ukulele/`（旧リポの DDR 001〜022、番号はそのまま）、`docs/ukulele/`
  - 配線: `scripts/song-lock.ts`、`scripts/make-icons.mjs`、`src/lib/lock/`、`src/routes.tsx`、`vite.config.ts`

## 決定

別リポジトリ・別サイトだった instrument-lessons（https://iiiitiiitiiti.github.io/instrument-lessons/）を ao-hawaii に取り込み、1リポジトリ・1サイトにする。ウクレレ教材は `/ukulele/…` の区画になる。

git 履歴は git-filter-repo で統合後の配置に書き換えてから、`merge --allow-unrelated-histories` で取り込んだ。`git log --follow` で旧リポの履歴が追える。

- 鍵の仕組み（`crypto.ts`・`keyStore.ts`）は `src/lib/lock/` の1か所にする。salt は `src/content/mele-keyinfo.json` だけ（旧リポの `song-keyinfo.json` は捨てる）。IndexedDB 名 `ao-hawaii-mele` と localStorage の進捗キーは変えない（端末に覚えた鍵と進捗をそのまま引き継ぐ）
- ルートは `/:instrumentSlug` を `SectionPage` で受け、`findInstrument` に当たれば楽器の画面、外れれば講座の画面に振り分ける。講座の画面（CoursePage・LessonPage）は slug を props で受け取れるようにした
- ウクレレ本文（`content/ukulele/*.mdx`）には ao-hawaii の remark（レッスン参照・用語リンク）を掛けない。MDX プラグインを2系統に分け、include/exclude を排他にする。ao-hawaii 側の本文の glob は `content/ukulele` を除く
- スタイルは旧リポの `styles.css` を `src/instruments/styles.css` に置き、全体を `.instrument-section { … }` で包む（`:root`・`body`・`main` は `&`）。ao-hawaii と同名のクラス（`hero`・`lesson`・`btn`・`crumb`・`done-toggle`）には `uke-` を付けて衝突を無くした。ao-hawaii の `html { font-size: 87.5% }`（480px 以下、DDR 011）は楽器の画面にも効く。旧サイトは「譜面台の距離で見るため下げない」としていた。同じサイトの中に文字の基準を2つ置くより、揃える方を採る
- サイト全体を PWA にする（vite-plugin-pwa、autoUpdate）。precache は js/css/html/svg/png/json。`public/images`（28MB）は precache せず、見た図版だけ runtime cache（CacheFirst、200件・30日）。本文を eager に束ねた main chunk が既定の 2MiB を超えるので上限を 6MiB にした
- 旧リポジトリは GitHub でアーカイブし、持ち主が削除する（`delete_repo` 権限が要る）。旧 URL への転送は置かない。旧サイトの Service Worker は同一オリジンに残るので、旧アプリをホーム画面から消し、サイトデータを消す

## 背景

持ち主の相談（2026-09-19）。両サイトは土台（Vite＋React＋MDX＋Vitest）が同じで、鍵の仕組みを2か所に写して保っていた。Noho Paipai を両サイトに別々に置いたとき、2つのセッションが別リポで同じ曲を触って平文を上書きする事故が起きた。踊る曲をウクレレでも弾く運用では毎回2回書くことになる。持ち主が「統合する／ウクレレ側の PWA も要る／設計記録は履歴ごと／旧リポは削除」と決めた。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| 別リポのまま、鍵の共有コードだけ npm パッケージに切り出す | 曲の二重登録と2セッション衝突は残る。パッケージ化の手間は統合と変わらない（旧 DDR 021 でも却下） |
| instrument-lessons を本体にして ao-hawaii を取り込む | 内容の量は ao-hawaii が数倍。講座・用語集・年表・メレの骨組みに「楽器」を足す方が自然 |
| subtree merge（`merge -s ours` ＋ `read-tree --prefix`）で履歴を取り込む | 実測で `git log --follow` が subtree の境界を越えなかった。filter-repo で先に配置を書き換える方が履歴が残る |
| CSS の衝突を、同名クラスの property を1つずつ打ち消して解く | ao-hawaii 側だけが持つ property（背景・角丸など）は上書きで消えず、崩れが静かに起きる。名前を変える方が確実 |
| ウクレレのデザインを ao-hawaii のトークンへ全面的に寄せる | 統合の作業と切り分ける。まず動かし、見た目の統一は別の作業にする |
| `public/images` も precache する | 28MB を初回に全部落とす。図版は見たものだけで足りる |
| 旧 URL に転送ページを残す | リポジトリを消すと GitHub Pages も消える。持ち主が了承 |

## 影響

- ウクレレの URL は `/ao-hawaii/ukulele/…` に変わる。ホーム画面の登録は張り直し
- `npm run song:lock` は `src/content/mele-keyinfo.json` を Drive の `keyinfo.json` と照合する。平文の置き場（`ao-hawaii-private/ukulele/<id>.json`）は変わらない
- ウクレレ本文にも DDR 007 の禁止フレーズ検査（`tests/hedging.test.ts`）と綴りの検査が掛かる（content/ を再帰的に走査するため）
- 旧リポの DDR は `docs/decisions/ukulele/` に番号そのままで置く。本文中の「DDR 021」はそちらを指す

## 検証

- `npm run lint`・`npm test`（28 ファイル・500 件）・`npm run build`（`dist/manifest.webmanifest`・`dist/sw.js` が出る）
- preview を 390px と 1024px で撮り、ウクレレの一覧・レッスン・曲・鍵付き曲と、講座・メレの各ページに崩れが無いことを見る
- 本番で `/ukulele/`、`/ukulele/songs/noho-paipai`、`/ukulele/lesson-01`、`/mele/noho-paipai`、`manifest.webmanifest` を開く。旧サイトで付けた進捗が `/ukulele` に見える
