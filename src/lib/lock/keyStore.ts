/**
 * 鍵付きの曲の鍵をこの端末に覚えておく。
 *
 * 「メレを読む」とウクレレ教材の鍵付き曲が共に使う（docs/decisions/008、docs/decisions/ukulele/021、docs/decisions/013）。
 * DB 名は旧サイト時代の "ao-hawaii-mele" のまま。変えると端末に覚えた鍵が見えなくなる。
 *
 * IndexedDB に extractable: false の CryptoKey をそのまま入れる。鍵は使えるが、JS から中身を読み出せない。
 * 鍵と一緒に、導出に使った salt も別レコードで覚える。サイト側の salt が変わっていたら（パスフレーズの作り直し）、
 * 古い鍵では開けないので捨てて、入力を求める。
 *
 * IndexedDB が使えない環境（プライベートブラウズなど）では、覚えずにその場だけ使う。
 */

const DB_NAME = "ao-hawaii-mele";
const STORE = "keys";
const KEY_NAME = "site";
const SALT_NAME = "site-salt";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  try {
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

/** 覚えている鍵。salt が今のサイトの値と違えば（鍵の作り直し）、捨てて undefined を返す */
export async function loadKey(salt: string): Promise<CryptoKey | undefined> {
  if (typeof indexedDB === "undefined") return undefined;
  try {
    const key = (await run<CryptoKey | undefined>("readonly", (s) => s.get(KEY_NAME))) ?? undefined;
    if (!key) return undefined;
    const savedSalt = (await run<string | undefined>("readonly", (s) => s.get(SALT_NAME))) ?? undefined;
    if (savedSalt !== undefined && savedSalt !== salt) {
      await clearKey();
      return undefined;
    }
    return key;
  } catch {
    return undefined;
  }
}

/** 覚えられたら true */
export async function saveKey(key: CryptoKey, salt: string): Promise<boolean> {
  if (typeof indexedDB === "undefined") return false;
  try {
    await run("readwrite", (s) => s.put(key, KEY_NAME));
    await run("readwrite", (s) => s.put(salt, SALT_NAME));
    return true;
  } catch {
    return false;
  }
}

/** 消せたら（または覚えていなかったら）true */
export async function clearKey(): Promise<boolean> {
  if (typeof indexedDB === "undefined") return true;
  try {
    await run("readwrite", (s) => s.delete(KEY_NAME));
    await run("readwrite", (s) => s.delete(SALT_NAME));
    return true;
  } catch {
    return false;
  }
}
