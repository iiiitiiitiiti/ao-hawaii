import type { KeyInfo, LockedEnvelope } from "../../../core/lock/crypto";
import keyInfoJson from "./song-keyinfo.json";

/** サイト共通の salt と反復回数（ao-hawaii の mele-keyinfo.json と同じ値。DDR 021） */
export const SONG_KEY_INFO = keyInfoJson as KeyInfo;

/** AES-GCM の追加認証データ。ao-hawaii の暗号文（id そのもの）と取り違えても復号できない */
export function songAad(id: string): string {
  return `ukulele:${id}`;
}

/*
 * 暗号文は `npm run song:lock` が書く（scripts/song-lock.ts）。ここでは読むだけ。
 * ビルド時に束ねるので、鍵付きの曲が増えてもファイルを列挙し直す必要はない。
 */
const envelopes = import.meta.glob<{ default: LockedEnvelope }>("./locked/*.json", { eager: true });

export function getLockedEnvelope(id: string): LockedEnvelope | undefined {
  return envelopes[`./locked/${id}.json`]?.default;
}

/** 置かれている暗号文の id 一覧（孤児の検出用） */
export function lockedSongIds(): string[] {
  return Object.keys(envelopes).map((path) => path.replace(/^\.\/locked\//, "").replace(/\.json$/, ""));
}
