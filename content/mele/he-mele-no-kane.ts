import type { MeleBody } from "../../src/mele/types.ts";

/*
 * He Mele no Kāne（Kauaʻi の伝承の詠唱。N. B. Emerson が1909年に採録）。
 * 伝承で、1929年より前に出版されているので、歌詞の規約（docs/DESIGN.md「歌詞（mele）引用の規約」）を満たし全文を載せる。
 * 本文は Emerson『Unwritten Literature of Hawaii』第41章。綴りは PE の見出しに合わせた（DDR 010）。
 * 逐語の意味は Pukui-Elbert 辞書（PE、Hilo ミラー wehe.hilo.hawaii.edu）で引いた。
 */
export const body: MeleBody = {
  "stanzas": [
    {
      "lines": [
        {
          "haw": "He ui, he nīnau:",
          "words": [
            {
              "w": "He",
              "gloss": "不定冠詞（〜である）",
              "term": "he-article"
            },
            {
              "w": "ui",
              "gloss": "問い（PE ui 1.）"
            },
            {
              "w": "he",
              "gloss": "不定冠詞",
              "term": "he-article"
            },
            {
              "w": "nīnau",
              "gloss": "問い、たずねること（PE）"
            }
          ],
          "ja": "ひとつの問い、ひとつのたずね",
          "notes": [
            {
              "text": "PE は ui の項に「He ui, a he nīnau kēia (chant)」＝a query, a question this を、詠唱（chant）の例文として挙げる。"
            }
          ]
        },
        {
          "haw": "He ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "He",
              "gloss": "不定冠詞（Emerson の本文のまま。次の連からは E）",
              "term": "he-article"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "動詞のあとの ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "問いを、私はあなたに向ける",
          "notes": [
            {
              "text": "この行だけ He で始まり、第2連からは E ui aku ana au iā ʻoe（e … ana）になる。Emerson の本文のまま。",
              "lesson": "olelo/lesson-04"
            }
          ]
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Ala i ka hikina a ka lā,",
          "words": [
            {
              "w": "Ala",
              "gloss": "起き上がる、昇る（PE ala 3.）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "hikina",
              "gloss": "日の昇り（PE hikina 3. coming）。Place Names の Haʻehaʻe の項に「Ka hikina a ka lā i Haʻehaʻe」＝the rising of the sun at Haʻehaʻe の例文がある"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "lā",
              "gloss": "太陽"
            }
          ],
          "ja": "日の昇るところに起き上がり",
          "notes": [
            {
              "text": "Emerson の訳は「At the Eastern Gate」。"
            }
          ]
        },
        {
          "haw": "Puka i Haʻehaʻe;",
          "words": [
            {
              "w": "Puka",
              "gloss": "現れる、出る。太陽が昇ることにも言う（PE puka 2.）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "Haʻehaʻe",
              "gloss": "天の東の門。朝、太陽がここから入る（Emerson 注512）。Place Names は Hawaiʻi 島 Kumukahi 近くの土地の名とし、Parker 1922 は Puna の岬の名で mele によく出るとする"
            }
          ],
          "ja": "Haʻehaʻe から現れる"
        },
        {
          "haw": "Aia i laila ka wai a Kāne.",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "laila",
              "gloss": "そこ",
              "term": "laila"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "そこに Kāne の水がある"
        }
      ]
    },
    {
      "lines": [
        {
          "haw": "E ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "E",
              "gloss": "未完了（e … ana の e）",
              "term": "e-ana"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞。話し手から相手へ）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "未完了（e … ana の ana）",
              "term": "e-ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（人名・代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "私はあなたに問う"
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Aia i Kaulanakalā,",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "Kaulanakalā",
              "gloss": "「浮かぶ太陽」。沈む日が海の上に舟のように浮いて見える現象の名が、その場所の名になった（Emerson 注513）。辞書と地名辞典に見出しが無いので、Emerson の訳 the floating of the sun に従い kau・lana・ka・lā（太陽）をつなげて書いた"
            }
          ],
          "ja": "日の浮かぶ Kaulanakalā に"
        },
        {
          "haw": "I ka pae ʻōpua i ke kai,",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "pae",
              "gloss": "並び、列（PE pae 1.）"
            },
            {
              "w": "ʻōpua",
              "gloss": "水平線に積み重なるもくもくした雲。前兆と読まれることが多い（PE）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "kai",
              "gloss": "海",
              "term": "kai-sea"
            }
          ],
          "ja": "海の上に並ぶ雲の群れに",
          "notes": [
            {
              "text": "Emerson 注514 は pae ʻōpua i ke kai を、特に西の水平線に休むように見える明るい雲の呼び名とする。"
            }
          ]
        },
        {
          "haw": "Ea mai ana ma Nihoa,",
          "words": [
            {
              "w": "Ea",
              "gloss": "昇る、上がる（PE ea 3.）"
            },
            {
              "w": "mai",
              "gloss": "こちらへ（方向詞）",
              "term": "mai-dir"
            },
            {
              "w": "ana",
              "gloss": "動詞のあとの ana"
            },
            {
              "w": "ma",
              "gloss": "〜で（場所の前置詞）"
            },
            {
              "w": "Nihoa",
              "gloss": "Nihoa 島。Kauaʻi と Midway の間の島（PE nihoa 2.）"
            }
          ],
          "ja": "Nihoa にせり上がり",
          "notes": [
            {
              "text": "Emerson 注515: Nihoa は Kauaʻi の北西の小さな岩の島で、水平線のはるか下にあるのに、見えているかのように歌われている。"
            }
          ]
        },
        {
          "haw": "Ma ka mole mai o Lehua;",
          "words": [
            {
              "w": "Ma",
              "gloss": "〜で"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "mole",
              "gloss": "根元、底、土台（PE mole 1.）"
            },
            {
              "w": "mai",
              "gloss": "こちらへ（方向詞）",
              "term": "mai-dir"
            },
            {
              "w": "o",
              "gloss": "〜の"
            },
            {
              "w": "Lehua",
              "gloss": "Lehua 島"
            }
          ],
          "ja": "Lehua の根元のこちら側に",
          "notes": [
            {
              "text": "Emerson の訳は「This side the base of Lehua」。"
            }
          ]
        },
        {
          "haw": "Aia i laila ka wai a Kāne.",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "laila",
              "gloss": "そこ",
              "term": "laila"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "そこに Kāne の水がある"
        }
      ]
    },
    {
      "lines": [
        {
          "haw": "E ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "E",
              "gloss": "未完了（e … ana の e）",
              "term": "e-ana"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞。話し手から相手へ）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "未完了（e … ana の ana）",
              "term": "e-ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（人名・代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "私はあなたに問う"
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Aia i ke kuahiwi, i ke kualono,",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "kuahiwi",
              "gloss": "山、高い丘（PE）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "kualono",
              "gloss": "山頂近くの一帯、尾根（PE kualono 1.）"
            }
          ],
          "ja": "山に、尾根に"
        },
        {
          "haw": "I ke awāwa, i ke kahawai;",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "awāwa",
              "gloss": "谷、峡谷（PE）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "kahawai",
              "gloss": "川、沢。水の有無を問わず谷筋にも言う（PE）"
            }
          ],
          "ja": "谷に、流れに"
        },
        {
          "haw": "Aia i laila ka wai a Kāne.",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "laila",
              "gloss": "そこ",
              "term": "laila"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "そこに Kāne の水がある"
        }
      ]
    },
    {
      "lines": [
        {
          "haw": "E ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "E",
              "gloss": "未完了（e … ana の e）",
              "term": "e-ana"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞。話し手から相手へ）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "未完了（e … ana の ana）",
              "term": "e-ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（人名・代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "私はあなたに問う"
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Aia i kai, i ka moana,",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "kai",
              "gloss": "海、海辺（i kai で「海の方に」）",
              "term": "kai-sea"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "moana",
              "gloss": "外海、大海（PE moana 1.）",
              "term": "moana"
            }
          ],
          "ja": "海に、大海に"
        },
        {
          "haw": "I ke kualau, i ke ānuenue,",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "kualau",
              "gloss": "海風を伴うにわか雨（PE）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ānuenue",
              "gloss": "虹（PE）"
            }
          ],
          "ja": "海風のにわか雨に、虹に"
        },
        {
          "haw": "I ka pūnohu, i ka uakoko,",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "pūnohu",
              "gloss": "煙や霧のように立ちのぼるもの。赤みを帯びることがある（PE）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "uakoko",
              "gloss": "低くかかる虹。直訳は「血の雨」。山肌の土で川を赤茶色にするほどの大雨にも言う（PE）"
            }
          ],
          "ja": "立ちのぼる赤い霧に、地をはう虹に",
          "notes": [
            {
              "text": "Emerson 注516・517: punohu は赤く光る雲や暈で、神聖で大事な出来事の前兆。ua koko は地面近くにかかる虹、または山肌を洗った赤い泥水の出水で、kapu の首長の誕生を示す大事な前兆とされた。"
            }
          ]
        },
        {
          "haw": "I ka ʻālewalewa;",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "ʻālewalewa",
              "gloss": "浮かぶ、漂う（PE）。Andrews 1865 は「空に漂う雲や煙」とする"
            }
          ],
          "ja": "空に漂う雲に"
        },
        {
          "haw": "Aia i laila ka wai a Kāne.",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "laila",
              "gloss": "そこ",
              "term": "laila"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "そこに Kāne の水がある"
        }
      ]
    },
    {
      "lines": [
        {
          "haw": "E ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "E",
              "gloss": "未完了（e … ana の e）",
              "term": "e-ana"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞。話し手から相手へ）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "未完了（e … ana の ana）",
              "term": "e-ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（人名・代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "私はあなたに問う"
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Aia i luna ka wai a Kāne,",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "luna",
              "gloss": "上、高いところ"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水は高みにある"
        },
        {
          "haw": "I ke ʻōuli, i ke ao ʻeleʻele,",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ʻōuli",
              "gloss": "兆し、前兆（PE）。Emerson の綴りは ouli、訳は「the heavenly blue」"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ao",
              "gloss": "雲",
              "term": "ao"
            },
            {
              "w": "ʻeleʻele",
              "gloss": "黒い（PE ʻeleʻele 1.）"
            }
          ],
          "ja": "兆しに、黒い雲に",
          "notes": [
            {
              "text": "PE の aouli は第1義が「大空、青い天蓋」、第2義が「ʻōuli の異形」。Emerson の訳は「the heavenly blue」。"
            }
          ]
        },
        {
          "haw": "I ke ao panopano,",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ao",
              "gloss": "雲",
              "term": "ao"
            },
            {
              "w": "panopano",
              "gloss": "黒々とした（pano の重複。PE は用例に ao panopano＝thick cloud を挙げる）"
            }
          ],
          "ja": "黒々と厚い雲に"
        },
        {
          "haw": "I ke ao pōpolohua mea a Kāne lā, ē!",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ke",
              "gloss": "定冠詞（ka の異形）",
              "term": "ka-ke"
            },
            {
              "w": "ao",
              "gloss": "雲",
              "term": "ao"
            },
            {
              "w": "pōpolohua",
              "gloss": "紫がかった青の、打ち身のように暗い（PE pōpolohua 1.）"
            },
            {
              "w": "mea",
              "gloss": "赤茶色の（PE mea 7.）"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            },
            {
              "w": "lā",
              "gloss": "行末の囃子",
              "term": "la-refrain"
            },
            {
              "w": "ē",
              "gloss": "強めの小辞（PE ē 2.）",
              "term": "e-intens"
            }
          ],
          "ja": "Kāne の、紫に赤茶の混じる暗い雲に",
          "notes": [
            {
              "text": "PE は pōpolohua の項に「Kai pōpolohua mea a Kāne」＝the purplish-blue reddish-brown sea of Kāne を例文に挙げる。この行と同じ言い回しが海について使われている。Emerson の訳は「the black-mottled sacred cloud of the gods」。"
            }
          ]
        },
        {
          "haw": "Aia i laila ka wai a Kāne.",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "laila",
              "gloss": "そこ",
              "term": "laila"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "そこに Kāne の水がある"
        }
      ]
    },
    {
      "lines": [
        {
          "haw": "E ui aku ana au iā ʻoe,",
          "words": [
            {
              "w": "E",
              "gloss": "未完了（e … ana の e）",
              "term": "e-ana"
            },
            {
              "w": "ui",
              "gloss": "問う（PE ui 1.）"
            },
            {
              "w": "aku",
              "gloss": "あちらへ（方向詞。話し手から相手へ）",
              "term": "aku"
            },
            {
              "w": "ana",
              "gloss": "未完了（e … ana の ana）",
              "term": "e-ana"
            },
            {
              "w": "au",
              "gloss": "私"
            },
            {
              "w": "iā",
              "gloss": "〜に（人名・代名詞の前の i）",
              "term": "ia-object"
            },
            {
              "w": "ʻoe",
              "gloss": "あなた"
            }
          ],
          "ja": "私はあなたに問う"
        },
        {
          "haw": "Aia i hea ka wai a Kāne?",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "hea",
              "gloss": "どこ（PE hea 5.）",
              "term": "hea"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            }
          ],
          "ja": "Kāne の水はどこにある？"
        },
        {
          "haw": "Aia i lalo, i ka honua, i ka wai hū,",
          "words": [
            {
              "w": "Aia",
              "gloss": "そこに〜がある（場所文の文頭）",
              "term": "aia"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "lalo",
              "gloss": "下、低いところ"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "honua",
              "gloss": "大地、地（PE honua 1.）"
            },
            {
              "w": "i",
              "gloss": "〜に（場所の前置詞）"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "hū",
              "gloss": "湧き上がる、あふれ出る（PE。wai hū＝湧き出る泉）"
            }
          ],
          "ja": "下に、大地に、湧き出る水に"
        },
        {
          "haw": "I ka wai kau a Kāne me Kanaloa—",
          "words": [
            {
              "w": "I",
              "gloss": "〜に"
            },
            {
              "w": "ka",
              "gloss": "定冠詞",
              "term": "ka-ke"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "kau",
              "gloss": "置く、据える（PE kau 1.）"
            },
            {
              "w": "a",
              "gloss": "〜の（所有 a）"
            },
            {
              "w": "Kāne",
              "gloss": "Kāne（神の名）",
              "term": "kane"
            },
            {
              "w": "me",
              "gloss": "〜とともに",
              "term": "me"
            },
            {
              "w": "Kanaloa",
              "gloss": "Kanaloa（神の名）"
            }
          ],
          "ja": "Kāne と Kanaloa の wai kau に",
          "notes": [
            {
              "text": "PE に wai kau の見出しは無く、Emerson は注518 でこの句を見出しに立てて「the ducts of Kane and Loa」と訳す。注518: Kāne と Kanaloa が連れ立って旅をしていたとき、Kanaloa が喉の渇きを訴えた。Kāne が杖を崖に突き立てると清水が湧き、今も流れている。場所は Maui の Keʻanae。",
              "lesson": "moolelo/lesson-02"
            }
          ]
        },
        {
          "haw": "He wai puna, he wai e inu,",
          "words": [
            {
              "w": "He",
              "gloss": "不定冠詞",
              "term": "he-article"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "puna",
              "gloss": "泉（PE puna 1.。wai puna＝泉の水）"
            },
            {
              "w": "he",
              "gloss": "不定冠詞",
              "term": "he-article"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "e",
              "gloss": "（これから）〜する（動詞の前）"
            },
            {
              "w": "inu",
              "gloss": "飲む"
            }
          ],
          "ja": "泉の水、飲むための水"
        },
        {
          "haw": "He wai e mana, he wai e ola.",
          "words": [
            {
              "w": "He",
              "gloss": "不定冠詞",
              "term": "he-article"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "e",
              "gloss": "〜する（動詞の前）"
            },
            {
              "w": "mana",
              "gloss": "霊的な力を持つ、力を与える（PE mana 1.）"
            },
            {
              "w": "he",
              "gloss": "不定冠詞",
              "term": "he-article"
            },
            {
              "w": "wai",
              "gloss": "真水",
              "term": "wai"
            },
            {
              "w": "e",
              "gloss": "〜する（動詞の前）"
            },
            {
              "w": "ola",
              "gloss": "生きる、命を与える、癒す（PE）"
            }
          ],
          "ja": "力を与える水、命を与える水"
        },
        {
          "haw": "E ola nō, ʻeā!",
          "words": [
            {
              "w": "E",
              "gloss": "命令・願い（動詞の前の e）",
              "term": "e-imperative"
            },
            {
              "w": "ola",
              "gloss": "生きる（PE）"
            },
            {
              "w": "nō",
              "gloss": "強め",
              "term": "no-intens"
            },
            {
              "w": "ʻeā",
              "gloss": "歌の囃子（PE ʻeā 2.）"
            }
          ],
          "ja": "生きよ、まことに",
          "notes": [
            {
              "text": "Emerson の本文は「E ola no, e-a!」。e-a を PE の ʻeā（2. 歌の囃子）の綴りで書いた。"
            }
          ]
        }
      ]
    }
  ],
  "kaona": [
    "Emerson（1909）は、英語圏の人にとっての聖杯伝説にあたるハワイの観念が「Kāne の水」だと書く。その観念はハワイの歌と物語のあちこちにほのめかされているが、はっきりした形に刻まれているのはこの mele だけだ、というのが Emerson の見立てである。",
    "問いは6回くり返され、答えの場所が移っていく。日の昇る東の Haʻehaʻe、日の沈む西の水平線と Nihoa・Lehua、山と谷と川、海と空のにわか雨・虹・赤い霧、高みの黒い雲、そして地の下の湧き水。最後の連で水は「飲むための水」「力を与える水」「命を与える水」になり、E ola nō（生きよ）で終わる。",
    "Kāne は淡水と結びつく神で、Kanaloa と連れ立って水を探す話がよく語られる（UH の Kahoʻiwai）。第6連の wai kau a Kāne me Kanaloa は、その話の一つを名指しする。Emerson によれば、渇いた Kanaloa のために Kāne が杖を崖に突き立てて湧かせた Maui の Keʻanae の水である。",
    "第4連の pūnohu と uakoko は、Emerson の注で前兆とされる空のしるし。punohu は神聖で大事な出来事の前ぶれ、ua koko は kapu の首長の誕生を示すしるしだった。Kāne の水のありかを答える行に、こうした空のしるしが並んでいる。"
  ],
  "version": "Emerson『Unwritten Literature of Hawaii』（1909）第41章「The Water of Kane」の本文に拠る。綴りは DDR 010 に従って PE の見出しに合わせた（ú-i→ui、i-héa→i hea、ia oe→iā ʻoe、Hae-hae→Haʻehaʻe（Place Names の見出し）、Kau-lana-ka-la→Kaulanakalā、pae opua→pae ʻōpua、ua-koko→uakoko、alewa-lewa→ʻālewalewa、ouli→ʻōuli、e-a→ʻeā など）。語そのものは変えていない。4行目の Ala も本文のまま。行訳は本サイトの訳で、Emerson の英訳の解釈に合わせている。Emerson の本文は6連39行で、英訳は行の分け方が違い45行ある。",
  "sources": [
    {
      "label": "N. B. Emerson『Unwritten Literature of Hawaii』（1909）第41章「The Water of Kane」（Project Gutenberg 全文）",
      "url": "https://www.gutenberg.org/cache/epub/20299/pg20299.txt",
      "note": "本文・英訳（p.257–259）と注512–518（Haʻehaʻe、Kaulanakalā、pae ʻōpua、Nihoa、punohu、ua koko、Keʻanae の水）"
    },
    {
      "label": "Pukui & Elbert, Hawaiian Dictionary（Wehewehe Wikiwiki、Hilo ミラー）",
      "url": "https://wehe.hilo.hawaii.edu/?q=ui",
      "note": "逐語の意味。ui（この詠唱の書き出しを例文に引く）、pōpolohua（Kai pōpolohua mea a Kāne）、uakoko、ʻōuli と aouli、ʻālewalewa、ea 3.、ala 3.、puka 2.、mea 7.、ʻeā 2. ほか"
    },
    {
      "label": "Parker 1922 / Andrews 1865（Wehewehe Wikiwiki）",
      "url": "https://wehe.hilo.hawaii.edu/?q=ha%CA%BBeha%CA%BBe",
      "note": "Haʻehaʻe の発音と Puna の岬の名（Parker）、ʻālewalewa＝空に漂う雲（Andrews）"
    },
    {
      "label": "University of Hawaiʻi Kahoʻiwai — Kāne",
      "url": "https://www.hawaii.edu/kawaihapai/akua-list/kane/",
      "note": "Kāne と淡水、Kanaloa と水を探す話"
    }
  ]
};
