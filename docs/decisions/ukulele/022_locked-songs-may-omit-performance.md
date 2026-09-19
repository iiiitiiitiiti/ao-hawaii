# 022. 五線譜の出どころが無い鍵付きの曲は、合成のお手本を置かず録音の埋め込みで代える

- 日付: 2026-09-18
- 対象: `src/instruments/ukulele/songs/{types,validate}.ts`、`scripts/song-lock.ts`、
  `src/instruments/ukulele/pages/SongPage.tsx`、`src/styles.css`、`tests/ukulele/lockedSongs.test.ts`。
  Noho Paipai の本体は Drive の `ao-hawaii-private/ukulele/noho-paipai.json`

## 決定

鍵付きの曲（DDR 021）の本体で、`performance`（お手本の ABC）を**省けるようにする**。省く条件は「旋律を読める出どころ（五線譜）が無いこと」で、省くときは本体に `noPerformance`（置かない理由）を必ず持たせ、譜面の下に「この曲にはお手本の再生がありません。〈理由〉」と出す。`progression` は `performance` を持つときだけ必須にする。

代わりに、曲データ（公開部分）へ `recordings`（参考の録音。ラベル・URL・埋め込み URL）を持たせ、曲ページに「参考の録音」の節として Apple Music の埋め込み（iframe）とリンクを出す。埋め込みは外部サイトなのでオフラインでは開けない。その旨を節に書く。

公開曲の条件は変えない。`sheet` を持つ公開曲は `performance` も持つ（`tests/ukulele/songs.test.ts`）。

## 背景

Noho Paipai の平文は、持ち主の教室の歌詞カードから書き起こす予定だった（DDR 021）。届いたカード（鳥山親雄『ハワイアン・メレ1001曲ミニ全集』1015ページ）にはコードと歌詞だけで五線譜が無い。DDR 017 以来、譜面を持つ曲はお手本の再生も持つ決まりで、`song:lock` の検査も `performance` を必須にしていた。

別のセッションが Wailau and Lopaka Ryder の録音（2008）を機械解析（音源分離→F0 推定→拍に当てて多数決）して旋律を起こし、検査を通る本体まで作った。持ち主はそれを聴いたうえで「機械的な音声はなくてもいい。Apple Music の埋め込みかリンクでいい」と決めた（2026-09-18 22:40〜22:45）。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| 録音を機械解析して起こした旋律で、合成のお手本を鳴らす（別セッションが作成済み） | 持ち主が「合成の音声は要らない」と判断した。旋律の根拠が原譜でなく解析結果で、他の曲と根拠の強さが揃わないことも残る。作った本体は Drive の `analysis/noho-paipai.with-melody.json` に残し、戻す道は開けてある |
| Almeida 自身の78回転録音（1930〜40年代）から起こす | 蓄音機録音にスチールギターが重なり、読み取りがさらに不確か。教室で歌う版とも遠い |
| 五線譜のある資料の写真をもらう | 持ち主の資料はコードと歌詞だけの曲集で、五線譜が無い |
| 旋律なし（休符だけ）の ABC で伴奏だけ鳴らす | 記法は歌詞の音節を音符に乗せる前提で、休符だけでは歌詞コード譜との位置合わせを検査できない。得られるのはコードの自動演奏だけで、StrumPattern の練習ツールと変わらない |
| リンクだけ置き、埋め込みはしない | 持ち主が埋め込みを指定した。オフラインで開けない点はリンクでも同じ |
| 理由なしで `performance` を省けるようにする | 書き忘れと区別できない。理由を必須にして、譜面の下に出す |
| `performance` を必須のまま残し、Noho Paipai は本体を置かない | 鍵付きの仕組みを作った目的（教室の曲を自分だけ読める形で置く）を果たせない |

## 影響範囲

- `SongBody.performance` が省略可能になった。読む側（`SongSheet`）は元から省略可能だったので変更なし。曲ページは `noPerformance` を注記として出す
- `song:lock` の検査: `performance` が無ければ `noPerformance` を要求し、ABC に依存する検査（歌詞との位置合わせ・小節表・音域・テンポ）を飛ばす。`progression` の必須も `performance` を持つときだけ
- `Song.recordings` は公開曲にも使える（歌詞・編曲を含まないので鍵付きの曲でも公開する）
- 埋め込みは Apple Music の iframe（`embed.music.apple.com`）。Service Worker の precache に外部ドメインは無く（DDR 009 と同じ前提）、オフラインでは枠だけが残る。サブスクリプションが無ければ30秒の試聴になる
- 画面の文言「歌詞コード譜とお手本を暗号化して置いています」を「歌詞コード譜など本体」に改めた
- DDR 021 の本体の定義（sheet・performance・meaning・progression）に補記を入れた

## 検証

- `tests/ukulele/lockedSongs.test.ts`: お手本の無いダミーの本体が、理由があるときだけ検査を通り、理由があっても chords の食い違いは落ちること。お手本と理由の同時指定は落ちること
- `npm run song:lock` が Noho Paipai の平文（お手本なし）を検査して暗号化し、暗号化の往復で内容が一致すること
- 曲ページでパスワード入力の画面と「参考の録音」の埋め込みが出ること
- **判断が間違いだったとわかる条件:** 持ち主がこの曲の合成のお手本を求めたとき。その場合は `analysis/noho-paipai.with-melody.json` を平文に戻して `song:lock` すれば、公開曲と同じ検査に戻る

## 関連ファイル

- `src/instruments/ukulele/songs/types.ts`
- `src/instruments/ukulele/songs/validate.ts`
- `scripts/song-lock.ts`
- `src/instruments/ukulele/pages/SongPage.tsx`
- `src/instruments/ukulele/songs/noho-paipai.ts`
- `tests/ukulele/lockedSongs.test.ts`
- `docs/decisions/ukulele/021_locked-songs-share-key-with-ao-hawaii.md`（補記）
