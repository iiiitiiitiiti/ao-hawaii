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
