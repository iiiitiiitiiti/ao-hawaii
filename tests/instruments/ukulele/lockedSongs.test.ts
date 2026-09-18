import { describe, expect, test } from "vitest";
// Vite の ?raw で読む。node:fs を使うと @types/node が必要になる
import licensingDoc from "../../docs/songs-licensing.md?raw";
import { decryptJson, deriveKey, encryptJson, type KeyInfo, type LockedEnvelope } from "../../src/core/lock/crypto";
import { UKULELE_SONGS, isLockedSong } from "../../src/instruments/ukulele/songs";
import type { SongBody } from "../../src/instruments/ukulele/songs";
import { SONG_KEY_INFO, getLockedEnvelope, lockedSongIds, songAad } from "../../src/instruments/ukulele/songs/locked";
import { songBodyErrors } from "../../src/instruments/ukulele/songs/validate";

/*
 * 鍵付きの曲（DDR 021）。平文は CI から見えないので、ここで見るのは
 * 「平文が公開リポに無いこと」「暗号文の形」「記録」「検査関数と暗号化の往復」だけ。
 * 歌詞の中身の検査は scripts/song-lock.ts が暗号化の前に行う。
 */

const locked = UKULELE_SONGS.filter(isLockedSong);
const publicSongs = UKULELE_SONGS.filter((song) => !isLockedSong(song));

/** 実在の歌詞ではないダミーの本体（palolo.ts と同じ形） */
const DUMMY_BODY: SongBody = {
  sheet: `
[C]La la [G7]la la
[G7]Lo lo [C]lo lo
`,
  progression: ["C", "G7", "G7", "C"],
  meaning: [
    { line: "La la la la", meaning: "らららら" },
    { line: "Lo lo lo lo", meaning: "ろろろろ" },
  ],
  performance: {
    abc: `
M:4/4
L:1/16
K:C
"C"C8 C8 | "G7"D8 E8 | "G7"D8 D8 | "C"C8 C8 |]
w: La la la la Lo lo lo lo
`,
    bpm: 80,
    strum: "d-du-udu",
  },
};
const TEST_KEY_INFO: KeyInfo = { v: 1, salt: "dGVzdC1zYWx0LXRlc3Qtc2FsdA==", iterations: 1000 };

describe("鍵付きの曲の置き方", () => {
  test("鍵付きの曲は、平文の曲ファイルに本体を持たない", () => {
    for (const song of locked) {
      for (const field of ["sheet", "performance", "meaning", "progression", "arrangement"] as const) {
        expect(song[field], `${song.id} / ${field}`).toBeUndefined();
      }
    }
  });

  test("公開曲は protected を名乗らず、暗号文も持たない", () => {
    for (const song of publicSongs) {
      expect(getLockedEnvelope(song.id), song.id).toBeUndefined();
    }
  });

  test("暗号文ファイルは {v, iv, ct} だけを持ち、登録された鍵付きの曲に対応する", () => {
    for (const id of lockedSongIds()) {
      const song = UKULELE_SONGS.find((s) => s.id === id);
      expect(song && isLockedSong(song), `${id} は鍵付きの曲として登録されていません`).toBe(true);
      const env = getLockedEnvelope(id) as LockedEnvelope;
      expect(Object.keys(env).sort()).toEqual(["ct", "iv", "v"]);
      expect(env.v).toBe(1);
      expect(env.iv.length, id).toBeGreaterThan(0);
      expect(env.ct.length, id).toBeGreaterThan(0);
    }
  });

  test("鍵付きの曲の記録には、保護期間中と判断した理由と平文の出どころがある", () => {
    for (const song of locked) {
      const licensing = song.licensing;
      if (licensing.status !== "protected") throw new Error(song.id);
      expect(licensing.reason.trim(), song.id).not.toBe("");
      expect(licensing.transcribedFrom.trim(), song.id).not.toBe("");
      expect(licensing.sources.length, song.id).toBeGreaterThan(0);
      const start = licensingDoc.indexOf(`id: ${song.id}`);
      expect(start, `${song.id} が docs/songs-licensing.md にありません`).toBeGreaterThanOrEqual(0);
      const rest = licensingDoc.slice(start);
      const end = rest.indexOf("\n### ", 1);
      const section = end === -1 ? rest : rest.slice(0, end);
      expect(section, song.id).toContain("保護期間中と判断した理由");
    }
  });

  test("salt と反復回数は ao-hawaii と同じ形で、反復回数が十分にある", () => {
    expect(SONG_KEY_INFO.v).toBe(1);
    expect(SONG_KEY_INFO.salt.length).toBeGreaterThan(0);
    expect(SONG_KEY_INFO.iterations).toBeGreaterThanOrEqual(600_000);
  });
});

describe("本体の検査と暗号化（ダミーの本体で）", () => {
  test("検査関数は正しい本体を通し、chords の食い違いを落とす", () => {
    expect(songBodyErrors("dummy", ["C", "G7"], DUMMY_BODY)).toEqual([]);
    expect(songBodyErrors("dummy", ["C", "F", "G7"], DUMMY_BODY).length).toBeGreaterThan(0);
    expect(songBodyErrors("dummy", ["C", "G7"], { ...DUMMY_BODY, meaning: DUMMY_BODY.meaning.slice(0, 1) }).length).toBeGreaterThan(0);
  });

  test("公開曲の平文も同じ検査関数を通る（テストと lock の検査がずれていない）", () => {
    for (const song of publicSongs) {
      if (!song.sheet || !song.performance || !song.meaning) continue;
      const body: SongBody = { sheet: song.sheet, performance: song.performance, meaning: song.meaning, progression: song.progression, arrangement: song.arrangement };
      expect(songBodyErrors(song.id, song.chords, body), song.id).toEqual([]);
    }
  });

  test("暗号化して復号すると元に戻り、別の曲の id では復号できない", async () => {
    const key = await deriveKey("test-passphrase", TEST_KEY_INFO);
    const env = await encryptJson(DUMMY_BODY, key, songAad("dummy"));
    expect(Object.keys(env).sort()).toEqual(["ct", "iv", "v"]);
    expect(await decryptJson<SongBody>(env, key, songAad("dummy"))).toEqual(DUMMY_BODY);
    await expect(decryptJson(env, key, songAad("other"))).rejects.toBeDefined();
    const wrong = await deriveKey("wrong-passphrase", TEST_KEY_INFO);
    await expect(decryptJson(env, wrong, songAad("dummy"))).rejects.toBeDefined();
  });
});
