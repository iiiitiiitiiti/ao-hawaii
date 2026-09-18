# メレを読む — 曲ごとの出典つき事実ノート

「メレを読む」（/mele）に載せる曲の資料調査ノート。本文執筆用の素材で、そのまま公開する原稿ではない。
歌詞そのものはここに書かない（保護曲の平文は Drive の `ao-hawaii-private/mele/<id>.json` にだけ置く。DDR 008）。

- 各事実の行末に出典 URL を付けた。URL は実際にアクセスして内容を確認したもの。
- 書き方は DDR 007（出典が複数なら言い切る、1つならその出典を本文で名指し、0なら書かない）。

## Noho Paipai（id: noho-paipai）— 2026-09-18 調査

ウクレレ教材（instrument-lessons）の最初の鍵付き曲。ao-hawaii 側にも同じ id で載せ、`ukulele` に教材のページを結ぶ。

### 作者と成立

- 題は Noho Paipai、英題 Rocking Chair Hula（huapala.org の英題は Rocking Chair）。noho paipai（揺り椅子）の語義は本体を書くときに PE 辞書で引く（wehewehe.org は curl・WebFetch とも 403。Playwright で開く）。
- 作者は John Kameaaloha Almeida。作者自身の録音2点がクレジットに Almeida を記す。
  - Hawaiʻi State Archives 所蔵の KGU 放送用原盤（Johnny Almeida's Hawaiians、1938年ごろ、KGU/Hawaiian Transcriptions 217、matrix HT-217、Gene Becker Hawaiian Phonographic Recordings 箱1）。https://digitalarchives.hawaii.gov/browse/parent/ark:70111/4T1X
  - 49th State Hawaii Records 64-B（John K. Almeida And His Hawaiians。レーベルの作者欄は John K. Almeida）。Internet Archive で音源を聴ける。https://archive.org/details/78_noho-paipai-rocking-chair-hula_john-k-almeida-and-his-hawaiians-johnny-almeida-a_gbia0035277b
- huapala.org は「Traditional」と掲げ、末尾に「public domain から取られ、広めた John K. Almeida の名がクレジットされる」と注記する。訳は Mary Kawena Pukui。https://www.huapala.org/No/Noho_Paipai.html
  - 本サイトの扱い: 録音のクレジットが2点あるので作者は Almeida と書く。huapala の「Traditional」は「huapala.org は伝承曲として掲げる」と名指しで添える。
- 権利: 作者 Almeida は1985年没。日本では没後70年（2055年末）まで保護期間中。本体は鍵付き（instrument-lessons DDR 021、docs/songs-licensing.md）。

### 作者 John Kameaaloha Almeida（1897–1985）

- 1897年11月28日 Oʻahu の Pauoa 谷生まれ、1985年10月9日没（Honolulu Star-Bulletin 1985-10-11 の訃報）。https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida
- ポルトガル人契約労働者の父と、Honolulu のレイ売りの母の子。父が去ったあと Waiʻanae の Paulo Kameaaloha が hānai の父となり、その名 Kameaaloha を生涯名乗った。家庭の言葉はハワイ語。10歳までに全盲。https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida
- 1930年代の KGU のラジオ番組で「The Dean of Hawaiian Music」と呼ばれた。300曲以上を作ったとされ、代表作に Iesū Me Ke Kanaka Waiwai、Tuberose Hula、Green Rose Hula（Kanahele『Hawaiian Music & Musicians』2012, pp.14–17 を Wikipedia が引く）。https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida
- 1946年に KULA 放送で歌い手を募り、Genoa Keawe を見いだして育てた。https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida
- 1998年 Hawaiian Music Hall of Fame 入り。https://web.archive.org/web/20170219180026/http://www.digitaldna.co.jp/hawaiianmusichalloffame/hmhof/honorees/1998/almeida.html

### 本サイトに載せるときの MeleMeta 案（src/content/mele.ts）

```ts
{
  id: "noho-paipai",
  title: "Noho Paipai",
  composer: "John Kameaaloha Almeida（1897–1985）",
  year: "1938年ごろ（KGU 放送用原盤）",
  protection: "locked",
  summary: "揺り椅子に二人で座る情景を歌う hula ʻauana の定番。英題 Rocking Chair Hula。作者 Almeida 自身の録音が残る。",
  background: [
    "作者は John Kameaaloha Almeida。Oʻahu の Pauoa 谷に生まれ、10歳までに視力を失い、1930年代の KGU のラジオ番組で「The Dean of Hawaiian Music」と呼ばれた。300曲以上を作り、Genoa Keawe を見いだした人でもある。",
    "作者自身の録音が2点残る。Hawaiʻi State Archives が所蔵する1938年ごろの KGU 放送用原盤と、49th State Records 盤で、どちらもクレジットは Almeida。huapala.org は伝承曲（Traditional）として掲げ、広めた Almeida の名を添える。",
  ],
  related: ["hula/lesson-02", "hula/lesson-04", "olelo/lesson-07"],
  ukulele: "https://iiiitiiitiiti.github.io/instrument-lessons/ukulele/songs/noho-paipai",
}
```

- `ukulele` の URL は instrument-lessons の `src/routes.tsx`（`/:instrumentSlug/songs/:songId`、BrowserRouter）に合わせた。
- `tests/mele.test.ts` は `locked` の曲に暗号文を要求する。MeleMeta を足すのは `npm run mele:lock` で `src/content/mele-locked/noho-paipai.json` を作るのと同じコミットで行う。

### 本体（MeleBody）を書くときに要るもの

- 歌詞の正本: 持ち主の教室の歌詞カード（写真。2026-09-18 時点で未着）。綴りは DDR 010（辞書の見出し語に合わせる）。
- 逐語注（words）の語義は PE 辞書で1語ずつ引く。kaona は出典がある範囲だけ書く（huapala の訳は Pukui。行訳の参考にする）。
- version 欄には「歌詞カードの版と huapala 掲載版の違い」を書く。

### お手本のメロディの元（2026-09-18 夜、持ち主の決定: 録音から書き起こす）

- 49th State 64-B の Almeida 録音（Internet Archive の mp3）を機械で解析した。転写のピッチずれは −0.28 半音（A=440 基準へ補正して解析）。補正後の調は B♭（伴奏の chroma で B♭・F7・E♭・E♭7 が並ぶ）、テンポは約129 BPM（4/4 で数えた場合）。曲長 2分58秒。
- ボーカルを分離（demucs htdemucs）して音高を取った（pyin と basic-pitch）が、**旋律は取り出せなかった**。理由は3つ。歌がトリオ（Julia Nui's Kamaainas）でハーモニーを付けていて B♭・D・F が同時に鳴る。78回転の回転むらで音高が半音の間を揺れる。1940年代の録音で分離が粗い。
- 結論: **旋律は、単独の声で歌った録音（持ち主が携帯で歌うか、教室の音源）から取る。** 単独の声なら pyin で拍ごとの音が安定して取れる。教室で踊っている版が正なので、Almeida 盤は調・テンポ・構成の確認用にする。
- 解析の手順（再現用）: `ffmpeg` で mono wav → `demucs --two-stems=vocals` → `librosa.effects.pitch_shift` で補正 → `librosa.pyin` を拍（`librosa.beat.beat_track`）に当てはめて拍ごとの中央値を取る。Python 3.11 の venv に demucs・basic-pitch・librosa・`setuptools<81`（basic-pitch が pkg_resources を要る）。

### 旋律の書き起こし（2026-09-18 夜、持ち主指定の録音で完了）

- 元: Wailau and Lopaka Ryder『Na Mele Hula』（Palm Records、2008）の音源 https://youtu.be/-XFwk3mFixU 。声が1本で、調は C、チューニングのずれなし。「節（4行＝原曲 2/4 で16小節）＋ vamp 4小節」が10回。
- 手順: yt-dlp → ffmpeg（mono wav）→ demucs（vocals）→ pyin と basic-pitch → 拍（83.4 BPM、原曲 2/4 の1小節に相当）を4分割した音高の中央値を10節分重ねて多数決 → 歌詞カード（鳥山親雄『ハワイアン・メレ1001曲ミニ全集』1015ページ）の音節と発音位置（basic-pitch の onset の集計）に当てる。
- 結果は Drive の `ao-hawaii-private/ukulele/noho-paipai.json`（sheet・meaning・ABC・progression。4/4 に倍書き、bpm 150）と `ukulele/noho-paipai.melody-draft.md`。解析の中間ファイルは `ukulele/analysis/`。合成音を持ち主に送り、耳での確認待ち。
- コードは歌詞カードのとおり（C / F / C、C / D7 / G7 / C）。録音の A7・C7 は採らない。

### 残る問い（持ち主に確認）

- **ウクレレ教材のお手本（ABC のメロディ）の元**。2026-09-18 夜に「録音から書き起こす」で決定（上の節）。歌詞カードには通常メロディが無い。instrument-lessons は「歌詞コード譜を持つ曲はお手本も持つ」をテストで強制している（DDR 017）。選択肢: (a) メロディ入りの譜面があれば写真を送ってもらう、(b) Almeida の録音（Internet Archive）から書き起こし、持ち主が耳で確かめる、(c) 鍵付き曲に限りお手本を任意にする（規則の例外。DDR が要る）。
