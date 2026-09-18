import type { Song } from "./types";

/**
 * 鍵付きの曲（DDR 021）。本体（歌詞コード譜・お手本・意味）は Drive の平文から
 * `npm run song:lock` で暗号化し、songs/locked/noho-paipai.json に置く。ここには歌詞を書かない。
 *
 * chords は本体が置かれるまで空。空の間は「弾ける曲だけ」「コード数」の絞り込みの対象にしない（filters.ts）。
 */
export const nohoPaipai: Song = {
  id: "noho-paipai",
  title: "Noho Paipai",
  altTitle: "Rocking Chair Hula",
  chords: [],
  note: "揺り椅子（noho paipai）に二人で座る情景を歌うフラの定番曲。作者 John K. Almeida 自身の録音が1938年ごろ（KGU 放送用原盤）と 49th State Records 盤に残る。歌詞は保護期間中のため暗号化して置く。",
  licensing: {
    status: "protected",
    authors: [{ name: "John Kameaaloha Almeida（1897〜1985）", role: "both", died: 1985 }],
    reason:
      "Almeida 自身の録音2点（Hawaiʻi State Archives 所蔵の KGU 放送用原盤 HT-217、49th State Records 64-B）が作者を John K. Almeida と記す。huapala.org は「Traditional」とした上で、広めた Almeida の名をクレジットに挙げる。作者を Almeida とする以上、没後70年（2055年末）までは日本で保護期間中として扱う。",
    transcribedFrom: "持ち主が所有する教室の歌詞カード（写真）。届き次第、本体を書き起こす",
    verifiedOn: "2026-09-18",
    sources: [
      "https://www.huapala.org/No/Noho_Paipai.html",
      "https://digitalarchives.hawaii.gov/browse/parent/ark:70111/4T1X",
      "https://archive.org/details/78_noho-paipai-rocking-chair-hula_john-k-almeida-and-his-hawaiians-johnny-almeida-a_gbia0035277b",
      "https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida",
    ],
  },
};
