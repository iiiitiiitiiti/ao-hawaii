/**
 * 保護曲の本体の暗号化と復号（docs/decisions/008）。
 *
 * PBKDF2-SHA256 でパスフレーズから鍵を導き、AES-GCM 256bit で暗号化する。
 * Web Crypto API だけを使うので、ブラウザ（MelePage）と Node（scripts/mele-lock.ts）で同じコードが動く。
 * salt と反復回数はサイト共通（src/content/mele-keyinfo.json）、IV は曲ごと・暗号化ごとにランダム。
 * 曲の id を AES-GCM の追加認証データに入れ、暗号文を別の曲のファイルへ移しても復号できないようにする。
 */

export type KeyInfo = { v: 1; salt: string; iterations: number };
export type LockedEnvelope = { v: 1; iv: string; ct: string };

const subtle = () => globalThis.crypto.subtle;

export function toBase64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

export function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

export function randomBytes(n: number): Uint8Array<ArrayBuffer> {
  return globalThis.crypto.getRandomValues(new Uint8Array(n));
}

/**
 * パスフレーズから AES-GCM の鍵を導く。
 * ブラウザでは extractable: false のまま IndexedDB に保存する（鍵の中身を JS から読み出せない）。
 */
export async function deriveKey(passphrase: string, info: KeyInfo): Promise<CryptoKey> {
  const base = await subtle().importKey("raw", new TextEncoder().encode(passphrase.normalize("NFC")), "PBKDF2", false, ["deriveKey"]);
  return subtle().deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt: fromBase64(info.salt), iterations: info.iterations },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptJson(value: unknown, key: CryptoKey, id: string): Promise<LockedEnvelope> {
  const iv = randomBytes(12);
  const plain = new TextEncoder().encode(JSON.stringify(value));
  const ct = await subtle().encrypt({ name: "AES-GCM", iv, additionalData: new TextEncoder().encode(id) }, key, plain);
  return { v: 1, iv: toBase64(iv), ct: toBase64(new Uint8Array(ct)) };
}

/** 鍵が違う・暗号文が壊れている・別の曲の暗号文である、のどれでも例外になる */
export async function decryptJson<T>(env: LockedEnvelope, key: CryptoKey, id: string): Promise<T> {
  const plain = await subtle().decrypt(
    { name: "AES-GCM", iv: fromBase64(env.iv), additionalData: new TextEncoder().encode(id) },
    key,
    fromBase64(env.ct),
  );
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}
