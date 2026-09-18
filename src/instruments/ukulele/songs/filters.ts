import { UKULELE_CHORDS } from "../chords";
import type { Song } from "./types";

/** 習得済みのコードだけで弾けるか。 */
export function isPlayable(song: Song, learned: string[]): boolean {
  // コードが未登録の曲（本体がまだ置かれていない鍵付きの曲）は「弾ける」と言えない
  if (song.chords.length === 0) return false;
  const known = new Set(learned);
  return song.chords.every((chord) => known.has(chord));
}

/**
 * セーハ（1本の指で複数弦をまとめて押さえる）を含むか。
 *
 * 曲データには持たせず、コード定義から引く。曲側に書くと、コードの押さえ方を
 * 変えたときに曲データが古いままになる。
 */
export function usesBarre(song: Song): boolean {
  return song.chords.some((chord) => UKULELE_CHORDS[chord]?.barre !== undefined);
}

export type ChordCountBucket = "3" | "4" | "5+";

/** コード数の区分。絞り込みの選択肢に対応する。コードが未登録の曲は undefined（どの区分にも入れない）。 */
export function chordCountBucket(song: Song): ChordCountBucket | undefined {
  if (song.chords.length === 0) return undefined;
  if (song.chords.length <= 3) return "3";
  if (song.chords.length === 4) return "4";
  return "5+";
}
