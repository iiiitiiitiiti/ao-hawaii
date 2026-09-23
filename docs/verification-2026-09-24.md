# 夜間作業の記録（2026-09-24 未明）

持ち主が就寝中の無人作業。持ち主の依頼は「Claude だけで進められるものは完全に進め、ほかにもできることがあれば進める。朝5時まで」。

## 前回の未確認事項の解決

| 項目 | 結果 |
|---|---|
| waiawī の水の27% | **解決**。DLNR の2014年2月14日の発表（nr14-025）をブラウザで開いて確認。Giambelluca 教授の談話「evaporate 27 percent more water than native ʻōhia forests」。出典1つなので Nā Mea Ola 05 で DLNR と教授を名指しして戻した（「消費」ではなく「蒸発」） |
| Haleakalā 国立公園の総面積 | **解決**。NPS Land Resources Division の面積統計（2026年6月30日時点）で Gross Area 33,489.24 エーカー。Wikipedia の 33,265 は2011年の値 |
| フラの商業化・盗用への「批判」 | **一部解決**。Haunani-Kay Trask「Lovely Hula Hands」（1991〜92年、のち『From a Native Daughter』）を Honolulu Civil Beat（2021）の記事で確認し、Hula 06 の論点に名指しで足した。kumu の資格や歌詞理解をめぐる批判は、引き続き資料が無いので書かない |

## 仕組みの改善

- **外部リンク検査の自動化**: `.github/workflows/links.yml` で毎週月曜 06:00 JST に `scripts/check-links.mjs` を実行。切れがあればジョブが失敗し、GitHub の失敗通知メールが届く。切れと出たものは1分後に再試行する（soest.hawaii.edu のような一時的な停止を拾わないため）
- **SOEST の火山のページの移転**: `/GG/HCV/` → `/earthsciences_archive/HCV/`。ただし2026-09-24 未明の時点でサーバー自体が応答しない（Wayback には移転先の2026年8月の保存がある）
- **スマホの小さい文字**: 補足の文字が 10.5〜11.4px まで縮んでいたので 12〜13px に上げた（DDR 011 追記）。上部メニューを語の途中で折らない、目次を指で押しやすく、用語集の講座選択が 320px 幅ではみ出すのを直した
- **確認問題の正解の位置**: 108問のうち69問で正解が2番目にあった。表示するとき、問題ごとに決まった順へ並べ替え、正解の位置は 31・33・23・21 問に散った（`tests/quiz.test.ts`）
- Lighthouse（モバイル、代表6ページ）: アクセシビリティ・ベストプラクティス・SEO はいずれも100。パフォーマンスは88（JS 1本 1.2MB が主因。レッスン本文の遅延読み込みは効果が3割程度で、テストと PWA への影響の割に小さいので見送り）。クレジットのページは画像35枚・計12MB を読むため72

## 新しく書いたもの

- **Hula Lesson 07「手で語る — Emerson が書き留めた所作」**: Emerson 1909 第22章「Gesture」と p.46–47 の ʻōlohe の請願（e Laka i ke kuhi）から。kuhi の語義、kumu の教え方の順序、手の型、Hiʻiaka の場面の実演、表情と手招き。出典が1冊なので Emerson を名指しし、Emerson 自身の「型は一つではない」を最後に置いた。用語集に kuhi・ʻōlohe・pali・kīhei・ʻahu ʻula
- **メレを読む「He Mele no Kāne」**: Emerson 第41章。6連39行の全文に逐語注・行訳・kaona。綴りは PE の見出しに合わせた（DDR 010）
- **メレを読む「Kūnihi ka Mauna」**: Emerson p.40 の mele kāhea。9行。5〜7行目の綴りは Place Names の Nounou の項の引用（「Hula chant by Hiʻiaka」）に合わせた。4行目は Place Names の Kawaikini
- **メレを読む「Ke Lei Maila ʻo Kaʻula」**: Emerson p.56 の oli lei。6行。PE の Kaʻula の項がこの本の p.56 から1行目を引く
- **メレを読む「Kū ka Pūnohu ʻUla」**: Emerson p.55 の、踊り手が広間へ出るときの oli。7行

Emerson の伝承の詠唱は1929年より前の出版で、歌詞の規約を満たすので、4曲とも公開曲として全文を置いた。

## 新しく書いたものの照合レビュー（Opus、別の文脈）

書いた本人ではない Opus のサブエージェントに、原典（Emerson の全文テキスト）と辞書（wehe.hilo の PE・Place Names）を突き合わせさせた。歌詞はどれも Emerson の本文と語単位で一致した。

| 対象 | 高 | 中 | 低 | 主な指摘 |
|---|---|---|---|---|
| Hula 07 | 0 | 4 | 5 | e Laka i ke kuhi は hālau 一般の祈りではなく ʻōlohe が話し言葉で述べる請願、less adapted を「向かない」と言い切った、Lesson 03 への誤った参照、持ち帰りの節の推論、第22章は p.182 まで |
| He Mele no Kāne | 0 | 3 | 5 | 「Emerson が聖杯伝説と呼んだ」は観念（Kāne の水）の話、oli と分類する出典が無い、ʻōuli の推測、hikina は「日の昇り」（Place Names の Haʻehaʻe の例文） |
| Kūnihi ka Mauna | 2 | 5 | 4 | Waikini は Place Names の Kawaikini（典拠に UL 40）、huki の PE の例文は「空に届く」で Emerson の「板」の読みと逆、3〜5行目の読みの分かれ、Hōpoe の同行が Moʻolelo 03 と違う |
| Ke Lei Maila ʻo Kaʻula | 0 | 3 | 4 | 2行目の Ke は冠詞ではない（m の前は ka）、ke … lā と見出し maila、Emerson が結びつけていない hala の読み解き |

指摘はすべて反映した。読みが分かれるところは、どれか一つに決めず、各行のメモに Emerson・Place Names・PE の読みを並べた。

## 見送ったもの

- レッスン本文の遅延読み込み（JS 1.2MB の分割）。本文は全体の3割程度で、テストと PWA の precache への影響の割に効果が小さい
- 画像の縮小（クレジットのページだけで 12MB）。取り込みスクリプト（DDR 002）に縮小の工程を足す必要があり、夜間に一人で決める範囲を超える
- GitHub Pages で下層ページが HTTP 404（404.html で表示）になる件。表示と PWA には影響が無い
- Emerson の「Hole Waimea」（Liholiho 作とされる恋の歌）。婉曲表現の注釈が多く、読みの判断を持ち主と相談したい
- 暦のレッスン（月の名と夜の名）。月の夜の名が資料ノートに無い
