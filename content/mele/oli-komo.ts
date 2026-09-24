import type { MeleBody } from "../../src/mele/types.ts";

/*
 * Oli Komo（hālau に入ることを許す答えの詠唱。Emerson の題は Mele Komo。N. B. Emerson が1909年に採録）。
 * 伝承で、1929年より前に出版されているので、歌詞の規約（docs/DESIGN.md「歌詞（mele）引用の規約」）を満たし全文を載せる。
 * 本文は Emerson『Unwritten Literature of Hawaii』p.41。1・2行目は PE の hewa の項の例文、3・4行目は PE の見出しに綴りを合わせた（DDR 010）。
 */
export const body: MeleBody = {
  "stanzas": [
    {
      "lines": [
        {
          "haw": "E hea i ke kanaka e komo maloko,",
          "words": [
            { "w": "E", "gloss": "命令の動詞マーカー", "term": "e-imperative" },
            { "w": "hea", "gloss": "呼ぶ（PE hea 1.）" },
            { "w": "i", "gloss": "目的語の標識" },
            { "w": "ke", "gloss": "定冠詞（k の前で ke）", "term": "ka-ke" },
            { "w": "kanaka", "gloss": "人（PE kanaka 1.）" },
            { "w": "e", "gloss": "〜するように（従属節の e）", "term": "e-imperative" },
            { "w": "komo", "gloss": "入る（PE komo 1.）" },
            { "w": "maloko", "gloss": "中へ、内に。ma loko を1語に綴った形（PE の hewa の項の例文の綴り）" }
          ],
          "ja": "その人を呼びなさい、中へ入るように",
          "notes": [
            {
              "text": "E hea は命令の e ＋動詞。後ろの e komo は「入るように」と目的を表す従属節。PE は hewa の項で1・2行目を1文として引き、「call the person to come in and feed until his mouth can take no more [hospitality]」と訳す。",
              "lesson": "olelo/lesson-04"
            }
          ]
        },
        {
          "haw": "E hānai ai a hewa ka waha;",
          "words": [
            { "w": "E", "gloss": "〜するように（従属節の e）", "term": "e-imperative" },
            { "w": "hānai", "gloss": "食べさせる、養う（PE hānai 2.）" },
            { "w": "ai", "gloss": "照応の ai（e ＋動詞＋ ai の形）", "term": "ai-anaphoric" },
            { "w": "a", "gloss": "〜するまで" },
            { "w": "hewa", "gloss": "度を越すほどに、もう入らないほど（PE hewa 4. to the point of satiety）" },
            { "w": "ka", "gloss": "定冠詞", "term": "ka-ke" },
            { "w": "waha", "gloss": "口（PE）" }
          ],
          "ja": "口がもう入らないほどにもてなすために",
          "notes": [
            {
              "text": "行訳は PE の訳（feed until his mouth can take no more）に拠った。hewa は「間違い」の語だが、PE の4番目の意味は「飽きるほどに、度を越して」で、例に Hewa ka maka（もう見られないほど見る）を挙げる。客を迎え入れてもてなす言葉として読む。同じ 4. には Hewa ka waha（しゃべりすぎる、軽々しく言う）という例もある。"
            },
            {
              "text": "別の読み: Kanu o ka ʻĀina の教材と huapala（K. Garza-Maguire）は「Feed him lest his mouth err」（口が過ちを言わないよう食べさせよ）と訳す。PE の Hewa ka waha（しゃべりすぎる）もこの向きの読み。Emerson は注62で訳しにくい句だと断り、ハワイ語に通じた学者の説として、食べ物で口をふさいで敵を味方に変える意味かもしれない、と書く。"
            }
          ]
        },
        {
          "haw": "Eia nō ka uku lā, ʻo ka leo,",
          "words": [
            { "w": "Eia", "gloss": "ここに〜がある（PE eia）" },
            { "w": "nō", "gloss": "強めの小辞", "term": "no-intens" },
            { "w": "ka", "gloss": "定冠詞", "term": "ka-ke" },
            { "w": "uku", "gloss": "報い、支払い（PE uku 1.）" },
            { "w": "lā", "gloss": "行中の囃子", "term": "la-refrain" },
            { "w": "ʻo", "gloss": "同格の ʻo（「すなわち」）", "term": "o-subject" },
            { "w": "ka", "gloss": "定冠詞", "term": "ka-ke" },
            { "w": "leo", "gloss": "声（PE）" }
          ],
          "ja": "その礼はこれ、声",
          "notes": [
            {
              "text": "Eia ＋名詞で「ここに〜がある」。ʻo ka leo は ka uku の言い換え（同格）。Emerson の訳は「And this the reward, the voice」。",
              "lesson": "olelo/lesson-03"
            }
          ]
        },
        {
          "haw": "A he leo wale nō, ē!",
          "words": [
            { "w": "A", "gloss": "そして" },
            { "w": "he", "gloss": "不定冠詞（He 文）", "term": "he-article" },
            { "w": "leo", "gloss": "声（PE）" },
            { "w": "wale", "gloss": "ただ〜だけ（PE wale 2.）", "term": "wale" },
            { "w": "nō", "gloss": "強めの小辞", "term": "no-intens" },
            { "w": "ē", "gloss": "強めの小辞（PE ē 2.）", "term": "e-intens" }
          ],
          "ja": "ただ声だけでよい",
          "notes": [
            {
              "text": "wale nō で「ただ〜だけ」。Emerson の訳は「Simply the voice」。",
              "lesson": "olelo/lesson-07"
            }
          ]
        }
      ]
    }
  ],
  "kaona": [
    "Kūnihi ka Mauna（「メレを読む」）への答えの歌。Emerson（1909）は p.40 に戸口で入室を請う Kūnihi を、p.41 に別の mele kāhea を載せたあと、「この願いへの答えは次の言葉だった」としてこの Mele Komo を置く。Kūnihi は答えの無い沈黙で終わるが、この歌は人を中へ呼び入れる。Emerson によれば、mele komo を唱えることは hālau の戸を開けるだけでなく、訪ねてきた者を心からの客として迎えることでもあり、外の世界の新しい知らせを持ってくる者として三重に歓迎された。",
    "もてなしの見返りに求めるのは、声だけ。Emerson は注63で、p.41 の mele kāhea（Emerson は Kamāmalu 王女の作と伝える）が報いに waʻa（カヌー。身体の婉曲）を差し出すのに対し、答えの mele komo は報いを「ただ声だけ」と控えめに量る、と書く。",
    "今の hālau でも、kumu が返す oli komo として使われる。RealHula の kumu は、hālau に入るときに最もよく使われる oli kāhea が Kūnihi ka Mauna で、oli kāhea には oli komo が答えるものだとし、kumu が返すいつもの oli komo としてこの歌の書き出しを挙げる。oli kāhea がきちんと詠まれなければ中からは沈黙しか返らない、とも書く。"
  ],
  "version": "Emerson『Unwritten Literature of Hawaii』（1909）p.41 の本文（Mele Komo）に拠る。1・2行目は、PE が hewa の項の例文に引く形に合わせた（DDR 010）。Emerson の本文も1行目は maloko と書くが、2行目は a hewa waha（ka なし）と書く。PE の例文、Emerson が同じページに載せる mele kāhea の同じ句（a hewa ka waha）、Kanu o ka ʻĀina の教材（a hewa aʻe ka waha）はどれも ka を入れるので、ここは PE に合わせて ka を入れた。3・4行目は PE の見出しに綴りを合わせた（no→nō、la→lā、o→ʻo、e→ē）。Kanu o ka ʻĀina の教材は1行目を ma loko と2語に書き、4行目の ē を置かない。行訳は本サイトの訳。",
  "sources": [
    {
      "label": "N. B. Emerson『Unwritten Literature of Hawaii』（1909）p.41「Mele Komo」（Project Gutenberg 全文）",
      "url": "https://www.gutenberg.org/cache/epub/20299/pg20299.txt",
      "note": "本文・英訳（Welcoming-Song）、注62・63、mele komo の意味"
    },
    {
      "label": "Pukui & Elbert, Hawaiian Dictionary — hewa（Wehewehe Wikiwiki、Hilo ミラー）",
      "url": "https://wehe.hilo.hawaii.edu/?q=hewa",
      "note": "hewa 4. の例文に1・2行目と訳。逐語の意味は hea、kanaka、komo、hānai、uku、eia、wale、leo も"
    },
    {
      "label": "RealHula — The Meaning of OLI",
      "url": "https://www.realhula.com/the-meaning-of-oli",
      "note": "Kūnihi ka Mauna が最もよく使われる oli kāhea で、kumu が返すいつもの oli komo はこの歌（RealHula の表記は E hea e ke kanaka…）"
    },
    {
      "label": "Kanu o ka ʻĀina Protocol Chants & Songs（2017）",
      "url": "https://malamapokii.org/wp-content/uploads/2021/11/KANU-Protocol-Chants-Songs-Final-2017.pdf",
      "note": "Permission Chant。2行目を「Feed him lest his mouth err」と訳す別の読み"
    },
    {
      "label": "Huapala — Entrance Chant（Kauaʻi）",
      "url": "https://www.huapala.org/Chants/Entrance_chant.html",
      "note": "K. Garza-Maguire による Kūnihi と答えの歌の英訳"
    }
  ]
};
