import type { LockedEnvelope } from "./crypto";
import type { MeleBody } from "./types";

/**
 * 曲の本体の読み込み。
 * - 公開曲: content/mele/<id>.ts の `body`
 * - 保護曲: src/content/mele-locked/<id>.json の暗号文（復号は MelePage でパスワードを受けてから）
 */

const publicBodies = import.meta.glob<{ body: MeleBody }>("../../content/mele/*.ts", { eager: true });
const lockedEnvelopes = import.meta.glob<LockedEnvelope>("../content/mele-locked/*.json", { eager: true, import: "default" });

function idOf(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1).replace(/\.(ts|json)$/, "");
}

export function getPublicBody(id: string): MeleBody | undefined {
  return publicBodies[`../../content/mele/${id}.ts`]?.body;
}

export function getLockedEnvelope(id: string): LockedEnvelope | undefined {
  return lockedEnvelopes[`../content/mele-locked/${id}.json`];
}

/** 本体ファイルがある曲の id。目次（src/content/mele.ts）との突き合わせに使う */
export function listBodyFiles(): { publicIds: string[]; lockedIds: string[] } {
  return {
    publicIds: Object.keys(publicBodies).map(idOf),
    lockedIds: Object.keys(lockedEnvelopes).map(idOf),
  };
}

/** その用語を逐語注に使っている公開曲の id。保護曲は中身を明かさないため含めない */
export function publicMeleUsingTerm(termId: string): string[] {
  return Object.entries(publicBodies)
    .filter(([, m]) => m.body.stanzas.some((s) => s.lines.some((l) => l.words.some((w) => w.term === termId))))
    .map(([p]) => idOf(p));
}
