# 010. 歌詞の綴りが辞書の見出しと食い違うときは、辞書に合わせて版の注に書く

- 日付: 2026-09-18
- 対象: `content/mele/kaulana-na-pua.ts`、`content/moaukala/lesson-04.mdx`、`content/olelo/lesson-07.mdx`

## 決定

Kaulana Nā Pua 第1連の「Palapala ʻānunu」を「Palapala ʻanunu」に改めた。曲ページの `version` 欄に、底本（huapala.org 掲載の Elbert & Mahoe 版）と違う綴りにしたことと、その理由を書く。

今後も、底本の綴りが PE（Pukui-Elbert 辞書）の見出しでは別の語になってしまう場合は、PE の綴りに合わせ、`version` 欄に明記する。

## 背景

ʻŌlelo Hawaiʻi Lesson 07 の資料調べで、PE の見出し ʻānunu（ā が長い）はウリ科のつる植物（Sicyos 属）だと分かった。「強欲な」の意味は ʻālunu の項に「Also: ʻanunu」（a が短い）として載っている。Nordyke & Noyes（1993）の歌詞の再録も 'anunu（kahakō なし）。huapala の ʻānunu のままでは、逐語注の「強欲な」と辞書が合わない。

## 比較した代替案

| 案 | 却下理由 |
|---|---|
| 底本どおり ʻānunu のまま、注で「PE では別の語」と断る | 読者が辞書で引くと植物に行き着く。サイトの逐語注は辞書で引けることを前提にしている |
| 曲ページだけ直し、レッスンの引用は底本のまま | 同じ行が2つの綴りで出る（別モデルのレビューで指摘された） |

## 検証

wehe.hilo.hawaii.edu で ʻanunu・ʻālunu を引き、PE・Andrews（1865）・Parker（1922）・Judd/Pukui/Stokes（1943）の記述を確認した。`npm test` で曲データの「語の連結＝行」の検査が通ることを確認した。

## 追記（2026-09-21）— ʻanunu を底本の ʻānunu に戻した

決定の前提「PE では長い ā の ʻānunu はウリ科の植物だけ」が半分しか当たっていなかった。PE には別に `ʻānulu` の見出しがあり、「Variants of ʻālunu, greed」として長い ā の `ʻānunu` を立て、この曲のこの行そのもの（Palapala ʻānunu me ka pākaha, Elbert and Mahoe 63 = greedy document of extortion）を例文に引いている。底本（Elbert & Mahoe／huapala）と PE が一致するので、綴りを `ʻānunu` に戻し、曲ページ・Mōʻaukala 04・ʻŌlelo 07 を揃えた。「底本の綴りが PE の見出しでは別の語になる場合は PE に合わせる」という規則自体は変えない。教訓: 見出し語の検索は歌詞の綴りそのものだけで止めず、同義の見出し（ʻālunu・ʻānulu）の例文まで見る。

## 追記（2026-09-24）— 辞書・地名辞典がその行を引いていれば、引用の綴りに合わせる

Emerson 1909 の伝承の詠唱を4曲（He Mele no Kāne・Kūnihi ka Mauna・Ke Lei Maila ʻo Kaʻula・Kū ka Pūnohu ʻUla。Kūnihi 以外の3曲は同日夜、持ち主の指示で外した）加えるにあたり、綴りの決め方を1段足した。Emerson の本文は ʻokina・kahakō が無く、語をハイフンでつなぐ（Wai-ale-ale、mai la、Ipu-ha’a）。

1. PE か Place Names が**その行そのもの**を例文に引いていれば（典拠に「UL 40」「UL 56」＝Emerson の該当ページを挙げることが多い）、引用の綴りに合わせる。Ke lei **maila** ʻo Kaʻula（PE Kaʻula）、Ālai ʻia **aʻela** e Nounou、**Kaipuhaʻa**（Place Names Nounou）、**Kawaikini**（Place Names Kawaikini、典拠 UL 40）
2. 引用が無ければ、語ごとに PE の見出しに合わせる（従来どおり）。地名は Place Names の見出し
3. どちらにも無い語は Emerson の綴りをつなげるだけにし、version 欄にそう書く（Kaulanakalā）
4. 語を足したり削ったりはしない。冠詞を地名に取り込む（ka Ipu-ha’a → Kaipuhaʻa、ka Wai-kini → Kawaikini）のは、地名辞典がそう綴るときだけ

| 案 | 却下理由 |
|---|---|
| Emerson の綴りのまま載せる | ʻokina・kahakō が無いと辞書で引けず、サイトの表記規約（DESIGN.md）にも反する |
| 現代の教室で使われる綴りの版を探して底本にする | 出典のある現代版が手元に無い。教室ごとに違い、どれかを選ぶ根拠が無い |
| mai la のように分かち書きを残し、ʻokina と kahakō だけ足す | PE 自身が見出し maila（The directional mai plus lā）を立て、例文もそう綴る。辞書で引ける形に合わせる |

教訓: 「辞書に項が無い」と書く前に、Place Names の欄まで見る。Waikini を「項が無い」として Emerson の綴りで書いたが、Place Names に Kawaikini（典拠 UL 40）があり、別モデルのレビューで直した。

## 追記（2026-09-24 夜）— 辞書の例文が語の有無まで違うとき

Oli Komo（Emerson p.41）の2行目は、Emerson の本文が a hewa waha、PE の hewa の項の例文が a hewa ka waha で、ka の有無が違う。上の4（語を足さない）と1（辞書の引用に合わせる）がぶつかるので、次の条件をすべて満たすときだけ、語の有無も辞書の例文に合わせることにした。

- 辞書（PE か Place Names）がその行そのものを例文に引いている
- 辞書とは別の資料の少なくとも1つが、辞書と同じ形を取る（Oli Komo では、Emerson が同じページに載せる mele kāhea の同じ句と、Kanu o ka ʻĀina の教材の2つ）
- version 欄に、Emerson の形と、足した・削った語を書く

持ち主の指示「読みが分かれる行は代表的な読みを採る」と同じ考えで、語の形も、複数の資料が揃う形を代表として採る。

| 案 | 却下理由 |
|---|---|
| Emerson のまま ka を入れない（4 を優先） | 辞書・同じページの別の詠唱・今の教材がどれも ka を入れる形で唱えられており、Emerson の形だけが外れている |
| 辞書の例文があれば、条件なしで語の有無も合わせる | 辞書の例文は要約して引くことがある。別の資料で同じ形を確かめてから合わせる |
