# 021. 保護期間中の曲は本体を暗号化して置き、鍵は ao-hawaii と共有する

- 日付: 2026-09-18
- 対象: `src/instruments/ukulele/songs/{types,index,locked}.ts`、`src/instruments/ukulele/songs/locked/<id>.json`、`src/instruments/ukulele/songs/song-keyinfo.json`、`src/core/lock/{crypto,keyStore}.ts`、`src/instruments/ukulele/pages/SongPage.tsx`、`scripts/song-lock.ts`、`tests/ukulele/songs.test.ts`、`docs/songs-licensing.md`（DDR 004 の適用範囲を改める）

## 決定

DDR 004（日本・米国の両方で保護期間が満了した曲だけ載せる）は、**平文で公開する曲**の条件にする。保護期間中の曲は、ao-hawaii の「メレを読む」（ao-hawaii DDR 008）と同じ方式で本体を暗号化し、公開サイトには暗号文だけを置く。

| 区分 | 条件 | 本体の置き場所 |
|---|---|---|
| 公開（public） | DDR 004 の条件を満たす | 曲ファイル `songs/<id>.ts` に平文（従来どおり） |
| 鍵付き（locked） | それ以外 | 平文は Drive の `ao-hawaii-private/ukulele/<id>.json`。`npm run song:lock` が手元で検査して暗号化し、暗号文だけを `songs/locked/<id>.json` に置く |

鍵をかける範囲は**曲の本体すべて**（持ち主の決定）: `sheet`（歌詞コード譜）・`performance`（お手本の ABC）・`progression`・`arrangement`・`meaning`。公開するのは `id`・`title`・`altTitle`・`note`（歌詞を引かない紹介）・`chords`（使うコード名）・`licensing`。

**鍵は ao-hawaii と共有する**（持ち主の決定「パスワードは ao-hawaii と共通」を、入力1回で両サイトが開く形まで進める）:

- パスフレーズは Drive の `ao-hawaii-private/passphrase.txt`。新しく作らない
- salt と反復回数は ao-hawaii の `src/content/mele-keyinfo.json` と同じ値を `song-keyinfo.json` に写す。導く鍵が同じになる
- ブラウザが覚える先も ao-hawaii と同じ IndexedDB（DB 名 `ao-hawaii-mele`、store `keys`、キー `site`）。2サイトは同じオリジン `iiiitiiitiiti.github.io` なので、どちらかで1回入れれば両方で開く
- 「この端末から鍵を消す」は両サイトに効く。画面にそう書く
- AES-GCM の追加認証データは `ukulele:<id>` にし、ao-hawaii の暗号文（`<id>`）と取り違えても復号できないようにする

権利の記録は、鍵付きの曲にも `docs/songs-licensing.md` の節を必須にする。書くのは「なぜ保護期間中と判断したか（作者と没年、または不明）」「平文の出どころ（持ち主所有の歌詞カード・曲集）」「検証日」。型は `licensing.status: "public-domain" | "protected"` を足し、`protected` の曲は `died` を `"unknown"` や存命の扱いにできる。テストは `protected` の曲について没年・出版年の PD 判定を飛ばす。代わりに次を検査する。平文の曲ファイルに `sheet`・`performance`・`meaning` が無いこと、暗号文ファイルが `{v, iv, ct}` だけであること、記録の節に「保護期間中と判断した理由」があること。

## 背景

持ち主の依頼。ao-hawaii の「メレを読む」で著作権のある曲を暗号化して置けるようになったので、ウクレレ教材でも同じことをしたい。最初の曲は **Noho Paipai**（huapala.org は「Traditional」としつつ John K. Almeida（1897〜1985）の名をクレジットに挙げる。作者とみなす資料がある以上、日本側では保護期間中として扱う）。歌詞コード譜とお手本の ABC は、持ち主が送る歌詞カードの写真から書き起こす（届くまで本体は置けない）。

ウクレレ教材では歌詞だけでなくメロディ（ABC）とコード進行も著作物なので、鍵の範囲を曲の本体すべてにした。コード名の集合（`chords`）だけは公開する。「弾ける曲だけ」「コード数」の絞り込みが鍵付きの曲にも効くようにするためで、コード名の一覧は編曲にも歌詞にも当たらない。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| 鍵付きの曲は別のパスフレーズ・別の salt にする | 端末ごとに2回入力が要る。持ち主は「パスワードは共通」と決めている |
| パスフレーズは共通だが IndexedDB は別の DB 名にする | 鍵は同じでも、覚える先が別だと両サイトで1回ずつ入力が要る。同じ DB を見れば1回で済む。代わりに片方で「鍵を消す」と両方消えるので、画面に書く |
| `chords` も暗号化し、鍵付きの曲は絞り込みの対象外にする | 「今の自分が弾ける曲」の一覧から外れ、ライブラリとして役に立たない。コード名の集合は権利の対象になる表現ではない |
| ao-hawaii の `crypto.ts`・`keyStore.ts` を npm パッケージにして両リポで共有する | 2ファイル・150行程度。パッケージ化の手間の方が大きい。写して、先頭に「ao-hawaii の同名ファイルと同じ内容を保つ」と書く |
| 暗号化を GitHub Actions で行う | 平文を CI へ渡す置き場所が要る（ao-hawaii DDR 008 と同じ理由で却下） |
| 曲ファイルを `.ts` のまま暗号化する | 型検査とテストが平文に依存する。JSON にして、公開部分（`.ts`）と本体（`.json`）を分ける方が検査の境界が明確 |

## 影響

- IndexedDB の鍵は同じオリジンの JS から「使える」（中身は取り出せない）。持ち主の他サイトが改ざんされた場合のリスクは ao-hawaii DDR 008 と同じく受け入れる
- 平文の歌詞コード譜と ABC は、書き起こしを行った Claude のセッションログに残る（避けられない。DDR 008 と同じ）
- パスフレーズを作り直したら、ao-hawaii と instrument-lessons の両方で全曲を暗号化し直す
- `song:lock` は暗号化の前に、公開曲と同じ検査（歌詞行と意味の対応、ABC とコード譜の一致、音域、テンポ）を平文にかける。通らなければ書かない。CI は平文を見ない
- 鍵付きの曲の絞り込み「弾ける曲だけ」は `chords` で判定できる。歌詞コード譜の「かんたん」「セーハあり」なども同じ

## 検証

- `npm run lint`・`npm test`・`npm run build` が通る
- 暗号化の往復テストは実在の歌詞ではなくダミーの本体で行う（`tests/ukulele/lockedSongs.test.ts`）
- ブラウザでは、テスト用パスフレーズで暗号化したダミー曲（`__dummy__`、テスト時だけ登録）でパスワード入力〜復号〜「鍵を消す」を確かめる。本物のパスフレーズは画面に出さない
- Noho Paipai は、歌詞カードの写真が届いてから本体を書き起こし、`song:lock` で暗号化して公開サイトで開けることを確かめる。それまでは曲ページに「本体はまだ置かれていません」を出す

## 設計レビュー（実装前、fable-advisor）

反映した指摘: salt を手写しにせず Drive の `ao-hawaii-private/keyinfo.json` を正本にして両リポの lock スクリプトが照合する（`--init` は持たない）／IndexedDB に salt も覚えて、鍵の作り直しを検知したら捨てる／`licensing` を `status` で分ける共用体にして公開曲の必須項目を落とさない／鍵付きの曲の検査を双方向にする（protected ⟺ 暗号文がある ⟺ 平文に本体が無い）／lock 時に公開した `chords` と本体のコード集合の一致を検査する／検査関数を `songs/validate.ts` に切り出して Vite 依存を無くす／一覧と曲ページの「保護期間が満了した曲だけ」の文面を2本立てに直す／`tsconfig` に `allowImportingTsExtensions` を足す。
見送った指摘: なし。持ち主への確認事項として「コード名の集合だけ公開する」判断を報告に残す。

## 検証の結果（2026-09-18）

- lint・テスト295件・build 通過。暗号化の往復と検査関数はダミーの本体で検査
- ブラウザ（preview）で、テスト用パスフレーズで暗号化したダミー曲を、パスワード入力 → 復号 → 再読み込みで鍵が覚えられている → 「鍵を消す」で再び入力を求める、まで確認。IndexedDB は `ao-hawaii-mele@1` の1つだけで、ao-hawaii と共有されている
- Noho Paipai の本体は歌詞カード待ち。曲ページには「本体はまだ置かれていません」が出る
