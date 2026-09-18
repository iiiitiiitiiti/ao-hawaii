import { BANNED_PHRASES } from "../content/bannedPhrases.ts";
import { findLesson } from "../content/courses.ts";
import { GLOSSARY } from "../content/glossary.ts";
import type { LessonRef, MeleBody, MeleMeta } from "./types.ts";

/**
 * 曲データの形の検査。公開曲は tests/mele.test.ts が、保護曲は scripts/mele-lock.ts が暗号化の前に呼ぶ
 * （保護曲の平文は CI から見えないので、暗号化する手元で検査する）。
 *
 * 見るのは形だけで、訳や kaona 解説の正しさは見ない（docs/DESIGN.md「テストが見ないもの」）。
 * import に拡張子 .ts を付けているのは、scripts/mele-lock.ts を Node の型除去でそのまま動かすため。
 */

const BAD_APOSTROPHE = /['‘’`´]/;
const TERM_IDS = new Set(GLOSSARY.map((t) => t.id));

/**
 * 語を並べたものと行の歌詞を比べるための正規化。句読点と大文字小文字の差だけを無視する。
 * ʻokina（U+02BB）と kahakō は語の一部なので残す。
 */
export function normalizeLine(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[.,;:!?"“”()—–]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function lessonRefExists(ref: LessonRef): boolean {
  const m = /^([a-z-]+)\/lesson-(\d{2})$/.exec(ref);
  return !!m && !!findLesson(m[1], Number(m[2]));
}

function banned(text: string): string | undefined {
  return BANNED_PHRASES.find((re) => re.test(text))?.source;
}

/** 本体の検査。問題があれば「どこが・何が」の文を返す。空なら合格 */
export function validateBody(id: string, body: MeleBody): string[] {
  const errors: string[] = [];
  const texts: [where: string, text: string][] = [];

  if (body.stanzas.length === 0) errors.push(`${id}: 連（stanzas）が空です`);
  if (!body.version.trim()) errors.push(`${id}: version（拠った版とよく知られた版との違い）が空です`);
  if (body.sources.length === 0) errors.push(`${id}: 出典（sources）が空です`);

  body.stanzas.forEach((stanza, si) => {
    if (stanza.lines.length === 0) errors.push(`${id} 連${si + 1}: 行が空です`);
    stanza.lines.forEach((line, li) => {
      const at = `${id} 連${si + 1} 行${li + 1}`;
      const joined = line.words.map((w) => w.w).join(" ");
      if (normalizeLine(joined) !== normalizeLine(line.haw)) {
        errors.push(`${at}: 語を並べたもの「${joined}」が歌詞「${line.haw}」と一致しません`);
      }
      if (BAD_APOSTROPHE.test(line.haw)) errors.push(`${at}: 歌詞にアポストロフィ類があります（ʻokina は U+02BB）`);
      if (!line.ja.trim()) errors.push(`${at}: 行訳が空です`);
      texts.push([at, line.ja]);
      for (const w of line.words) {
        if (!w.w.trim()) errors.push(`${at}: 空の語があります`);
        if (BAD_APOSTROPHE.test(w.w)) errors.push(`${at}「${w.w}」: アポストロフィ類があります（ʻokina は U+02BB）`);
        if (/[.,;:!?"“”()]/.test(w.w)) errors.push(`${at}「${w.w}」: 語に句読点を含めないでください`);
        if (!w.gloss.trim()) errors.push(`${at}「${w.w}」: 逐語の意味が空です`);
        if (w.term && !TERM_IDS.has(w.term)) errors.push(`${at}「${w.w}」: 用語集に無い id「${w.term}」`);
        texts.push([`${at}「${w.w}」`, w.gloss]);
      }
      for (const n of line.notes ?? []) {
        if (n.lesson && !lessonRefExists(n.lesson)) errors.push(`${at}: 目次に無いレッスン「${n.lesson}」`);
        texts.push([`${at} のメモ`, n.text]);
      }
    });
  });

  body.kaona.forEach((p, i) => texts.push([`${id} kaona ${i + 1}`, p]));
  texts.push([`${id} version`, body.version]);
  for (const [where, text] of texts) {
    const hit = banned(text);
    if (hit) errors.push(`${where}: 禁止フレーズ ${hit}（docs/decisions/007）`);
  }
  return errors;
}

/** 公開してよい部分（題・作者・背景・関連レッスン）の検査 */
export function validateMeta(meta: MeleMeta): string[] {
  const errors: string[] = [];
  if (!/^[a-z0-9-]+$/.test(meta.id)) errors.push(`${meta.id}: id は英小文字・数字・ハイフンだけにします`);
  for (const ref of meta.related) if (!lessonRefExists(ref)) errors.push(`${meta.id}: 目次に無いレッスン「${ref}」`);
  for (const [where, text] of [["summary", meta.summary], ...meta.background.map((p, i) => [`background ${i + 1}`, p])] as const) {
    const hit = banned(text);
    if (hit) errors.push(`${meta.id} ${where}: 禁止フレーズ ${hit}（docs/decisions/007）`);
  }
  if (BAD_APOSTROPHE.test(meta.title)) errors.push(`${meta.id}: 題にアポストロフィ類があります（ʻokina は U+02BB）`);
  if (meta.appleMusic) {
    if (!/^https:\/\/music\.apple\.com\/[a-z]{2}\/album\/[^?]+\?i=\d+$/.test(meta.appleMusic.url)) {
      errors.push(`${meta.id}: appleMusic.url は https://music.apple.com/<国>/album/<曲>/<albumId>?i=<trackId> の形にします`);
    }
    if (!meta.appleMusic.note.trim()) errors.push(`${meta.id}: appleMusic.note（誰の録音か）が空です`);
  }
  return errors;
}
