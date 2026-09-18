/**
 * 保護曲の鍵をこの端末に覚えておく。
 *
 * IndexedDB に extractable: false の CryptoKey をそのまま入れる。鍵は使えるが、JS から中身を読み出せない。
 * localStorage を使わないのは、鍵を文字列に書き出す必要があり、鍵そのものを持ち出せるため。
 * ただし GitHub Pages のオリジン（iiiitiiitiiti.github.io）は他のリポジトリのサイトと共有しており、
 * そちらの JS も IndexedDB の鍵を「使う」ことはできる。受け入れたリスク（docs/decisions/008）。
 *
 * IndexedDB が使えない環境（プライベートブラウズなど）では、覚えずにその場だけ使う。
 */

const DB_NAME = "ao-hawaii-mele";
const STORE = "keys";
const KEY_NAME = "site";

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

export async function loadKey(): Promise<CryptoKey | undefined> {
  if (typeof indexedDB === "undefined") return undefined;
  try {
    return (await run<CryptoKey | undefined>("readonly", (s) => s.get(KEY_NAME))) ?? undefined;
  } catch {
    return undefined;
  }
}

/** 覚えられたら true */
export async function saveKey(key: CryptoKey): Promise<boolean> {
  if (typeof indexedDB === "undefined") return false;
  try {
    await run("readwrite", (s) => s.put(key, KEY_NAME));
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
    return true;
  } catch {
    return false;
  }
}
