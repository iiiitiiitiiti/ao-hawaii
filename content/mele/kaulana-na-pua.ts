import type { MeleBody } from "../../src/mele/types.ts";

/*
 * Kaulana Nā Pua（1893、Ellen Kekoaohiwaikalani Wright Prendergast、1902年没）。
 * 作者の没年と初出年が歌詞の規約（docs/DESIGN.md「歌詞（mele）引用の規約」）を満たすので全文を載せる。
 * 歌詞は Elbert & Mahoe の版（huapala.org 掲載）。逐語の意味は Pukui-Elbert 辞書（PE、Hilo ミラー wehe.hilo.hawaii.edu）で引いた。
 * 行訳は本サイトの訳で、Elbert & Mahoe の英訳の解釈に合わせている。
 */
export const body: MeleBody = {
  stanzas: [
    {
      lines: [
        {
          haw: "Kaulana nā pua aʻo Hawaiʻi",
          words: [
            { w: "Kaulana", gloss: "名高い（状態動詞）" },
            { w: "nā", gloss: "定冠詞・複数" },
            { w: "pua", gloss: "花。PE 3. で「子孫、子ら」", term: "pua" },
            { w: "aʻo", gloss: "〜の（o を歌で置き換えた形。PE aʻo 2.）", term: "ao-song" },
            { w: "Hawaiʻi", gloss: "ハワイ" },
          ],
          ja: "名高きはハワイの花々（子ら）",
          notes: [
            { text: "動詞 kaulana が先、主語 nā pua があと。動詞が文頭に立つ語順。", lesson: "olelo/lesson-04" },
            { text: "aʻo は歌だけに出る「〜の」。1895年の楽譜はこの行を o と刷っている（Stillman 1999）。", lesson: "olelo/lesson-07" },
          ],
        },
        {
          haw: "Kūpaʻa ma hope o ka ʻāina",
          words: [
            { w: "Kūpaʻa", gloss: "揺るがない、忠実な" },
            { w: "ma", gloss: "〜に（場所の前置詞）" },
            { w: "hope", gloss: "後ろ（場所名詞）" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞・単数" },
            { w: "ʻāina", gloss: "土地、大地（PE: land, earth）", term: "aina" },
          ],
          ja: "揺るがず、この土地の後ろに立つ",
          notes: [{ text: "ma hope o 〜 で「〜の後ろに」。場所名詞 hope を ma と o で挟む型。PE は kūpaʻa の項に「Kūpaʻa kākou mahope o ke aliʻi」＝we are loyal to the chief を挙げる。位置だけでなく「〜を支持する」の慣用。", lesson: "olelo/lesson-05" }],
        },
        {
          haw: "Hiki mai ka ʻelele o ka loko ʻino",
          words: [
            { w: "Hiki", gloss: "着く、来る（PE hiki 3.）" },
            { w: "mai", gloss: "こちらへ（方向詞）", term: "mai-dir" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻelele", gloss: "使者" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞" },
            { w: "loko", gloss: "心、気質（PE loko 2.）" },
            { w: "ʻino", gloss: "邪悪な" },
          ],
          ja: "悪しき心の使者がやって来る",
          notes: [{ text: "hiki mai は「こちらへ着く」。方向詞 mai が、使者が自分たちの側へ来ることを示す。", lesson: "olelo/lesson-05" }],
        },
        {
          haw: "Palapala ʻānunu me ka pākaha",
          words: [
            { w: "Palapala", gloss: "文書", term: "palapala" },
            { w: "ʻānunu", gloss: "強欲な（PE ʻānulu の項が「Variants of ʻālunu, greed」とし、この行を greedy document of extortion として引く。ʻālunu の項は短い a の異形 ʻanunu も挙げる。同じ綴りの ʻānunu にはウリ科の植物の項もある）" },
            { w: "me", gloss: "〜とともに", term: "me" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pākaha", gloss: "ゆすり、強奪（PE pākaha 1.）" },
          ],
          ja: "強欲と強奪の文書",
          notes: [{ text: "修飾する語は名詞のあとに置く。palapala ʻānunu で「強欲な文書」。前の行の「使者が来る」にかかる。PE はこの行を greedy document of extortion と訳す。" }],
        },
      ],
    },
    {
      lines: [
        {
          haw: "Pane mai Hawaiʻi moku o Keawe",
          words: [
            { w: "Pane", gloss: "答える" },
            { w: "mai", gloss: "こちらへ（方向詞）", term: "mai-dir" },
            { w: "Hawaiʻi", gloss: "ハワイ島" },
            { w: "moku", gloss: "島", term: "moku" },
            { w: "o", gloss: "〜の" },
            { w: "Keawe", gloss: "Keawe（ハワイ島の首長の名。PE は古い首長にちなむ星の名として載せる）" },
          ],
          ja: "Keawe の島ハワイが応える",
          notes: [{ text: "この連は4つの島を、それぞれ昔の首長の名で呼んで並べる。全土がそろって拒む、という構図。", lesson: "moaukala/lesson-04" }],
        },
        {
          haw: "Kōkua nā Hono aʻo Piʻilani",
          words: [
            { w: "Kōkua", gloss: "助ける", term: "kokua" },
            { w: "nā", gloss: "定冠詞・複数" },
            { w: "Hono", gloss: "湾（Hono で始まる地名の土地）", term: "hono" },
            { w: "aʻo", gloss: "〜の（o の歌での形）" },
            { w: "Piʻilani", gloss: "Piʻilani（マウイの首長の名）" },
          ],
          ja: "Piʻilani の湾々（マウイ）が助ける",
          notes: [{ text: "nā Hono a Piʻilani は Piʻilani が治めた Hono- で始まる湾々を指す詩句。PE の Hono- の項は「Lahaina から見える Maui・Molokaʻi・Lānaʻi の湾」と説明する。マウイ王国の呼び名として使われる。", lesson: "aina/lesson-06" }],
        },
        {
          haw: "Kākoʻo mai Kauaʻi o Mano",
          words: [
            { w: "Kākoʻo", gloss: "支える、後押しする" },
            { w: "mai", gloss: "こちらへ（方向詞）", term: "mai-dir" },
            { w: "Kauaʻi", gloss: "カウアイ島" },
            { w: "o", gloss: "〜の" },
            { w: "Mano", gloss: "Mano（＝Manokalanipō。カウアイの首長。PE は「Kauaʻi a Mano」「Manō」の形を挙げ、参照に Elbert & Mahoe 63＝この曲を引く）" },
          ],
          ja: "Mano のカウアイが支える",
        },
        {
          haw: "Paʻapū me ke one Kākuhihewa",
          words: [
            { w: "Paʻapū", gloss: "びっしりと覆われた、隙間なく詰まった（PE paʻapū）" },
            { w: "me", gloss: "〜とともに", term: "me" },
            { w: "ke", gloss: "定冠詞（o で始まる語の前）" },
            { w: "one", gloss: "砂。詩で「土地」（PE）" },
            { w: "Kākuhihewa", gloss: "Kākuhihewa（オアフの首長の名）" },
          ],
          ja: "Kākuhihewa の砂の地（オアフ）も埋め尽くす",
          notes: [{ text: "one は o で始まるので冠詞は ke になる（a・e・o・k の前は ke）。", lesson: "olelo/lesson-02" }],
        },
      ],
    },
    {
      lines: [
        {
          haw: "ʻAʻole aʻe kau i ka pūlima",
          words: [
            { w: "ʻAʻole", gloss: "〜ない（否定詞）", term: "aaole" },
            { w: "aʻe", gloss: "動詞の前の e を歌で置き換えた形（PE aʻe 5.）", term: "ae-song" },
            { w: "kau", gloss: "置く、載せる" },
            { w: "i", gloss: "目的語の標識" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pūlima", gloss: "署名（PE pūlima 3.）" },
          ],
          ja: "誰ひとり署名を記しはしない",
          notes: [
            { text: "この aʻe は方向詞ではない。PE は aʻe の5番目の意味を「歌で e を置き換えたもの」とし、この曲の第4連を例文に挙げる。", lesson: "olelo/lesson-07" },
            { text: "否定詞 ʻaʻole が文頭に立つ。", lesson: "olelo/lesson-06" },
          ],
        },
        {
          haw: "Ma luna o ka pepa o ka ʻēnemi",
          words: [
            { w: "Ma", gloss: "〜に（場所の前置詞）" },
            { w: "luna", gloss: "上（場所名詞）" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pepa", gloss: "紙" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻēnemi", gloss: "敵（英語 enemy から。PE の見出しは ʻenemi）" },
          ],
          ja: "敵の紙の上には",
          notes: [{ text: "ma luna o 〜 で「〜の上に」。", lesson: "olelo/lesson-05" }],
        },
        {
          haw: "Hoʻohui ʻāina kūʻai hewa",
          words: [
            { w: "Hoʻohui", gloss: "一つにする（hoʻo- 使役＋hui 合わさる）", term: "hoohui-aina" },
            { w: "ʻāina", gloss: "土地、大地（PE: land, earth）", term: "aina" },
            { w: "kūʻai", gloss: "売り渡す、売買する" },
            { w: "hewa", gloss: "誤った、罪深い" },
          ],
          ja: "併合という罪深い売り渡し",
          notes: [{ text: "hoʻo- は「〜させる」の使役。hui（一つになる）から hoʻohui（一つにする）。hoʻohui ʻāina で「併合」。", lesson: "olelo/lesson-04" }],
        },
        {
          haw: "I ka pono sivila aʻo ke kanaka",
          words: [
            { w: "I", gloss: "〜を（目的語の標識）" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pono", gloss: "正しいあり方、権利" },
            { w: "sivila", gloss: "市民の（英語 civil から。PE の見出しは kīwila で、異形として swilia を挙げる。PE は nā pono kīwila＝civil rights を載せる）" },
            { w: "aʻo", gloss: "〜の（o の歌での形）" },
            { w: "ke", gloss: "定冠詞（k で始まる語の前）" },
            { w: "kanaka", gloss: "人、民" },
          ],
          ja: "民の、市民としての権利の",
        },
      ],
    },
    {
      lines: [
        {
          haw: "ʻAʻole mākou aʻe minamina",
          words: [
            { w: "ʻAʻole", gloss: "〜ない（否定詞）", term: "aaole" },
            { w: "mākou", gloss: "私たち（聞き手を含まない）" },
            { w: "aʻe", gloss: "動詞の前の e を歌で置き換えた形（PE aʻe 5.）" },
            { w: "minamina", gloss: "大事にする、惜しむ（PE minamina 2.）" },
          ],
          ja: "私たちは惜しみはしない",
          notes: [
            { text: "主語が代名詞なので、ʻaʻole の直後、動詞より前に来る。", lesson: "olelo/lesson-03" },
            { text: "mākou は聞き手を含まない「私たち」。歌い手の側、つまり楽団員たち。", lesson: "olelo/lesson-02" },
          ],
        },
        {
          haw: "I ka puʻu kālā o ke aupuni",
          words: [
            { w: "I", gloss: "〜を（目的語の標識）" },
            { w: "ka", gloss: "定冠詞" },
            { w: "puʻu", gloss: "山、かたまり（PE puʻu 1.。PE は puʻu kālā を1語の見出しに立て「sum of money」とする）" },
            { w: "kālā", gloss: "お金" },
            { w: "o", gloss: "〜の" },
            { w: "ke", gloss: "定冠詞（a で始まる語の前）" },
            { w: "aupuni", gloss: "政府", term: "aupuni" },
          ],
          ja: "政府の金（かね）を",
        },
        {
          haw: "Ua lawa mākou i ka pōhaku",
          words: [
            { w: "Ua", gloss: "完了の動詞マーカー", term: "ua" },
            { w: "lawa", gloss: "足りる、満ち足りる" },
            { w: "mākou", gloss: "私たち（聞き手を含まない）" },
            { w: "i", gloss: "〜で" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pōhaku", gloss: "石" },
          ],
          ja: "私たちは石で足りている",
          notes: [{ text: "ua ＋状態動詞 lawa で「足りた状態になっている」。", lesson: "olelo/lesson-04" }],
        },
        {
          haw: "I ka ʻai kamahaʻo o ka ʻāina",
          words: [
            { w: "I", gloss: "〜で" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻai", gloss: "食べ物（とくに植物の主食）" },
            { w: "kamahaʻo", gloss: "驚くべき、不思議な" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻāina", gloss: "土地、大地（PE: land, earth）", term: "aina" },
          ],
          ja: "この土地の驚くべき食べ物で",
        },
      ],
    },
    {
      lines: [
        {
          haw: "Ma hope mākou o Liliʻulani",
          words: [
            { w: "Ma", gloss: "〜に（場所の前置詞）" },
            { w: "hope", gloss: "後ろ（場所名詞）" },
            { w: "mākou", gloss: "私たち（聞き手を含まない）" },
            { w: "o", gloss: "〜の" },
            { w: "Liliʻulani", gloss: "女王 Liliʻuokalani（この版の綴り）" },
          ],
          ja: "私たちは Liliʻulani の後ろに立つ",
          notes: [{ text: "PE は hope の項でこの行を「Mahope makou a Liliʻu-lani (song), we are supporters of Liliʻu-lani」と引く。「後ろに立つ」は「支持する」の意。PE の引用は o ではなく a。" }],
        },
        {
          haw: "A loaʻa ē ka pono o ka ʻāina",
          words: [
            { w: "A", gloss: "〜まで／そして（PE ā 4. は when・until・and を挙げる）" },
            { w: "loaʻa", gloss: "得る、勝ち取る" },
            { w: "ē", gloss: "強めの小辞（PE ē 2.）", term: "e-intens" },
            { w: "ka", gloss: "定冠詞" },
            { w: "pono", gloss: "正しいあり方、権利" },
            { w: "o", gloss: "〜の" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻāina", gloss: "土地、大地（PE: land, earth）", term: "aina" },
          ],
          ja: "この土地の権利を勝ち取った人の",
          notes: [
            { text: "字義どおりなら「この土地の権利を得るまで」とも読める（PE の ā は until も担う）。Elbert & Mahoe はこの行を「who has won the rights of the land」と、前の行の Liliʻulani にかかる形で訳し、本サイトの行訳はその解釈に合わせている。" },
            { text: "loaʻa は ʻia を付けない動詞の小さな類。", lesson: "olelo/lesson-04" },
          ],
        },
        {
          haw: "Haʻina ʻia mai ana ka puana",
          words: [
            { w: "Haʻina", gloss: "語る。歌の結びを歌う", term: "haina" },
            { w: "ʻia", gloss: "受動の小辞（PE: pas/imp. を標識する part.）", term: "ia-passive" },
            { w: "mai", gloss: "こちらへ（方向詞）", term: "mai-dir" },
            { w: "ana", gloss: "動詞のあとに立ち、1つの出来事を指す（PE ana 6.。完了・未完了は問わない）" },
            { w: "ka", gloss: "定冠詞" },
            { w: "puana", gloss: "歌の主題", term: "puana" },
          ],
          ja: "歌の主題は、ここに語られた",
          notes: [{ text: "受動の ʻia、方向詞 mai、後置の ana、主語 ka puana が1行に並ぶ。e を伴わない後置の ana なので「進行中」とは限らず、PE は puana の項でこの行を「tell the summary refrain」と命令で訳す。ʻŌlelo Hawaiʻi Lesson 04 の締めで読んだ行。", lesson: "olelo/lesson-04" }],
        },
        {
          haw: "Ka poʻe i aloha i ka ʻāina",
          words: [
            { w: "Ka", gloss: "定冠詞" },
            { w: "poʻe", gloss: "人々" },
            { w: "i", gloss: "完了（関係節の中で ua の代わり）" },
            { w: "aloha", gloss: "愛する" },
            { w: "i", gloss: "〜を（目的語の標識）" },
            { w: "ka", gloss: "定冠詞" },
            { w: "ʻāina", gloss: "土地、大地（PE: land, earth）", term: "aina" },
          ],
          ja: "この土地を愛した人々のことが",
          notes: [{ text: "poʻe i aloha で「愛した人々」。関係節の中では完了の ua が i に替わる。", lesson: "olelo/lesson-06" }],
        },
      ],
    },
  ],
  kaona: [
    "題の pua（花）は、PE が挙げる語義「子孫、子ら」によって、ハワイの人々を指す。名高いのは花ではなく、署名を拒んだ人々のほうである。",
    "第1連の「強欲と強奪の文書」は、楽団員が署名を拒んだ暫定政府への忠誠の誓約書を指す。第3連の「敵の紙」も同じものである。",
    "第4連の石（pōhaku）が、別名 Mele ʻAi Pōhaku（石を食う歌）の由来。楽団員の「残されたもの、石、この土地の神秘の食物で満足する」という言葉を、そのまま歌詞にしている。政府の金（puʻu kālā。PE は sum of money）より、土地そのものを取る、という宣言である。",
    "第2連は4つの島を昔の首長の名で呼ぶ。Hawaiʻi は Keawe、Maui は Piʻilani、Kauaʻi は Mano、Oʻahu は Kākuhihewa。Oʻahu＝Kākuhihewa は PE の one の項（ke one ʻai aliʻi o Kākuhihewa, said of Oʻahu）、Kauaʻi＝Mano は PE の Manokalanipō の項、Maui＝Piʻilani は PE の Hono- の項が裏づける。島ごとの呼び名を並べることで、全土が一つになって応えていることを示す。",
  ],
  version:
    "Elbert & Mahoe『Nā Mele o Hawaiʻi Nei』の版（huapala.org 掲載）に拠る。第4連末は huapala では ka āina だが、ほかの行に合わせて ʻāina と書いた。第1連の ʻānunu は底本どおり。PE は ʻānunu を2つの語に立てる（ウリ科の植物／ʻānulu の項で ʻālunu＝強欲の異形）。この行は後者で、PE の ʻānulu の項がこの行そのものを例文に引く（2026-09-18 に ʻanunu と改めたが、2026-09-21 に戻した。DDR 010 の追記）。第5連1行目の Liliʻulani の前は huapala では o だが、PE の hope の項の引用は a。この版には最終連の別の行として「A kau hou ʻia e ke kalaunu」（再び王冠を戴かれるまで）がある。1893年の新聞掲載では、3月25日の初出と5月12日の訂正版とで第3・4連の行の順が違う（Stillman 1999）。PE の aʻe 5. の例文は第4連を「i ka puʻu kālā a ke aupuni」と引いていて、この版の o ke aupuni と1字違う。",
  sources: [
    { label: "huapala.org — Kaulana Nā Pua", url: "https://www.huapala.org/Kau/Kaulana_Na_Pua.html", note: "歌詞（Elbert & Mahoe の版）と英訳" },
    { label: "Pukui & Elbert, Hawaiian Dictionary（Wehewehe Wikiwiki、Hilo ミラー）", url: "https://wehe.hilo.hawaii.edu/", note: "逐語の意味。ʻānulu（この行を例文に引く）、aʻe 5.（歌での e の置き換え）、ē 2.、hope（第5連1行目を例文に引く）、puʻu kālā、Manokalanipō、one、Hono- ほか" },
    { label: "Andrews 1865 / Parker 1922（Wehewehe Wikiwiki）", url: "https://wehe.hilo.hawaii.edu/?q=%CA%BBanunu", note: "anunu を alunu の n 形とする" },
    { label: "Amy Kuʻuleialoha Stillman, 'Aloha Aina': New Perspectives on 'Kaulana Na Pua', Hawaiian Journal of History 33（1999）", url: "https://evols.library.manoa.hawaii.edu/handle/10524/167", note: "作曲日、新聞掲載の系譜と版の違い、1895年の楽譜" },
    { label: "Eleanor C. Nordyke & Martha H. Noyes, Kaulana Nā Pua: A Voice for Sovereignty, Hawaiian Journal of History 27（1993）", url: "https://evols.library.manoa.hawaii.edu/handle/10524/172", note: "作者の生没年（1865年4月12日生、1902年12月5日没）" },
    { label: "Kamehameha Schools — Kuʻukahekahe: Mele ʻAi Pōhaku", url: "https://www.ksbe.edu/article/kuukahekahe-mele-ai-phaku", note: "楽団員の依頼の言葉" },
  ],
};
