import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { COURSES, findLesson } from "../content/courses";
import { findMele } from "../content/mele";
import keyInfo from "../content/mele-keyinfo.json";
import { decryptJson, deriveKey, type KeyInfo, type LockedEnvelope } from "../mele/crypto";
import { clearKey, loadKey, saveKey } from "../mele/keyStore";
import { MeleBodyView } from "../mele/MeleBodyView";
import { BackToTop } from "../widgets/BackToTop";
import { getLockedEnvelope, getPublicBody } from "../mele/meleData";
import type { LessonRef, MeleBody } from "../mele/types";
import { NotFoundPage } from "./NotFoundPage";

// IndexedDB に保存できなかった端末でも、開いているあいだは他の曲を入力なしで読めるようにする
let sessionKey: CryptoKey | undefined;

function RelatedLesson({ lessonRef }: { lessonRef: LessonRef }) {
  const [slug, rest] = lessonRef.split("/");
  const number = Number(rest.replace("lesson-", ""));
  const course = COURSES.find((c) => c.slug === slug);
  return (
    <Link to={`/${lessonRef}`}>
      <span lang="haw">{course?.name}</span> Lesson {String(number).padStart(2, "0")}「{findLesson(slug, number)?.title}」
    </Link>
  );
}

type LockState = { kind: "checking" } | { kind: "locked"; error?: string; busy?: boolean } | { kind: "open"; body: MeleBody; remembered: boolean };

/** 保護曲の本体。覚えている鍵で開けなければパスワードを求める（テストから直接描画するため export） */
export function LockedBody({ id, envelope }: { id: string; envelope: LockedEnvelope }) {
  const [state, setState] = useState<LockState>({ kind: "checking" });
  const [passphrase, setPassphrase] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const key = sessionKey ?? (await loadKey((keyInfo as KeyInfo).salt));
      if (key) {
        try {
          const body = await decryptJson<MeleBody>(envelope, key, id);
          sessionKey = key;
          if (alive) setState({ kind: "open", body, remembered: true });
          return;
        } catch {
          // この曲は覚えている鍵で開けない（再暗号化し忘れた曲など）。他の曲は開けるかもしれないので鍵は消さず、入力を求める。
          // 正しいパスワードが入れば、その鍵で上書きされる
        }
      }
      if (alive) setState({ kind: "locked" });
    })();
    return () => {
      alive = false;
    };
  }, [envelope, id]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!passphrase.trim() || (state.kind === "locked" && state.busy)) return;
    setState({ kind: "locked", busy: true });
    try {
      const key = await deriveKey(passphrase.trim(), keyInfo as KeyInfo);
      const body = await decryptJson<MeleBody>(envelope, key, id);
      sessionKey = key;
      const remembered = await saveKey(key, (keyInfo as KeyInfo).salt);
      setPassphrase("");
      setState({ kind: "open", body, remembered });
    } catch {
      setState({ kind: "locked", error: "パスワードが違います。" });
    }
  }

  async function forget() {
    sessionKey = undefined;
    const cleared = await clearKey();
    setState({ kind: "locked", error: cleared ? undefined : "この端末の鍵を消せませんでした。ブラウザのサイトデータを削除してください。" });
  }

  if (state.kind === "checking") return <p className="mele-lock__status">鍵を確かめています…</p>;
  if (state.kind === "open") {
    return (
      <>
        <MeleBodyView body={state.body} />
        <div className="mele-lock__forget">
          <p>{state.remembered ? "この端末はパスワードを覚えています。" : "この端末では覚えられないため、ページを閉じると再び入力が要ります。"}</p>
          <button type="button" className="btn" onClick={forget}>
            この端末から鍵を消す
          </button>
        </div>
      </>
    );
  }
  return (
    <form className="mele-lock" onSubmit={submit}>
      <p>この曲は著作権の保護期間中のため、歌詞と注を暗号化して置いています。パスワードを入れると読めます。</p>
      <label className="mele-lock__label">
        パスワード
        <input
          className="mele-lock__input"
          type="password"
          autoComplete="current-password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          disabled={state.busy}
        />
      </label>
      <button type="submit" className="btn" disabled={state.busy || !passphrase.trim()}>
        {state.busy ? "確かめています…" : "開く"}
      </button>
      {state.error && (
        <p className="mele-lock__error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}

export function MelePage() {
  const { meleId = "" } = useParams();
  const meta = findMele(meleId);
  if (!meta) return <NotFoundPage />;
  const publicBody = meta.protection === "public" ? getPublicBody(meta.id) : undefined;
  const envelope = meta.protection === "locked" ? getLockedEnvelope(meta.id) : undefined;

  return (
    <main className="melepage">
      <Link className="crumb" to="/mele">
        メレを読む
      </Link>
      <header className="melepage__header">
        <h1 className="melepage__title" lang="haw">
          {meta.title}
        </h1>
        <p className="melepage__meta">
          {meta.composer}・{meta.year}
        </p>
        <p className="melepage__summary">{meta.summary}</p>
      </header>

      <section className="melepage__background">
        <h2>成り立ち</h2>
        {meta.background.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {meta.related.length > 0 && (
          <p className="melepage__related">
            関連するレッスン:{" "}
            {meta.related.map((r, i) => (
              <span key={r}>
                {i > 0 && "、"}
                <RelatedLesson lessonRef={r} />
              </span>
            ))}
          </p>
        )}
        {meta.ukulele && (
          <p className="melepage__related">
            <a href={meta.ukulele}>ウクレレ教材のこの曲</a>
          </p>
        )}
      </section>

      <h2 className="melepage__lyrics-title">歌詞を読む</h2>
      {publicBody && <MeleBodyView body={publicBody} />}
      {envelope && <LockedBody id={meta.id} envelope={envelope} />}
      {!publicBody && !envelope && <p className="mele-lock__status">この曲の本文はまだ置かれていません。</p>}
      <BackToTop />
    </main>
  );
}
