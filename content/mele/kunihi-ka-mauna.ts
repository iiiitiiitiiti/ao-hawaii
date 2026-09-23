import type { MeleBody } from "../../src/mele/types.ts";

/*
 * Kūnihi ka mauna（Hiʻiaka の物語の詠唱。hālau に入る mele kāhea。N. B. Emerson が1909年に採録）。
 * 伝承で、1929年より前に出版されているので、歌詞の規約（docs/DESIGN.md「歌詞（mele）引用の規約」）を満たし全文を載せる。
 * 本文は Emerson『Unwritten Literature of Hawaii』p.40。綴りは PE の見出しと Place Names に合わせた（DDR 010）。
 */
export const body: MeleBody = {
  "stanzas": [
    {
      "lines": [
        {
          "haw": "Kūnihi ka mauna i ka laʻi ē,",
          "words": [
            {
              "w": "Kūnihi",
              "gloss": "切り立った、険しい（PE kūnihi 1.）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "mauna",
              "gloss": "山",
              "term": "mauna"
            },
            {
              "w": "i",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "laʻi",
              "gloss": "凪、静けさ。海・空・風の穏やかさ（PE）"
            },
            {
              "w": "ē",
              "gloss": "強めの小辞（PE ē 2.）",
              "term": "e-intens"
            }
          ],
          "ja": "山は凪の中に切り立ち",
          "notes": [
            {
              "text": "Emerson の訳は「Steep stands the mountain in calm」。述語の Kūnihi が先、主語 ka mauna があと。",
              "lesson": "olelo/lesson-04"
            }
          ]
        },
        {
          "haw": "ʻO Waiʻaleʻale lā i Wailua,",
          "words": [
            {
              "w": "ʻO",
              "gloss": "名を示す ʻo",
              "term": "o-subject"
            },
            {
              "w": "Waiʻaleʻale",
              "gloss": "Kauaʻi の最高峰（PE、Place Names）。Emerson 注59 は「Leaping-water」、Kauaʻi の中央の山塊とする"
            },
            {
              "w": "lā",
              "gloss": "行中・行末の囃子",
              "term": "la-refrain"
            },
            {
              "w": "i",
              "gloss": "〜に"
            },
            {
              "w": "Wailua",
              "gloss": "Kauaʻi の川と土地の名（Place Names）"
            }
          ],
          "ja": "Wailua から望む Waiʻaleʻale",
          "notes": [
            {
              "text": "Emerson の訳は「Profile of Wai-ale-ale at Wai-lua」。Place Names の Waiʻaleʻale の項は典拠の一つにこの本の p.40（UL 40）を挙げる。"
            }
          ]
        },
        {
          "haw": "Huki aʻe lā i ka lani",
          "words": [
            {
              "w": "Huki",
              "gloss": "引く、伸ばす、届く（PE huki 1. to pull … stretch, reach）"
            },
            {
              "w": "aʻe",
              "gloss": "上へ（方向詞）",
              "term": "ae-dir"
            },
            {
              "w": "lā",
              "gloss": "行中・行末の囃子",
              "term": "la-refrain"
            },
            {
              "w": "i",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "lani",
              "gloss": "空、天（PE lani 1.）"
            }
          ],
          "ja": "空へと伸び上がる",
          "notes": [
            {
              "text": "読みが2つある。PE は huki の項に Hiʻiaka の詠唱の「Huki i ka lani, ka lae o Kalāʻau」＝reaching to the sky is point Kalāʻau を挙げる。この形なら、次の行の Kawaikini（Waiʻaleʻale の最高点）が空へ届く、と読める。Emerson は3・4行目をまとめて「Gone the stream-spanning plank of Wai-kini」と訳し、物語の、外された渡し板として読む。行訳は前者に拠った。"
            }
          ]
        },
        {
          "haw": "Ka papa ʻauwai o Kawaikini;",
          "words": [
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "papa",
              "gloss": "平らな面、層、平地。板（PE papa 1.）"
            },
            {
              "w": "ʻauwai",
              "gloss": "水路、溝（PE）"
            },
            {
              "w": "o",
              "gloss": "〜の"
            },
            {
              "w": "Kawaikini",
              "gloss": "Waiʻaleʻale の最高点（5,243フィート）。字義は「多くの水」。Place Names は典拠に UL 40（この本の p.40）を挙げる。Emerson の綴りは ka Wai-kini"
            }
          ],
          "ja": "Kawaikini の、水路の走る平らな高み",
          "notes": [
            {
              "text": "Emerson の訳では「Wai-kini の流れにかけた板」。papa（平らな面・板）と ʻauwai（水路）のどちらの意味を取るかで、山の景色にも、外された渡し板にも読める。"
            }
          ]
        },
        {
          "haw": "Ālai ʻia aʻela e Nounou,",
          "words": [
            {
              "w": "Ālai",
              "gloss": "さえぎる、ふさぐ（PE ālai 1.）"
            },
            {
              "w": "ʻia",
              "gloss": "受動",
              "term": "ia-passive"
            },
            {
              "w": "aʻela",
              "gloss": "方向詞 aʻe と lā がつながった形"
            },
            {
              "w": "e",
              "gloss": "〜によって（行為者の e）"
            },
            {
              "w": "Nounou",
              "gloss": "Kauaʻi の山。今は Sleeping Giant と呼ばれる（Place Names）"
            }
          ],
          "ja": "（景色は）Nounou にさえぎられ",
          "notes": [
            {
              "text": "ʻia（受動）と行為者の e で「Nounou によってさえぎられ」。訳は資料で分かれ、Emerson は「Filched away by Nou-nou」（Nounou に奪われた、として板の話につなぐ）、Place Names は「Nounou is screened」（Nounou が隠される）と訳す。Place Names は5〜7行目を「Hula chant by Hiʻiaka」として「Ālai ʻia aʻela e Nounou, nalo Ka-ipu-haʻa i ka laulā mauka o Ka-paʻa」と引き、ここの綴りはその引用に合わせた。",
              "lesson": "moolelo/lesson-03"
            }
          ]
        },
        {
          "haw": "Nalo Kaipuhaʻa,",
          "words": [
            {
              "w": "Nalo",
              "gloss": "隠れる、見えなくなる（PE nalo 1.）"
            },
            {
              "w": "Kaipuhaʻa",
              "gloss": "丘の名。字義は「低いひょうたん」（Place Names の Nounou の項の訳 The-low-calabash）。Emerson の綴りは ka Ipu-haʻa"
            }
          ],
          "ja": "Kaipuhaʻa も見えなくなる"
        },
        {
          "haw": "Ka laulā mauka o Kapaʻa ē!",
          "words": [
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "laulā",
              "gloss": "広さ、広がり（PE）"
            },
            {
              "w": "mauka",
              "gloss": "山側へ、内陸に（PE は uka を見よとする）"
            },
            {
              "w": "o",
              "gloss": "〜の"
            },
            {
              "w": "Kapaʻa",
              "gloss": "Kauaʻi の Kawaihau 地区の土地・町の名（Place Names）"
            },
            {
              "w": "ē",
              "gloss": "強めの小辞（PE ē 2.）",
              "term": "e-intens"
            }
          ],
          "ja": "Kapaʻa の山側に広がる土地も",
          "notes": [
            {
              "text": "Place Names は Kapaʻa の項にこの行と次の行「Ka laulā mauka o Kapaʻa ē, mai paʻa i ka leo」を引き、典拠に UL 40（この本の p.40）を挙げる。"
            }
          ]
        },
        {
          "haw": "Mai paʻa i ka leo!",
          "words": [
            {
              "w": "Mai",
              "gloss": "〜するな（否定の命令。PE mai 4.）"
            },
            {
              "w": "paʻa",
              "gloss": "閉ざす、固く保つ（PE paʻa 1.）"
            },
            {
              "w": "i",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "leo",
              "gloss": "声（PE）"
            }
          ],
          "ja": "声を閉ざさないで",
          "notes": [
            {
              "text": "Emerson の訳は「Give voice and make answer」。"
            }
          ]
        },
        {
          "haw": "He ʻole ka hea mai ē!",
          "words": [
            {
              "w": "He",
              "gloss": "不定冠詞（He 文）",
              "term": "he-article"
            },
            {
              "w": "ʻole",
              "gloss": "無い、ゼロ（PE ʻole 1.）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "hea",
              "gloss": "呼ぶこと（PE hea 1.）"
            },
            {
              "w": "mai",
              "gloss": "こちらへ（方向詞）",
              "term": "mai-dir"
            },
            {
              "w": "ē",
              "gloss": "強めの小辞（PE ē 2.）",
              "term": "e-intens"
            }
          ],
          "ja": "こちらへの呼びかけは無い",
          "notes": [
            {
              "text": "Emerson の訳は「Dead silence—no voice in reply」。He ʻole ＋名詞で「〜が無い」。",
              "lesson": "olelo/lesson-03"
            }
          ]
        }
      ]
    }
  ],
  "kaona": [
    "Emerson（1909）によれば、この詠唱は Hiʻiaka の物語から取られた一節で、hālau に入る合言葉としても使われた。Emerson のこの箇所では、Hiʻiaka は Hōpoe と連れ立って Lohiʻau を迎えに行き、Kauaʻi の Wailua 川に来る（講座 Moʻolelo Lesson 03 で見た筋では、Hōpoe は Pele に託されて残り、同行者は Wahineʻōmaʻo）。川には板が一枚かけてあるだけだったが、Kahiki から来たとされる気性の荒い水の精（Emerson は naiad、witch と書く）で、川と同じ名の Wailua がその板を外していた。Hiʻiaka が板を戻せと呼びかけても、Wailua は女神だと気づかず、黙って答えない。Hiʻiaka が力を振るうと Wailua は正体の moʻo に戻って川底の洞に逃げ、Hiʻiaka は渡り場に飛び石を置いた。その石は今も残る、と Emerson は書く。Place Names も5〜7行目を「Hula chant by Hiʻiaka」として引く。",
    "Emerson の英訳は、この物語に沿って詞章を読む。3・4行目は外された渡し板、5行目は Nounou に奪われた板、8行目は「声を出して答えよ」という呼びかけ、9行目は答えが返らない沈黙になる。一方で、3〜7行目は Waiʻaleʻale・Kawaikini・Nounou・Kaipuhaʻa・Kapaʻa の景色としても読める（各行のメモ）。",
    "hālau の戸口では、外に立つ者がこれを詠み、中からの答え（mele komo）を待つ。Emerson は、この訪問者を戸口で長く待たせた、と書いたうえで次の mele kāhea へ話を進める。答えの無い沈黙で終わる詞章が、入室を請う詠唱として使われていたことになる。"
  ],
  "version": "Emerson『Unwritten Literature of Hawaii』（1909）p.40 の本文（mele kahea）に拠る。綴りは DDR 010 に従い PE の見出しと Place Names に合わせた（Kunihi→Kūnihi、la’i→laʻi、O→ʻO、Wai-ale-ale→Waiʻaleʻale、au-wai→ʻauwai、e→ē など）。4行目の ka Wai-kini は Place Names の Kawaikini（典拠に UL 40）に合わせて Kawaikini と書いた。5〜7行目は Place Names の Nounou の項の引用に合わせ、Alai ia a’e la を Ālai ʻia aʻela、ka Ipu-ha’a を Kaipuhaʻa と書いた。Place Names の引用は7行目を「i ka laulā」とするが、ここは Emerson の Ka laulā のまま。語そのものは変えていない。行訳は本サイトの訳。3〜5行目は読みが分かれるので、Emerson（英訳8行）と Place Names の訳を各行のメモに並べた。",
  "sources": [
    {
      "label": "N. B. Emerson『Unwritten Literature of Hawaii』（1909）p.40「Mele Kahea」（Project Gutenberg 全文）",
      "url": "https://www.gutenberg.org/cache/epub/20299/pg20299.txt",
      "note": "本文・英訳・注59、Hiʻiaka と Wailua の物語、合言葉としての使われ方"
    },
    {
      "label": "Place Names of Hawaiʻi（1974。Wehewehe Wikiwiki、Hilo ミラー）— Nounou",
      "url": "https://wehe.hilo.hawaii.edu/?q=Nounou",
      "note": "Sleeping Giant、「Hula chant by Hiʻiaka」として5〜7行目を引く"
    },
    {
      "label": "Place Names of Hawaiʻi（1974）— Kapaʻa / Waiʻaleʻale / Kawaikini / Wailua",
      "url": "https://wehe.hilo.hawaii.edu/?q=Kapa%CA%BBa",
      "note": "7・8行目を UL 40 として引く。Waiʻaleʻale は Kauaʻi の最高峰、Kawaikini はその最高点（典拠に UL 40）"
    },
    {
      "label": "Pukui & Elbert, Hawaiian Dictionary（Wehewehe Wikiwiki、Hilo ミラー）",
      "url": "https://wehe.hilo.hawaii.edu/?q=k%C5%ABnihi",
      "note": "逐語の意味。kūnihi、laʻi、huki（Huki i ka lani の例文）、papa、ʻauwai、ālai、nalo、laulā、mai 4.、paʻa、leo、ʻole、hea"
    }
  ]
};
