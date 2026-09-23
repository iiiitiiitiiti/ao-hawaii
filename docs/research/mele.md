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
  ukulele: "/ukulele/songs/noho-paipai",
}
```

- `ukulele` はサイト内のパス（`/:instrumentSlug/songs/:songId`）。当初は別サイト instrument-lessons の URL だったが、2026-09-19 の統合（DDR 013）で内部リンクにした。
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

## Pauoa Ka Liko Ka Lehua（id: pauoa-ka-liko-ka-lehua）— 2026-09-19 調査

- 底本: 持ち主の歌詞カード（鳥山親雄『ハワイアン・メレ1001曲ミニ全集』1077ページ、Words & Music by Emma Bush。写真は Drive `ao-hawaii-private/cards/pauoa-ka-liko-ka-lehua.png`）。教室では8連のうち Aia・Makemake・Nihoniho・Haʻina の4連だけを歌う（持ち主の指示）。
- 権利: Emma Bush の生没年を示す資料は Web 検索で見つからず、huapala は Sam Kanahele か Charles W. Booth の作とも伝える。作者の没年を示す資料が無いので保護期間中として扱い、鍵付きで置く。https://www.huapala.org/Pa/Pauoa_Liko_Ka_Lehua.html
- Emma Bush は初期のラジオ・ナイトクラブの歌い手（Dancing Cat Records のライナーノーツ）。https://www.dancingcat.com/liner-notes-punahele
- 地名: Pauoa は Honolulu の谷（Place Names of Hawaiʻi）。ʻAuwaiolimu は Punchbowl の遊び場と通りの名で、Pauoa 谷の入り口近く。長い髪の moʻo の女（Kahalaopuna とする説）が水浴びをしたと伝える（同書）。
- huapala 版との違い（4連分）: 第2連1行目「Makemake nō wau la e ʻike」、同2行目「a ke kīkala」、第3連1行目「ko pelekoki」、第1連2行目の ā を a と書く。本サイトは教室の版（カード）に従う。

## Ka Ua Kilihune（id: ka-ua-kilihune）— 2026-09-19 調査

- 底本: 持ち主の歌詞カード（鳥山親雄『ハワイアン・メレ1001曲ミニ全集』499ページ、Words & Music by Leonard Kaleonahenaheokalani Spencer Beck & Al Makahinu Barcarse。写真は Drive `ao-hawaii-private/cards/ka-ua-kilihune*.{png,jpg}`）。3連すべて。
- 権利: 作者は現代の kumu hula（Barcarse は Kāneʻohe の hālau Ka Ua Kilihune の kumu。弟子 Cameron Konapiliahi Barcarse が2016年に ʻūniki）。保護期間中で鍵付き。https://generations808.com/hula-is-life/ 、https://www.instagram.com/cameronkonapiliahi/（検索結果の要約）
- huapala.org にページ無し（/Ka/Ka_Ua_Kilihune.html は 404）。比べる版が無いので綴りはカードのとおり。
- 音源: Hoku Zuttermeister『Aina Kupuna』（2007-03-08）trackId 306218623。持ち主指定。
- 地名: Kāneʻohe（Oʻahu 風上側）、Koʻolau（風上側・山脈）、Mokoliʻi（Kāneʻohe 湾 Kualoa 沖の小島、Chinaman's Hat、字義「小さな moʻo」）— Place Names of Hawaiʻi。
- カードの解説: Hiʻiaka が moʻo を海に投げ、尾が島になった伝え。作者二人は島の呼び方で意見を分け、Leonard が Al の「小さな島（Mokoliʻiliʻi）」を受け入れて歌ができた。Al は Kāneʻohe 在住。

## He Mele no Kāne（id: he-mele-no-kane）— 2026-09-24 調査

- 底本: Emerson『Unwritten Literature of Hawaii』（1909）第41章「The Water of Kane」、p.257–259（`docs/research/emerson-1909-gutenberg.txt` の 14597–14760行）。本文6連39行、英訳45行、注512–518
- 権利: 伝承の詠唱で1909年刊。歌詞の規約（1929年より前の出版・作者不詳の伝承）を満たすので全文を公開曲として置く
- Emerson の位置づけ: 英語圏の聖杯伝説にあたる「the most representative romantico-mystical aspiration」。「This mele comes from Kauai」。Kauaʻi は「less than any other of the group was dazzled by the glamour of royalty」
- 綴り（DDR 010、PE の見出しに合わせた）: ú-i→ui（PE ui 1. の例文「He ui, a he nīnau kēia (chant)」）、Hae-hae→Haʻehaʻe（Place Names 1974「Land division near Kumu-kahi, Makuʻu qd., Hawaiʻi. Ka hikina a ka lā i Haʻehaʻe (PH 189), the rising of the sun at Haʻehaʻe」、Parker 1922「ha'e-ha'e … Name of a cape or promontory in Puna often used in native meles」）、ua-koko→uakoko（PE 見出し ua.koko: 1. a low-lying rainbow, literally blood rain 2. rain so heavy that it turns stream waters red-brown 3. reflection of rainbow colors in the clouds）、alewa-lewa→ʻālewalewa（PE「Buoyant, floating」、Andrews「A cloud or smoke floating in the atmosphere」）、ouli→ʻōuli（PE の ouli 検索で PE 見出しは ʻōuli のみ。aouli 2.＝Variant of ʻōuli）、e-a→ʻeā（PE ʻeā 2. Song refrain）
- 語義の要点（PE）: ala 3. to rise up, arise／puka 2. … to rise, as the sun／ea 3. To rise, go up／pae 1. cluster, row／ʻōpua puffy clouds … often interpreted as omens／mole 1. tap root, bottom, foundation／kualono 1. region near the mountaintop, ridge／kualau shower accompanied by sea wind／pūnohu to rise, as smoke, mist（connotation of redness）／pōpolohua 1. purplish-blue … 例文「Kai pōpolohua mea a Kāne, the purplish-blue reddish-brown sea of Kāne」／mea 7. reddish-brown／panopano 用例 ao panopano thick cloud／wai hū gushing spring／puna 1. spring／mana 1.／ola
- Kāne と淡水、Kanaloa と水を探す話: UH Kahoʻiwai「He is associated with freshwater streams, pools, and fishponds. In stories, it is often told that he is in search of freshwater alongside the God Kanaloa」— https://www.hawaii.edu/kawaihapai/akua-list/kane/ 。Emerson 注518（Keʻanae）と合わせて2出典
- 書かなかったこと: 4行目の Ala を Aia の誤りと読む説（資料なし）。Kaulanakalā・Haʻehaʻe の所在地の特定（Emerson は天の門・現象の名とし、Parker は Puna の岬の名とする。本文ではどちらも名指しで並べた）

## Kūnihi ka Mauna（id: kunihi-ka-mauna）— 2026-09-24 調査

- 底本: Emerson 1909 p.40「Mele Kahea」（`docs/research/emerson-1909-gutenberg.txt` の 2083–2124行）。9行、英訳8行、注59（Wai-ale-ale: Leaping-water, the central mountain-mass of Kauai）。巻末索引「KUNIHI KA MAUNA: mele kahea, password to the halau」
- 物語（Emerson）: Hiʻiaka が Hōpoe と Lohiʻau を迎えに行く途中、Kauaʻi の Wailua 川の一枚板の橋を、Kahiki から来たとされる気難しい女 Wailua が外した。呼びかけに答えず、Hiʻiaka が力を振るうと moʻo に戻って川底の洞へ逃げた。Hiʻiaka は飛び石を置き、石は今も残る
- Place Names of Hawaiʻi（1974、wehe.hilo 経由）: Nounou の項「Mountain (now known as Sleeping Giant) … Hula chant by Hiʻiaka (PH 109): Ālai ʻia aʻela e Nounou, nalo Ka-ipu-haʻa i ka laulā mauka o Ka-paʻa」— https://wehe.hilo.hawaii.edu/?q=Nounou ／ Kapaʻa の項「Ka laulā mauka o Kapaʻa ē, mai paʻa i ka leo (UL 40)」— https://wehe.hilo.hawaii.edu/?q=Kapa%CA%BBa ／ Waiʻaleʻale「Highest mountain on Kauaʻi (5,080 feet) … (PH 109; UL 40.)」／ Wailua「State park, land division, river … Līhuʻe qd., Kauaʻi」
- 綴り: 5〜7行目は Place Names の引用に合わせた（Ālai ʻia aʻela、Kaipuhaʻa）。Waikini は辞書・地名辞典に項が無いので Emerson の Wai-kini をつなげただけ
- PE: kūnihi 1. steep, sheer／laʻi calm, stillness … serene, as of sea, sky, wind／huki 1. to pull … 例文「Huki i ka lani, ka lae o Kalāʻau (chant by Hiʻiaka)」／ālai 1. obstruction … to obstruct, block／nalo 1. lost, vanished, concealed／laulā broad, wide; width, extent／mai 4. preverb particle of negative command／paʻa 1.／leo voice／ʻole 1. not, without … nothing

- 2026-09-24 のレビュー（Opus）で直したこと: hikina は「東」ではなく PE 3. coming（日の昇り）、ʻōuli の note から「Emerson の訳は重なりに沿う読み」という推測を外す、wai kau は PE に見出しが無いので「据えた」と訳さない、「Emerson が聖杯伝説と呼んだ」は観念（Kāne の水）の話なので言い換え、oli と分類する出典が無いので「詠唱」に
