import { noteToMidi } from "../../../core/audio/pitch.ts";
import { clampBpm } from "../../../core/audio/output/scheduler.ts";
import { parseAbc } from "../../../core/music/abc.ts";
import { UKULELE_CHORDS } from "../chords.ts";
import { barChords, sheetAlignmentErrors } from "../performance.ts";
import { parseSongSheet, songSheetChords } from "../songSheet.ts";
import type { SongBody } from "./types";

/*
 * 曲の本体の検査。Vite に依存しない（?raw も import.meta.glob も使わない）ので、
 * テストと scripts/song-lock.ts の両方から呼べる。鍵付きの曲の平文は CI から見えないため、
 * 暗号化の前にここで公開曲と同じ検査をかける（DDR 021）。
 */

const LOWEST = noteToMidi("G3");
const HIGHEST = noteToMidi("C6");

/** 歌詞コード譜の歌詞行（空行を除く）を、コードを外した文字列で返す。 */
export function lyricLines(sheet: string): string[] {
  return parseSongSheet(sheet)
    .filter((segments) => segments.length > 0)
    .map((segments) => segments.map((segment) => segment.text).join(""));
}

/** 本体が満たすべきことを検査し、問題を文で返す。空なら合格。 */
export function songBodyErrors(id: string, chords: string[], body: SongBody): string[] {
  const errors: string[] = [];
  const sorted = [...chords].sort();
  const same = (used: string[]) => JSON.stringify([...new Set(used)].sort()) === JSON.stringify(sorted);

  for (const name of chords) {
    if (!UKULELE_CHORDS[name]) errors.push(`${id}: コード ${name} が定義されていません`);
  }
  if (JSON.stringify(chords) !== JSON.stringify(sorted)) errors.push(`${id}: chords が名前順ではありません`);

  if (!body.sheet?.trim()) errors.push(`${id}: sheet がありません`);
  if (!body.performance) errors.push(`${id}: performance がありません`);
  if (!body.meaning) errors.push(`${id}: meaning がありません`);
  if (errors.length > 0) return errors;

  const sheet = parseSongSheet(body.sheet);
  if (!same(songSheetChords(sheet))) errors.push(`${id}: 歌詞コード譜のコードの集合が chords と一致しません`);
  if (body.progression && !same(body.progression)) errors.push(`${id}: 進行のコードの集合が chords と一致しません`);

  const lines = lyricLines(body.sheet);
  if (body.meaning.length !== lines.length) errors.push(`${id}: 意味の行数（${body.meaning.length}）が歌詞の行数（${lines.length}）と違います`);
  body.meaning.forEach((entry, index) => {
    if (entry.line !== lines[index]) errors.push(`${id}: ${index + 1}行目の意味の歌詞「${entry.line}」が譜「${lines[index]}」と一致しません`);
    if (!entry.meaning.trim()) errors.push(`${id}: ${index + 1}行目の意味が空です`);
  });

  const tune = parseAbc(body.performance.abc);
  errors.push(...sheetAlignmentErrors(tune, sheet).map((e) => `${id}: ${e}`));
  if (!same(tune.chords.map((chord) => chord.name))) errors.push(`${id}: お手本のコードの集合が chords と一致しません`);
  const bars = barChords(tune).filter((_, index) => !(index === 0 && tune.bars[0].length < tune.bars[0].capacity));
  if (body.progression) {
    const expected = body.progression.map((name) => [name]);
    if (JSON.stringify(bars) !== JSON.stringify(expected)) errors.push(`${id}: 小節ごとのコードが進行表と一致しません`);
  }
  for (const note of tune.notes) {
    if (note.midi < LOWEST || note.midi > HIGHEST) errors.push(`${id}: 音域 G3〜C6 の外の音があります（midi ${note.midi}）`);
  }
  if (clampBpm(body.performance.bpm) !== body.performance.bpm) errors.push(`${id}: bpm ${body.performance.bpm} が選べる範囲の外です`);
  return errors;
}
