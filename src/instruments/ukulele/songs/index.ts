import { alohaOe } from "./aloha-oe.ts";
import { kaimanaHila } from "./kaimana-hila.ts";
import { kuuPuaIPaoakalani } from "./kuu-pua-i-paoakalani.ts";
import { leiLehuaOPanaewa } from "./lei-lehua-o-panaewa.ts";
import { naLeiOHawaii } from "./na-lei-o-hawaii.ts";
import { nohoPaipai } from "./noho-paipai.ts";
import { palolo } from "./palolo.ts";
import { saints } from "./saints.ts";
import type { Song } from "./types";

export type { ProtectedLicensing, PublicDomainLicensing, Song, SongAuthor, SongAuthorRole, SongBody, SongLicensing } from "./types";

/**
 * 掲載する曲。
 *
 * 並びはコースで出てくる順。曲を足すときは docs/songs-licensing.md への追記も必須で、
 * tests/ukulele/songs.test.ts が記録漏れを検出する。
 */
export const UKULELE_SONGS: Song[] = [
  saints,
  alohaOe,
  kaimanaHila,
  kuuPuaIPaoakalani,
  naLeiOHawaii,
  palolo,
  leiLehuaOPanaewa,
  nohoPaipai,
];

/** 鍵付きの曲（本体を暗号化して置く曲）か。 */
export function isLockedSong(song: Song): boolean {
  return song.licensing.status === "protected";
}

export function findSong(id: string): Song | undefined {
  return UKULELE_SONGS.find((song) => song.id === id);
}
