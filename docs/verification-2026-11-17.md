# 全ページの事実確認の記録（2026-11-17）

公開中の全レッスン・用語集・年表・曲の解説を出典と突き合わせ、47ファイル254か所を直した。事実が違っていた重い指摘は8件で、すべて原典で確かめて直した。鍵付きの曲の歌詞とコード譜には触れていない。

## 進め方

1. Sonnet の手伝い役13本が、講座ごとに本文の主張を出典と照合して報告を書いた（編集はしない）。報告は指摘ごとに重さ（高・中・低）と確度を付ける。
2. メイン（Fable）が指摘を1件ずつ原典で確かめた。確かめられた指摘だけを直し、原典と合わない指摘は見送った。
3. 直しは `{file, from, to}` の一覧にして当てた。from が本文にちょうど1回あるときだけ置き換え、1件でも外れたら何も書かない。
4. commit の前に、別モデル（Opus）が差分全体を読んだ。直した本文と、直していない別の場所の食い違いを探すためである。妥当だった指摘20か所を直した。

原典として読んだもの。

- Elbert & Pukui『Hawaiian Grammar』（ページ画像）と『Reference Grammar』v1.6
- Pukui-Elbert 辞書と Place Names（wehe.hilo.hawaii.edu）
- Emerson 1909、Beckwith 1940 と『The Kumulipo』、Malo、Fornander V
- Westervelt の3冊と Kalākaua 1888
- USGS・NOAA・NPS のページと州法の条文
- 各レッスンの Sources の URL

## 事実が違っていた指摘（高）

| 場所 | 直す前 | 直したあと | 根拠 |
|---|---|---|---|
| Mōʻaukala 01 と images.json | Hōkūleʻa の帰還は1976年8月26日 | 7月26日 | PVS の1976年の航海記録、Wikipedia「Hōkūleʻa」 |
| Mōʻaukala 03（本文と確認問題） | Paulet が旗を降ろさせたのは2月15日 | 2月25日 | Wikipedia「Paulet affair」ほか |
| Mōʻaukala 03 | Māhele で「約18,000区画」が分配 | 数字を削除 | 授与は約9,300件とする資料があり、数字が合わない |
| Moʻolelo 03 | Pele の母は共通で Haumea | 多くの版で Haumea、洪水の版では Kahinaliʻi | Beckwith |
| Moʻolelo 06 | Westervelt 版は「戦い→逃走→夫婦→島の分割」 | 「Puna で夫婦→不仲→戦い→逃走」。島の分割は「この一連のどこかで」 | Westervelt『Legends of Volcanoes』第8章 |
| Mea Ola 02 | 蚊の放飼（IIT）が続いている書き方 | Maui 6,300万匹・Kauaʻi 1,800万匹、2026年3月の停止と BTi への切り替え | Civil Beat 2026-11 ほか |
| Hula 04 | 辞書の見出しで語釈まで確かめられるのは mele maʻi だけ | mele inoa・mele kāhea・mele kanikau・mele hoʻoipoipo・mele hoʻāla・mele komo は PE の見出し語。mele maʻi は maʻi の項 | PE を1語ずつ引いた |
| ʻŌlelo 04 | ポリネシア祖語は前置詞 *i と目的語標識 *ki | 目的語標識 *i と場所の標識 *ki | HG p.135 |

## 講座ごとの主な直し

### ʻŌlelo（43か所）

- w の音の説明（HG p.13）とクリティックの範囲
- 命令文の主語の例（HG p.108）
- ʻana と状態動詞、ʻia と loaʻa 型（「伝統的には」を足した）
- hoʻo- の表に hōʻā の注
- ai の手順を HG p.170 のとおりに
- a 所有の中和の範囲（HG p.142）
- 疑問詞の基本に aha を追加
- anei と抑揚の記述を削除
- UH Press の引用文と RG のページ番号2か所
- Emerson の1行の帰属

### Hula（66か所）

- 1830年の布告の対象
- Kodak Hula Show の数字と出典
- Silver Jubilee の詠唱集「15篇」を削除（出典ページの保存版に記述が無い）
- ʻōlapa の語源
- 楽器の表から出典に無い細部を外した（pūniu・ʻulīʻulī・ʻiliʻili・kālaʻau）
- ʻukulele の由来と Kekuku の生年
- Big Island Now は規則ではなく解説
- mele の種類の表と Note、iʻi の出典を PE へ
- puana の直後に置くもの
- Kūpuna Hula Festival と Hālauaola の説明
- ʻōhiʻa の検疫の範囲
- Nā Hōkū Hanohano の審査員制の部門

### Moʻolelo（42か所）

- Lonoikamakahiki の名
- Makahiki の akua poko の進み方
- Hiʻiaka の誕生と kuahu の植物の出典
- Māui の綱の版差
- Kaliuwaʻa の溝の表。Fornander は溝に触れないので、Westervelt『Legends of Old Honolulu』の行を足した
- huapala の Poliahu の解題
- Kalākaua 版の槍の穂先
- Kaʻuiki の Hina と Māui の母の同定
- Eleio の立場

### Mōʻaukala（29か所）

- 上の表の3件
- Kapoukahi の託宣と Hewahewa の出典
- Kaulana Nā Pua の成立の書き方と掲載日の併記
- Winona Beamer・Honouliuli・OHA・Pūnana Leo

### Mea Ola（52か所）

- Kauaʻi の年代
- 蚊の渡来と温度の閾値（LaPointe ほか 2010）
- ʻakikiki と ʻakekeʻe
- マングース・アクシスジカ・ミコニアの数字
- Papahānaumokuākea の面積と州法の書き方
- サメ保護法は、自己防衛の適用除外と、伝統的・慣習的な権利を妨げない規定を分けて書いた

### ʻĀina（15か所）

- 天皇海山列の折れ曲がりの caption
- Kamaʻehuakanaloa の「唯一」
- 曇天の割合・年較差・気候区分
- 養魚池の数

### ʻUkulele（4か所）

- コードの説明と歌詞の位置

### 年表（3か所）

- 1830年の布告から「公の場での」を外した
- 養魚池は「大半」を「多く」に
- アクシスジカの導入を1868年から1860年代へ分けた

### 最終レビューで見つかった食い違い

直した本文と、直していなかった別の場所が合わなくなっていた。上の件数に含む。

- 拡大前の Papahānaumokuākea の面積。NOAA は139,818、布告は139,797と書くので、Mea Ola の確認問題は「約139,800」にした
- Kaliuwaʻa の Note の「どの版でも」。Fornander は溝に触れないので「溝を語る版はどれも」にした
- 1830年の布告の確認問題の選択肢から「公の場が対象」を外した
- Helene Hale は「創設」ではなく「構想」（Hula 01）
- ʻaʻohe と k なし所有の言い切り（ʻŌlelo 03・06）、na の読み（ʻŌlelo 05 の確認問題）
- ʻōhiʻa の検疫。ほかの島で採ったものもハワイ島からは持ち出せない

## 見送った指摘と理由

| 講座 | 指摘 | 見送った理由 |
|---|---|---|
| Hula | hālau の呼称が一般化した時期 | 1972年の1例は本文と矛盾しない |
| Hula | Kaʻimi の説と競技開始年の混在 | 本文は出典名を挙げて分けて書いている |
| Hula | ipu heke の当て布 | Ke Ola に記述がある |
| ʻŌlelo | 「Pua, hele mai!」に Ē が無い | HG p.147 の冒頭に同じ文がある |
| ʻŌlelo | v で始まるコードの語と ʻana | RG p.64 が支える |
| ʻŌlelo | 用語集 nō の訳語 | Lesson 07 の教え方と揃えてある |
| Moʻolelo | maile の学名 | Alyxia stellata は現行の有効名 |
| Moʻolelo | Kumulipo の冒頭の綴り | Beckwith と同じ |
| Mōʻaukala | Mālama Honua の数字 | Wikipedia と断っている |
| Mōʻaukala | Kaulana Nā Pua の作曲日 | Stillman の日付を採り KS の掲載日を併記した |
| ʻĀina | Papahānaumokuākea の139,797 | 布告の数字 |
| ʻĀina | 「豚の頭の木彫り」が参照先の Moʻolelo 02 に無い | 参照先の「豚の像」と矛盾しない |
| ʻĀina・Moʻolelo | Pele が「Kahiki から来て」 | 本文が引く古い歌の言い方と同じ |
| Mōʻaukala | Beamer の退学が Act 57 の例として弱い | 理由が2説あることを本文が断っている |

綴りの指摘（Līlīlehua・Puʻu ʻŌʻō・Tuahine の娘）と Hula Medley の登録年、TWI の高さも、出典と合っていたので見送った。

## 確かめられずに残ったもの

出典を取得できなかったか、出典に当たっても決められなかった主張。本文は変えていない。次に確かめる候補として残す。

### Hula

- Silva 2000 の細部（eVols が自動取得を弾く）
- Overall が両部門の合計点で決まること
- 写真 hula-tokyo-2018 の caption と用語集 kaʻi の語釈

### Moʻolelo

- 「375の mele」と「Nānā i ke kumu」の所収
- Ka Hula Piko の由来
- Kamapuaʻa の「捕縛は4度」と Fornander の「注」の位置
- Ka Wai Ola の Lānaʻi の記事（403）

### Mōʻaukala

- Silva 2000 と Beyer・Chapin の細部
- 「主要5島で集会」

### Mea Ola

- ʻalalā の「営巣行動を示すペア」と nēnē 4,323羽
- コウモリの脅威
- 「6種は絶滅宣言」「10%が絶滅」の出典欄
- サンゴの2019年の引用文と TNC の 13/18

### ʻĀina

- 2018年噴火の細部と警戒レベル

### ʻŌlelo

- PE の前付け（p.XXI・XXVIII）のピリオドと略号の説明
- Māmaka Kaiao の表
- なぞなぞの末尾。電子版の PE は「a」で、本文には ai と読む断り書きを足した

## 検証の結果

- `npm run lint`（tsc -b --noEmit）: エラーなし
- `npm test`: 29 files / 544 tests すべて pass（禁止フレーズの検査を含む）
- `npm run build`: 成功
