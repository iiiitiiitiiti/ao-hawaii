import type { Song } from "./types";

/**
 * 鍵付きの曲（DDR 021）。本体（歌詞コード譜・意味）は Drive の平文から
 * `npm run song:lock` で暗号化し、songs/locked/noho-paipai.json に置く。ここには歌詞を書かない。
 * 歌詞カードに旋律の記譜が無いので、合成のお手本は置かず、Apple Music の録音を埋め込む（DDR 022）。
 */
export const nohoPaipai: Song = {
  id: "noho-paipai",
  title: "Noho Paipai",
  altTitle: "Rocking Chair Hula",
  chords: ["C", "D7", "F", "G7"],
  note: "揺り椅子（noho paipai）に二人で座る情景を歌うフラの定番曲。作者 John K. Almeida 自身の録音が1938年ごろ（KGU 放送用原盤）と 49th State Records 盤に残る。歌詞は保護期間中のため暗号化して置く。",
  recordings: [
    {
      label: "Wailau and Lopaka Ryder『Na Mele Hula』（2008）— Apple Music",
      url: "https://music.apple.com/jp/album/noho-paipai/277418606?i=277418698",
      embedUrl: "https://embed.music.apple.com/jp/album/noho-paipai/277418606?i=277418698",
    },
    {
      label: "John Kameaaloha Almeida 自身の録音（Cord International の復刻集、2003）— Apple Music",
      url: "https://music.apple.com/jp/album/noho-paipai/251372870?i=251373470",
    },
  ],
  licensing: {
    status: "protected",
    authors: [{ name: "John Kameaaloha Almeida（1897〜1985）", role: "both", died: 1985 }],
    reason:
      "Almeida 自身の録音2点（Hawaiʻi State Archives 所蔵の KGU 放送用原盤 HT-217、49th State Records 64-B）が作者を John K. Almeida と記す。huapala.org は「Traditional」とした上で、広めた Almeida の名をクレジットに挙げる。作者を Almeida とする以上、没後70年（2055年末）までは日本で保護期間中として扱う。",
    transcribedFrom: "持ち主が所有する教室の歌詞カード（写真。2026-09-18 受領）。コードと歌詞だけで五線譜は無い",
    verifiedOn: "2026-09-18",
    sources: [
      "https://www.huapala.org/No/Noho_Paipai.html",
      "https://digitalarchives.hawaii.gov/browse/parent/ark:70111/4T1X",
      "https://archive.org/details/78_noho-paipai-rocking-chair-hula_john-k-almeida-and-his-hawaiians-johnny-almeida-a_gbia0035277b",
      "https://en.wikipedia.org/wiki/John_Kameaaloha_Almeida",
    ],
  },
};
