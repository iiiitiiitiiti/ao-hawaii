import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { MELE } from "../src/content/mele";
import { decryptJson, deriveKey, encryptJson, randomBytes, toBase64, type KeyInfo } from "../src/mele/crypto";
import { getLockedEnvelope, getPublicBody, listBodyFiles } from "../src/mele/meleData";
import type { MeleBody } from "../src/mele/types";
import { normalizeLine, validateBody, validateMeta } from "../src/mele/validate";

const ROOT = process.cwd();

// 暗号の往復テスト用。実在の歌詞は使わない（docs/decisions/008）
const DUMMY: MeleBody = {
  stanzas: [{ lines: [{ haw: "He mele hoʻāʻo kēia.", words: [{ w: "He", gloss: "不定冠詞" }, { w: "mele", gloss: "歌" }, { w: "hoʻāʻo", gloss: "試す" }, { w: "kēia", gloss: "これ" }], ja: "これは試しの歌" }] }],
  kaona: [],
  version: "テスト用のダミー",
  sources: [{ label: "なし" }],
};

describe("曲データの検査（validate）", () => {
  test("語を並べたものと歌詞は、句読点と大文字小文字の差を無視して比べる", () => {
    expect(normalizeLine("Kaulana nā pua, aʻo Hawaiʻi.")).toBe(normalizeLine("kaulana nā pua aʻo hawaiʻi"));
    expect(normalizeLine("aʻo")).not.toBe(normalizeLine("ao"));
  });

  test("語が歌詞と食い違うと検出する", () => {
    const bad: MeleBody = { ...DUMMY, stanzas: [{ lines: [{ ...DUMMY.stanzas[0].lines[0], words: DUMMY.stanzas[0].lines[0].words.slice(1) }] }] };
    expect(validateBody("x", bad).join("\n")).toMatch(/一致しません/);
  });

  test("アポストロフィ類・用語集に無い id・目次に無いレッスン・禁止フレーズを検出する", () => {
    const line = DUMMY.stanzas[0].lines[0];
    const bad: MeleBody = {
      ...DUMMY,
      stanzas: [{ lines: [{ ...line, haw: "He mele ho'āʻo kēia", words: [...line.words.slice(0, 2), { w: "ho'āʻo", gloss: "試す", term: "no-such-term" }, line.words[3]], notes: [{ text: "x", lesson: "olelo/lesson-09" }] }] }],
      kaona: ["この解釈は未確認"],
    };
    const errors = validateBody("x", bad).join("\n");
    expect(errors).toMatch(/アポストロフィ/);
    expect(errors).toMatch(/no-such-term/);
    expect(errors).toMatch(/olelo\/lesson-09/);
    expect(errors).toMatch(/禁止フレーズ/);
  });

  test("ダミーの曲は合格する", () => {
    expect(validateBody("dummy", DUMMY)).toEqual([]);
  });
});

describe("曲の目次と本体", () => {
  test("id が重複せず、公開部分が検査を通る", () => {
    const ids = MELE.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const m of MELE) expect(validateMeta(m), m.id).toEqual([]);
  });

  test("公開曲は本体が平文であり、検査を通る", () => {
    for (const m of MELE.filter((m) => m.protection === "public")) {
      const body = getPublicBody(m.id);
      expect(body, `${m.id} の本体 content/mele/${m.id}.ts`).toBeDefined();
      expect(validateBody(m.id, body!), m.id).toEqual([]);
    }
  });

  test("保護曲は平文の本体を持たず、暗号文だけがある", () => {
    for (const m of MELE.filter((m) => m.protection === "locked")) {
      expect(existsSync(path.join(ROOT, "content", "mele", `${m.id}.ts`)), `${m.id} の平文がリポジトリにある`).toBe(false);
      const env = getLockedEnvelope(m.id);
      expect(env, `${m.id} の暗号文 src/content/mele-locked/${m.id}.json`).toBeDefined();
      expect(Object.keys(env!).sort()).toEqual(["ct", "iv", "v"]);
      expect(env!.ct).toMatch(/^[A-Za-z0-9+/]+=*$/);
      expect(env!.iv).toMatch(/^[A-Za-z0-9+/]+=*$/);
    }
  });

  test("目次に無い本体ファイルが無い（置き忘れた平文を含む）", () => {
    const known = new Set(MELE.map((m) => `${m.protection}:${m.id}`));
    const { publicIds, lockedIds } = listBodyFiles();
    for (const id of publicIds) expect(known.has(`public:${id}`), `content/mele/${id}.ts`).toBe(true);
    for (const id of lockedIds) expect(known.has(`locked:${id}`), `src/content/mele-locked/${id}.json`).toBe(true);
  });
});

describe("暗号化と復号", () => {
  // 本番は 600,000 回。テストは速さのために減らす（方式は同じ）
  const info: KeyInfo = { v: 1, salt: toBase64(randomBytes(16)), iterations: 1000 };

  test("正しいパスフレーズで往復できる", async () => {
    const key = await deriveKey("test-passphrase", info);
    // 端末に保存する鍵は、中身を JS から取り出せない形にする（docs/decisions/008）
    expect(key.extractable).toBe(false);
    const env = await encryptJson(DUMMY, key, "dummy");
    expect(JSON.stringify(env)).not.toContain("mele");
    expect(await decryptJson<MeleBody>(env, key, "dummy")).toEqual(DUMMY);
  });

  test("違うパスフレーズでは復号できない", async () => {
    const env = await encryptJson(DUMMY, await deriveKey("test-passphrase", info), "dummy");
    await expect(decryptJson(env, await deriveKey("wrong", info), "dummy")).rejects.toThrow();
  });

  test("別の曲の id では復号できない（暗号文の差し替えを防ぐ）", async () => {
    const key = await deriveKey("test-passphrase", info);
    const env = await encryptJson(DUMMY, key, "dummy");
    await expect(decryptJson(env, key, "other")).rejects.toThrow();
  });

  test("同じ内容でも暗号化のたびに IV と暗号文が変わる", async () => {
    const key = await deriveKey("test-passphrase", info);
    const a = await encryptJson(DUMMY, key, "dummy");
    const b = await encryptJson(DUMMY, key, "dummy");
    expect(a.iv).not.toBe(b.iv);
    expect(a.ct).not.toBe(b.ct);
  });
});
