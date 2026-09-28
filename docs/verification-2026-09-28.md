# 夜間作業の記録（2026-09-28 未明）

持ち主が就寝中の無人作業。既存の指示（2〜3本のレッスンを、出典ノートと既存レッスンを突き合わせて自分で判断して追加する）に沿って進めた。

## 何を足すかの判断

6講座のうち aina・moaukala・mea-ola・hula・olelo の5つを、出典ノート（`docs/research/*.md`）と既存レッスン本文を実際に読んで突き合わせた。結果、**新しく足せる候補は無かった**。

| 講座 | 確認内容 | 判断 |
|---|---|---|
| moaukala | Lesson 05 が ʻAha Pūnana Leo の1983〜2023年の年表（13校・5島）と話者数統計を既に持つ | olelo 付録Bのハワイ語復興史と重複するため見送り |
| mea-ola | Lesson 01 が陸貝759種超・ドロソフィラ約800種・レフア科125種超まで出典ノートを使い切っている | 残りは出典ノートの「裏が取れなかった項目」節のみでDDR 007上書けない |
| olelo | 付録Bの Pūnana Leo 年表は moaukala Lesson 05 の方が詳細で、内容がほぼ重なる。付録Cは「本文で断定しないこと」と明記済み | 見送り |
| aina・hula | 事前の Explore サブエージェントによる横断調査で、残る候補は「裏が取れなかった項目」寄りと判定済み（本セッションでも構造を再確認） | 見送り |
| moolelo | 出典ノートに Kaʻululāʻau（Lānaʻi 追放譚）と Hina-i-ka-malama（月の Hina 譚）が未使用のまま残っていた。Beckwith（1940）・Westervelt（1910）で裏が取れ、既存7レッスンと重複しない | **採用** |

したがって今回は moʻolelo に1本のみ追加した。「2〜3本」という目安に届かなかったのは手を抜いたためではなく、他5講座の出典ノートが既存レッスンで使い切られている、または DDR 007 の基準（1〜2ソース以上）を満たさない残りしか無いことを実際に確認した結果である。

## 新しく書いたもの

- **Moʻolelo Lesson 08「Kaʻululāʻau と Hina-i-ka-malama」**（`content/moolelo/lesson-08.mdx`）: 2本立てのレッスン。前半は、Maui 島の首長家の子 Kaʻululāʻau が、いたずらの末に精霊だらけの Lānaʻi 島へ追放され、これを平定する話。手段は Fornander/Beckwith・Emerson・Kalākaua & Daggett の3版で違いを明示した。後半は、Lesson 05 で触れた Hina（Hilo・Wailuku 川の Hina）が Kaʻuiki で kapa 作りに疲れ、虹の道を経て月へ登る話（Westervelt 1910）。用語集に kaululaau・kanikaniula・hina-i-ka-malama・kauiki の4項目を追加した。`courses.ts` に8本目のレッスンとして登録した。画像2枚（`lanai-polihua-coast`・`moon-over-maui`）を `scripts/fetch-image.mjs` 経由で取得した（いずれも CC BY / CC BY-SA、Commons）

## 新しく書いたものの照合レビュー（Opus、別の文脈）

書いた本人ではない読み取り専用の Opus サブエージェントに、DDR 007・出典ノート該当箇所・関連レッスン（moʻolelo 05〜07）・用語集・courses.ts の goal 文を渡して照合させた。レビュアーは指示範囲を超えて Beckwith・Westervelt・wehewehe（PE辞書）の原典を自ら再取得して事実確認まで行った。

| 対象 | 高 | 中 | 低 | 主な指摘 |
|---|---|---|---|---|
| Moʻolelo 08 | 3 | 6 | 8 | Ka Wai Ola の記述を「系譜が別系統」と誤って書いていた（実際は Kaulahea の孫で Beckwith/Fornander と一致）／Hina の「Molokaʻi の母」定義を Pukui-Elbert(1986) と誤帰属（実際は Parker 1922）／Kanikaniʻula の蘇生譚を「魂が体を離れても死ではない」と過度に一般化（Beckwith の原文は「漂う魂を捕らえて体へ押し戻した」という具体的な型）。中・低は Lead と Note の Hina 人物同定の矛盾、Kaʻululāʻau が Lesson 05 の続きであるかのような誤記、Pāmano が Lesson 05 にあるかのような誤記、Kauiki／Kaʻuiki の表記ゆれ、Wailuku（Maui島の町 vs Hilo の川）の曖昧さなど |

高評価の指摘のうち1（系譜）と3（蘇生譚）は、自分でも Wikipedia「Kakaʻalaneo」と WebSearch で Beckwith の該当原文を確認し、独立して裏取りしたうえで反映した。2（Parker 1922 の誤帰属）はレビュアーの wehewehe 再確認をそのまま採用し、自分では再確認していない（信頼できる方法だが、検証の厳密さとしてはやや一段落ちる）。指摘はすべて `content/moolelo/lesson-08.mdx`・`src/content/glossary.ts`・`docs/research/moolelo.md` へ反映した。`docs/research/moolelo.md` の2026-09-28 追記には「訂正（レビューで発覚）」として履歴を残した。

## 見送ったもの

- moaukala・olelo でのハワイ語復興史レッスンの追加（moaukala Lesson 05 と大きく重複するため）
- mea-ola・aina・hula の追加レッスン（出典ノートが既存レッスンで使い切られているか、DDR 007 の基準を満たす残りが無いため）
- 鍵付き・ロック対象のコンテンツ（mele・ukulele songs）への一切の変更。指示で明示的に除外されている持ち主本人の判断事項

## 検証の結果（最終）

- `npm test`: 29 files / 544 tests すべて pass
- `npm run lint`（tsc -b --noEmit）: エラーなし
- `npm run build`: 成功（PWA precache 16件・404.html コピーまで）
- 表示: `vite preview` で Service Worker を止めたうえで 390px 幅を Playwright で計測。`scrollWidth === clientWidth`（375px、横はみ出しなし）、フルページのスクリーンショットで新規レッスンの本文・画像・確認問題・出典欄すべて正しく表示
