# 敵対的検証の記録（2026-09-18）

執筆後、Opus のサブエージェント3班に「本文と資料ノート（docs/research/）の食い違い・未確認の断定・綴り・確認問題の正解・出典の不備」を探させた。指摘は計106件（神話・生態系43、フラ・ハワイ語23、地理・歴史40）。反映は git のコミット「検証3班の指摘を反映」に一括。

## 反映した主なもの

- **帰属の誤り**: クムリポの pō/ao 区分を Kameʻeleihiwa に帰属 → Pokini Robinson／Handy の並記に戻す。Kalaninuiʻīamamao を「ハワイ島の aliʻi nui」→ Keaweʻīkekahialiʻiokamoku の子。Kapo の父を Kūwahailo → Kuaʻāʻilo。Kāne の出典を kumukahi → UH Kawaihāpai
- **資料に無い筋の削除**: Hiʻiaka による Lohiʻau の蘇生、Kamohoaliʻi「サメの神」、Polapola＝Borabora、ʻōʻō の絶滅、コキーコヤスガエルの導入年、fissure 8 が Kapoho を埋めた、ʻIolani Palace 1882年完成、砂糖の無関税、Lahaina＝首都
- **未確認の断定を留保に**: ロベリア類の数値（Wikipedia 経由）、1826年の蚊、Hōkūleʻa の進水日と Arcturus、kapu の個別規定、統一戦争の年号、Kaʻahumanu の受洗日、Newlands の票決、Mālama Honua の数値、RG のみの文法規則（ʻokina の大文字化、音節構造、kaʻi は一つ、ma は方向に使えない）
- **講座内の不整合**: Merrie Monarch の創設年（1963構想・1964第1回）、ma/i の説明（Lesson 03 と 05）、Haleakalā の字義、蚊の標高（1,200/1,500m）、Cook の到着年（1778/1779）
- **数値の誤り**: ʻiʻiwi の指定は2017年9月（10月発効）、ʻio の解除は2020年1月（2月施行）、第一波は AD 300〜600、ケッペンは「13のうち8」
- **例文**: iā の例を人名・代名詞に、否定表の肯定形を「自作」と明示、āhea の自作例文を外す
- **出典の分割**: NPS の4ページ、Papahānaumokuākea の Expansion、Wikipedia の複数記事、NPS Pearl Harbor

## 見送った指摘（理由つき）

- **綴りが資料ノートと違う**という指摘のうち、資料側が原文ママ（Emerson 1909 の OCR、Wikipedia の ASCII 表記）で、本文が Pukui-Elbert の現代正書法に従っているもの: Kūkāʻilimoku、Kūkaʻōhiʻalaka、Puʻu Nānā、ʻĀlaʻapapa（書名）、ʻuwē helu、ʻanāʻanā、hala pepe、ʻēkaha、paukū、Keōua、Kaʻuiki、kūkaepuaʻa、Honuaiākea、Kaʻana。本サイトの表記規約（辞書の綴りを正本とする）のとおり現代表記を維持した。Kalaipāhoa だけは辞書表記 Kālaipāhoa に直した
- 『Place Names of Hawaii』の書名は原著の表記（ʻokina 無し）のまま
- 「資料ノートでは判定不能」とされた講座横断の参照（例: 地理講座から神話講座の内容を引く）は、参照先の講座のノートに根拠がある

## まだ確認できていないもの（本文で断定していない）

- ʻŌlelo Noʻeau の通し番号と収録数
- Merrie Monarch の公式競技規則文書（kahiko で近代楽器を使わない、の根拠）
- ハワイ語話者数の一次資料
- Kaulana Nā Pua の作曲日（Stillman の2月10日説を採用。huapala は1月）
- 1959年の住民投票に独立の選択肢が無かったこと
- kapu の個別規定の原典（Malo）

## Emerson 1909 の逐語照合（最終レビュー後の追加検証）

最終レビュー（Opus）の提案で、Project Gutenberg のプレーンテキスト（`docs/research/emerson-1909-gutenberg.txt`）と、Emerson に帰属した記述79件を照合した。一致66・ほぼ一致5・不一致4・原典に無い2・脱漏2。反映したもの:

- ʻami「腰を回すとは書いていない」→ p.210 に骨盤の回転の記述があるため、章を分けて書き直し
- 「Kapo も祭壇の木片で象徴された」→ 脚注75 の被修飾語は Laka。p.15 の「Laka または Kapo に祈る」に差し替え
- 黒い子豚の記述は p.34 → p.32（切り分けは p.34）
- pule kuahu の3行目「Hooulu a lei ou」→ 原典「Hooulu lei ou」（脚注番号を "a" と読み違えていた）
- mele aloha を Emerson の分類としない（Emerson は mele hoʻoipoipo／mele ipo）
- 「祈りの資格は師系で継承」→ Emerson に無い。ʻailolo 通過後に祈る権利を得る、に限定
- 「kumu a hula」→「the kumu hula」、「最も民主的」→「おそらく最も民主的」、p.28 の引用の切れ目に省略記号、kōkua kumu（p.29）の追記、索引の指示ページ p.210 を明記

PE 辞書と Hawaiian Grammar（ulukau の動的ページ）の逐語照合は未実施。次に確かめるならここ。

## Pukui-Elbert 辞書の引用照合（ハワイ語講座）

wehe.hilo.hawaii.edu（同じ PE 1986 本文）で76件を照合。一致63・ほぼ一致5・不一致2・原典に無い1・取得不能6（PE の前付け p.XVII–XXVIII はオンライン辞書に無い）。反映したもの:

- aia の引用を原文どおりに（idiom. の表示、省略記号、2. の語義5つ、訳の全文）
- ʻehia の a/o 対の取り違え（PE の対は「ʻEhia o kou pāpale?」と「ʻEhia o kāu pāpale?」）
- ʻo の引用「Part;」→「Particle」、Gram. 9.13 を戻す。ka の引用末尾に省略記号
- ʻia の引用を略号のまま、hoʻo- 4. の PE の例（kāholoholo）、「独立の見出しが無い」→「定義は語基の下」
- kā- の項、kūʻai の項、haumana の綴り、ke aloha の帰属（HG p.154）、訳の脱落（here／with you）
- 「Mai, mai, mai e ʻai!」は PE に無い → PE の「Mai e ʻai」と RG の繰り返し形に分けた

未確認のまま: PE 前付けの発音表・二重母音表・強勢例（Lesson 01）と略号一覧・ピリオドの説明（Lesson 06）。紙の辞書か ulukau のスキャンで確かめる。

## Hawaiian Grammar のページ照合（ハワイ語講座）

ulukau 電子版の本文テキスト（111ページ分）と HG 帰属の約75件を照合。一致・ほぼ一致65、要修正10。反映したもの:

- 「ʻAʻole i hele ke kanaka.／ʻAʻole ʻo ia i hele.」は p.168 ではなく **p.59**（9か所を一括修正。p.168 は ʻaʻole の接続詞的性格の記述で、そちらは正しい）
- 原典に無い例文を差し替え: 「Aia ke ao i luna.」「Ua ʻike ʻo ia i ka lalo o ke kaʻa.」→ p.121 Table 15 の luna／ka luna、lalo／ka lalo と「i luna o ka waʻa」。「ʻAi ʻia ka iʻa e Kimo.」→ p.146 の「ʻAi ʻia ka poi e ia.」。「Na Pualani」→「Na Pua」。「Mai hoʻokuʻi ʻia au」→「ʻia ʻoia」
- **「主語を前置すると」→「直接目的語を前置すると」**（p.98。内容の誤り）
- iā は HG p.133 でも「人名と地名」の前（辞書と文法書の対比を削除）
- 命令マーカー i の「提案」は p.61 に無い（p.58 の表では purposive）。p.49・p.181 の引用を原文どおりに。ka nani o ka wahine → ka nani o ka moa（p.47）
- p.137 の a/o の表の縦横を明記し、直後の本文（親族名称）が表と逆の言い方をしていることを添えた

## huapala.org・Stillman 1999 の照合（フラ・歴史講座）

36件。一致25・ほぼ一致9・不一致2。Hilo Hanakahi の haʻina の表記（第1連と最終連の混用）、Kaulana Nā Pua 第5連の訳（「得るまで」→「権利を勝ち取った人の」）、楽団員は解雇ではなく抗議して辞職、依頼内容は「反逆の思いを曲に」、kiʻi・kaʻo の huapala 側表記、を反映。

## 検証の総計

- 資料ノートとの整合: 106件（3班）
- Emerson 1909 逐語: 79件
- Pukui-Elbert 辞書: 76件
- Hawaiian Grammar: 約75件
- huapala.org・Stillman: 36件

合計約370件を照合し、約60件を反映した。残る未確認は本文の `<Note kind="unverified">` と、この文書の「まだ確認できていないもの」に列挙してある。
