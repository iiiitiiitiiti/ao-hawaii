import type { Song } from "./types";

export const leiLehuaOPanaewa: Song = {
  id: "lei-lehua-o-panaewa",
  title: "Lei Lehua o Panaʻewa",
  altTitle: "The Hilo Hula",
  chords: ["A7", "C", "D7", "G7"],
  note: "ハワイ島ヒロ地区の地名パナエヴァの森に咲くレフア（オーヒアの花）を、愛しい人にたとえて歌うフラの曲。原譜の副題は「The Hilo Hula」。",
  /*
   * 1923年版 King's Book of Hawaiian Melodies の63ページから起こした（記号の読み方は aloha-oe.ts）。
   * 原典の G 長調・2/4 から C へ移すと、弱起の C のあと C / C / A7 / A7 / A7 / D7 / D7 / G7 ×6 / C / C。
   * Pālolo と同じ A7–D7–G7–C の、5度ずつ下がる進行。
   */
  sheet: `
[C]ʻO ʻoe no [A7]ia e kuʻu lei le[D7]hua
[G7]Ke ʻala onaona o Pana[C]ʻewa
`,
  /*
   * 訳の根拠。辞書は wehe.hilo.hawaii.edu（Pukui-Elbert 1986）で引いた。
   * ʻoe = 2. pronoun（二人称の代名詞。あなた）／nō = 3. intensifying particle, very, quite（強めの小辞。まさに）／
   * ia = 1. pronoun, he, she, it（それ・その人）／kuʻu = 3. possessive, my, mine（愛情を込めた「私の」。
   * ipo や lei の前によく使う、と辞書にある）／lei = garland, wreath（レイ）／
   * lehua = the flower of the ʻōhiʻa tree（オーヒアの木の花）／ʻala = fragrant; fragrance（香る・香り）／
   * onaona = softly fragrant; soft fragrance（やわらかな香り）／
   * Panaʻewa = place name in the Hilo District, famous in legend and song（ヒロ地区の地名。伝説と歌に名高い）。
   *
   * e（呼びかけ）・ke（冠詞）・o（〜の）は文法の語なので引いていない。
   * 「no」は huapala.org の綴りに合わせて長音記号なしで書いたが、意味は強めの小辞 nō で取った。
   * 原譜63ページの英語詞 "The one that I adore is my lei lehua / Endowed with lovely fragrance in Panaewa" と
   * huapala.org の訳 "The one that I adore is my lei lehua / Endowed with lovely fragrance in Panaʻewa" で照合した。
   * 英語詞は歌うための意訳なので、訳の元にはしていない。
   */
  meaning: [
    {
      line: "ʻO ʻoe no ia e kuʻu lei lehua",
      meaning: "あなたこそ、私の愛しいレフアのレイ",
    },
    {
      line: "Ke ʻala onaona o Panaʻewa",
      meaning: "パナエヴァ（ヒロ地区の森の地名）の、やわらかな香りよ",
    },
  ],
  performance: {
    /*
     * 同じ63ページの歌の段から読んだ。G 長調を完全4度上げて C へ移した。
     * 原譜は 2/4 で、Pālolo と同じく音の長さを倍にして 4/4 で書いている。
     * 音の高さは、五線の位置を画素で測って決めた（符頭の中心と底線の距離を半スペース単位で数えた）。
     * 「no」は F♯ から G へ2つの音でつなぐ（原譜ではスラー。このサブセットにスラーは無いので音だけ書いた）。
     * 「ia」は G♯ の2分音符で、次の小節の4分音符へタイ。
     * 弱起の「ʻO」だけが底線の下（D）で、「ʻoe」の「e」・「e kuʻu」・「o」・「Pa」は底線上（E）。
     * 「na」（onaona の末尾）は 4分音符3つをタイでつないで伸ばす。
     * 歌詞コード譜の終わり（「wa」）までで止める。原譜はその後に休みの小節が5つ続く
     * （記号は 2G・2G・1G・one と終止の小節。C 長調では G7・G7・C）。
     */
    abc: `
M:4/4
L:1/16
K:C
"C"G8 | G8 A8 | B8 c8 | "A7"^c16- | ^c8 A4 A4 | B8 ^c8 |
w: ʻO ʻo-e no _ ia _ e kuʻu lei le-
"D7"d16 | d16 | "G7"d8 d8 | d12 ^c4 | d12 ^c4 | d8 d8- | d8 A8 | A8 B8 | "C"c16 | c16 |]
w: hu-a Ke ʻa-la o-na-o-na _ _ o Pa-na-ʻe-wa
`,
    bpm: 60,
    strum: "d-du-udu",
    note: "原譜は2拍子です。音の長さを倍にして4拍で数えているので、テンポの数字は原譜の半分の速さにあたります。",
  },
  arrangement:
    "コードは1923年版『King's Book of Hawaiian Melodies』63ページの Ernest K. Kaʻai によるコード記号から起こし、原典の G 長調を C へ移しました。コードは変えていません。歌詞は1番だけを載せています。原譜には11番まであり、2番以降も同じ節で歌います。",
  licensing: {
    status: "public-domain",
    authors: [{ name: "Charles E. King", role: "both", died: 1950 }],
    // 原譜（1923年版63ページ）に "Copyright, 1916, by Chas. E. King" と印刷されている。作者の表記も "CHAS. E. KING" 単独
    earliestPublication: 1916,
    verifiedOn: "2026-09-18",
    sources: [
      "https://archive.org/details/kingsbookofhawai00king",
      "https://www.huapala.org/lei/Lei_Lehua_Panaewa.html",
      "https://en.wikipedia.org/wiki/Charles_E._King",
    ],
    caveat:
      "huapala.org は「Words & music by Charles E. King」としつつ、注記に「歌詞は King の作でない可能性がある」と書いている。別の作者の名は挙げていない。原譜（1923年版63ページ）の作者表記は Chas. E. King 単独で、著作権表示も King。原譜を根拠に King 単独として扱う。",
  },
};
