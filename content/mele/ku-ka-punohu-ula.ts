import type { MeleBody } from "../../src/mele/types.ts";

/*
 * Kū ka Pūnohu ʻUla（ʻōlapa が hālau の広間へ出るときの oli。N. B. Emerson が1909年に採録）。
 * 伝承で、1929年より前に出版されているので、歌詞の規約（docs/DESIGN.md「歌詞（mele）引用の規約」）を満たし全文を載せる。
 * 本文は Emerson『Unwritten Literature of Hawaii』p.55。綴りは PE の見出しに合わせた（DDR 010）。
 */
export const body: MeleBody = {
  "stanzas": [
    {
      "lines": [
        {
          "haw": "Kū ka pūnohu ʻula i ka moana;",
          "words": [
            {
              "w": "Kū",
              "gloss": "立つ、立ちのぼる、現れる（PE kū 1.）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "pūnohu",
              "gloss": "煙や霧のように立ちのぼるもの（PE pūnohu 1.。赤みを帯びることがある）。PE 2. は「地面近くにかかる虹」で、典拠に UL 99（Emerson の p.99）を挙げる"
            },
            {
              "w": "ʻula",
              "gloss": "赤い（PE ʻula 1.）"
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
              "w": "moana",
              "gloss": "外海、大海",
              "term": "moana"
            }
          ],
          "ja": "赤い pūnohu が大海の上に立つ",
          "notes": [
            {
              "text": "PE は pūnohu の項に「Pūnohu ʻula, i ke kai (song)」＝red rising mist on the sea を例文に挙げる。Emerson の訳は「The rainbow stands red o’er the ocean」。"
            }
          ]
        },
        {
          "haw": "Hele ke ʻehu kai, uhi i ka ʻāina;",
          "words": [
            {
              "w": "Hele",
              "gloss": "行く、進む"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ʻehu",
              "gloss": "しぶき、泡、霧（PE ʻehu 1.）。ʻehu kai で「海のしぶき、泡」（PE の見出し ʻehu kai）"
            },
            {
              "w": "kai",
              "gloss": "海",
              "term": "kai-sea"
            },
            {
              "w": "uhi",
              "gloss": "覆う（PE uhi 1.）"
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
              "w": "ʻāina",
              "gloss": "土地",
              "term": "aina"
            }
          ],
          "ja": "海のしぶきが進み、陸を覆う",
          "notes": [
            {
              "text": "Emerson の綴りは ehu-kai。PE の見出し ʻehu kai（Sea spray, foam）に合わせて2語に書いた。PE は ʻehu の項で、年配の人は ʻokina の無い ehu と言い、そちらが古い形らしいと書く。Emerson の訳は「Mist crawls from the sea and covers the land」。"
            }
          ]
        },
        {
          "haw": "ʻŌlapa ka uila, noho i Kahiki.",
          "words": [
            {
              "w": "ʻŌlapa",
              "gloss": "ひらめく。稲妻について言う（PE ʻōlapa 1.）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "uila",
              "gloss": "稲妻（PE）"
            },
            {
              "w": "noho",
              "gloss": "とどまる、住む（PE noho 2.）"
            },
            {
              "w": "i",
              "gloss": "〜に"
            },
            {
              "w": "Kahiki",
              "gloss": "Kahiki。PE の第1義は Tahiti。空を Kahiki-moe（水平線）などに分ける呼び名もあると PE は Malo を引いて書く"
            }
          ],
          "ja": "稲妻がひらめき、Kahiki にとどまる",
          "notes": [
            {
              "text": "Emerson の訳は「Far as Kahiki flashes the lightning」。PE の ʻōlapa は同じ見出しの第1義が「稲妻のようにひらめく」、第3義が「踊り手（詠唱者 hoʻopaʻa に対して）」（Lesson 03）。",
              "lesson": "hula/lesson-03"
            }
          ]
        },
        {
          "haw": "ʻUʻina, nākolo,",
          "words": [
            {
              "w": "ʻUʻina",
              "gloss": "鋭くはじける音、ぱちっと鳴る（PE ʻuʻina 1.）"
            },
            {
              "w": "nākolo",
              "gloss": "とどろき。波や雷の轟音（PE nākolo 1.）"
            }
          ],
          "ja": "はじける音、とどろき"
        },
        {
          "haw": "ʻUwā, ka pihe,",
          "words": [
            {
              "w": "ʻUwā",
              "gloss": "叫ぶ、大声を上げる（PE）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "pihe",
              "gloss": "人々の声のどよめき、叫び（PE）"
            }
          ],
          "ja": "どよめきが上がる"
        },
        {
          "haw": "Lau kānaka ka hula.",
          "words": [
            {
              "w": "Lau",
              "gloss": "数多い。四百（PE lau 4.。Emerson 注122 は古語の「四百」とする）"
            },
            {
              "w": "kānaka",
              "gloss": "人々（kanaka の複数）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "hula",
              "gloss": "hula",
              "term": "hula"
            }
          ],
          "ja": "hula には四百の人",
          "notes": [
            {
              "text": "Emerson の訳は5・6行目をまとめて「A shout of applause / From the four hundred」。"
            }
          ]
        },
        {
          "haw": "Ē Laka, ē!",
          "words": [
            {
              "w": "Ē",
              "gloss": "呼びかけ（名の前。PE ē 1.）",
              "term": "e-vocative"
            },
            {
              "w": "Laka",
              "gloss": "Laka（hula の神）",
              "term": "laka"
            },
            {
              "w": "ē",
              "gloss": "呼びかけ（名の後）",
              "term": "e-vocative"
            }
          ],
          "ja": "Laka よ！",
          "notes": [
            {
              "text": "Emerson の本文は「E Laka, e!」、訳は「I appeal to thee, Laka!」。名の前の呼びかけも PE の ē 1. に合わせて長音で書いた。",
              "lesson": "moolelo/lesson-04"
            }
          ]
        }
      ]
    }
  ],
  "kaona": [
    "Emerson（1909）の p.55 では、支度部屋で装いを終えた ʻōlapa の娘たちが、この歌を勢いよく声に出して歌いながら、弾むような足取りで hālau の広間へ出て、待っている人々の前に並ぶ。Emerson は英訳に「Tiring Song」（支度の歌）の題を付けた。続けて kumu が「Lele Mahu’ilani a luna」で始まる答えの歌を導く。英訳は「Lift Mahu’ilani on high」で、注123 によれば Mahuʻilani は右手の詩的な名、左手は Kaohilani と呼ばれた。",
    "1〜4行目は空と海のしるしが続く。赤い pūnohu、陸を覆う海のしぶき、稲妻、はじける音ととどろき。5・6行目でそれが人々の叫びとどよめきに変わり、7行目で Laka の名を呼んで終わる。Emerson はこの歌の pūnohu ʻula を「The rainbow stands red」と訳す。PE の pūnohu 2. も「地面近くにかかる虹」である。"
  ],
  "version": "Emerson『Unwritten Literature of Hawaii』（1909）p.55 の本文（Oli）に拠る。綴りは DDR 010 に従い PE の見出しに合わせた（Ku→Kū、punohu ula→pūnohu ʻula、ehu-kai→ʻehu kai、aina→ʻāina、Olapa→ʻŌlapa、Uina→ʻUʻina、nakolo→nākolo、Uwa→ʻUwā、kánaka→kānaka、E Laka, e→Ē Laka, ē）。句読点は Emerson の本文のまま。語そのものは変えていない。行訳は本サイトの訳で、Emerson の英訳の解釈に合わせている。",
  "sources": [
    {
      "label": "N. B. Emerson『Unwritten Literature of Hawaii』（1909）p.55–56「Oli」（Tiring Song。Project Gutenberg 全文）",
      "url": "https://www.gutenberg.org/cache/epub/20299/pg20299.txt",
      "note": "本文・英訳・注122、ʻōlapa が広間へ出る場面、kumu の答えの歌"
    },
    {
      "label": "Pukui & Elbert, Hawaiian Dictionary（Wehewehe Wikiwiki、Hilo ミラー）",
      "url": "https://wehe.hilo.hawaii.edu/?q=p%C5%ABnohu",
      "note": "逐語の意味。pūnohu（Pūnohu ʻula, i ke kai の例文）、kū 1.、ʻehu 1.、uhi 1.、ʻōlapa 1.、uila、noho 2.、Kahiki、ʻuʻina、nākolo、ʻuwā、pihe、lau 4."
    }
  ]
};
