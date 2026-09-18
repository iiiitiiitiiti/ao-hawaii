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
  note: "揺り椅子（noho paipai）に二人で座る情景を歌うフラの定番曲。歌詞は保護期間中のため暗号化して置く。",
  licensing: {
    status: "protected",
    authors: [{ name: "John Kameaaloha Almeida（クレジット上の作者。huapala.org は Traditional とする）", role: "both", died: 1985 }],
    reason:
      "huapala.org は「Traditional」としつつ、広めた John K. Almeida（1897〜1985）の名をクレジットに挙げる。作者とみなす資料がある以上、没後70年（2055年末）までは日本で保護期間中として扱う。",
    transcribedFrom: "持ち主が所有する教室の歌詞カード（写真）。届き次第、本体を書き起こす",
    verifiedOn: "2026-09-18",
    sources: ["https://www.huapala.org/No/Noho_Paipai.html"],
  },
};
