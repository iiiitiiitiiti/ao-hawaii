import { type CSSProperties, type FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { decryptJson, deriveKey, type LockedEnvelope } from "../../../core/lock/crypto";
import { clearKey, loadKey, saveKey } from "../../../core/lock/keyStore";
import type { SongLibraryPageProps } from "../../../core/lesson/types";
import { NotFoundPage } from "../../../pages/NotFoundPage";
import { findSong, isLockedSong } from "../songs";
import type { Song, SongAuthor, SongBody } from "../songs";
import { SONG_KEY_INFO, getLockedEnvelope, songAad } from "../songs/locked";
import { ChordDiagram } from "../widgets/ChordDiagram";
import { SongSheet } from "../widgets/SongSheet";

const ROLE_LABELS: Record<SongAuthor["role"], string> = {
  lyrics: "作詞",
  music: "作曲",
  both: "作詞・作曲",
};

/** 4小節ずつ区切って表にする。1行が4小節なのはレッスン本文の表と同じ。 */
function toBars(progression: string[]): { label: string; chords: string[] }[] {
  const rows: { label: string; chords: string[] }[] = [];
  for (let index = 0; index < progression.length; index += 4) {
    const chords = progression.slice(index, index + 4);
    rows.push({ label: `${index + 1}〜${index + chords.length}`, chords });
  }
  return rows;
}

/** 歌詞コード譜・進行の表。公開曲は Song の平文、鍵付きの曲は復号した本体を同じ形で渡す */
function SongBodyView({ body }: { body: Partial<SongBody> }) {
  return (
    <>
      {body.sheet ? (
        <section className="song__section">
          <h2>歌詞コード譜</h2>
          <SongSheet
            source={body.sheet}
            caption="コードが替わる場所だけを書いています。"
            performance={body.performance}
            meaning={body.meaning}
          />
          {body.noPerformance ? <p className="song__caveat">この曲にはお手本の再生がありません。{body.noPerformance}</p> : null}
          {body.arrangement ? <p className="song__caveat">{body.arrangement}</p> : null}
        </section>
      ) : null}

      {body.progression ? (
        <section className="song__section">
          <h2>この教材の進行</h2>
          <table>
            <thead>
              <tr>
                <th>小節</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
              </tr>
            </thead>
            <tbody>
              {toBars(body.progression).map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.chords.map((chord, index) => (
                    <td key={index}>{chord}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="song__caveat">
            伴奏の型です。歌に合わせてコードの変わり目がずれると感じたら、歌が変わるところで替えてかまいません。
          </p>
        </section>
      ) : null}
    </>
  );
}

type LockState = { kind: "checking" } | { kind: "locked"; error?: string; busy?: boolean } | { kind: "open"; body: SongBody; remembered: boolean };

/** ページ内で使い回す鍵（同じセッションで曲を移っても再入力しない） */
let sessionKey: CryptoKey | undefined;

/** 鍵付きの曲の本体。覚えている鍵で開けなければパスワードを求める（テストから直接描画するため export） */
export function LockedSongBody({ song, envelope }: { song: Song; envelope: LockedEnvelope }) {
  const [state, setState] = useState<LockState>({ kind: "checking" });
  const [passphrase, setPassphrase] = useState("");
  const aad = songAad(song.id);

  useEffect(() => {
    let alive = true;
    (async () => {
      const key = sessionKey ?? (await loadKey(SONG_KEY_INFO.salt));
      if (key) {
        try {
          const body = await decryptJson<SongBody>(envelope, key, aad);
          sessionKey = key;
          if (alive) setState({ kind: "open", body, remembered: true });
          return;
        } catch {
          // この曲は覚えている鍵で開けない（再暗号化し忘れなど）。鍵は消さず、入力を求める
        }
      }
      if (alive) setState({ kind: "locked" });
    })();
    return () => {
      alive = false;
    };
  }, [envelope, aad]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!passphrase.trim() || (state.kind === "locked" && state.busy)) return;
    setState({ kind: "locked", busy: true });
    try {
      const key = await deriveKey(passphrase.trim(), SONG_KEY_INFO);
      const body = await decryptJson<SongBody>(envelope, key, aad);
      sessionKey = key;
      const remembered = await saveKey(key, SONG_KEY_INFO.salt);
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

  if (state.kind === "checking") return <p className="song-lock__status">鍵を確かめています…</p>;
  if (state.kind === "open") {
    return (
      <>
        <SongBodyView body={state.body} />
        <div className="song-lock__forget">
          <p>
            {state.remembered
              ? "この端末はパスワードを覚えています（ハワイ講座「メレを読む」と共通）。"
              : "この端末では覚えられないため、ページを閉じると再び入力が要ります。"}
          </p>
          <button type="button" className="btn" onClick={forget}>
            この端末から鍵を消す（メレを読む も開けなくなります）
          </button>
        </div>
      </>
    );
  }
  return (
    <form className="song-lock" onSubmit={submit}>
      <p>この曲は著作権の保護期間中のため、歌詞コード譜など本体を暗号化して置いています。パスワード（ハワイ講座「メレを読む」と共通）を入れると読めます。</p>
      <label className="song-lock__label">
        パスワード
        <input
          className="song-lock__input"
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
      {state.error ? (
        <p className="song-lock__error" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

export function SongPage({ instrument }: SongLibraryPageProps) {
  const { songId = "" } = useParams();
  const song = findSong(songId);
  if (!song) return <NotFoundPage />;

  const { licensing } = song;
  const locked = isLockedSong(song);
  const envelope = locked ? getLockedEnvelope(song.id) : undefined;

  return (
    <main className="song" style={{ "--instrument-accent": instrument.accent } as CSSProperties}>
      <Link className="crumb" to={`/${instrument.slug}/songs`}>
        楽譜ライブラリ
      </Link>

      <header className="hero hero--tight">
        {song.altTitle ? <p className="eyebrow">{song.altTitle}</p> : null}
        <h1 className="hero__title">{song.title}</h1>
        {song.note ? <p className="hero__lede">{song.note}</p> : null}
      </header>

      <section className="song__section">
        <h2>使うコード</h2>
        {song.chords.length === 0 ? <p className="song__caveat">コードは本体を置くときに登録します。</p> : null}
        <div className="chord-row">
          {song.chords.map((name) => (
            <ChordDiagram key={name} name={name} size="sm" />
          ))}
        </div>
      </section>

      {locked ? (
        envelope ? (
          <LockedSongBody song={song} envelope={envelope} />
        ) : (
          <p className="song__caveat">この曲の本体（歌詞コード譜とお手本）はまだ置かれていません。歌詞カードから書き起こしてから追加します。</p>
        )
      ) : (
        <>
          <SongBodyView body={song} />
          {!song.sheet && !song.progression ? (
            <p className="song__caveat">
              この曲の譜面はまだ載せていません。小節ごとのコードの割り振りを出典付きで確かめてから追加します。
            </p>
          ) : null}
        </>
      )}

      {song.recordings?.length ? (
        <section className="song__section">
          <h2>参考の録音</h2>
          <p className="song__caveat">外部サイトの録音です。オフラインでは開けません。</p>
          {song.recordings.map((recording) => (
            <div key={recording.url} className="song-recording">
              {recording.embedUrl ? (
                <iframe
                  className="song-recording__embed"
                  title={recording.label}
                  src={recording.embedUrl}
                  allow="autoplay *; encrypted-media *;"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  loading="lazy"
                />
              ) : null}
              <p>
                <a href={recording.url} target="_blank" rel="noreferrer">
                  {recording.label}
                </a>
              </p>
            </div>
          ))}
        </section>
      ) : null}

      {/* 掲載の根拠を読み手が確かめられるようにする。既定は畳んでおく */}
      <details className="song__license">
        <summary>掲載の根拠（著作権）</summary>
        {licensing.status === "protected" ? (
          <dl>
            <dt>作者</dt>
            <dd>
              {licensing.authors
                .map((author) => `${author.name}（${ROLE_LABELS[author.role]}${author.died ? `・${author.died}年没` : ""}）`)
                .join("、")}
            </dd>
            <dt>判定</dt>
            <dd>{licensing.reason}</dd>
            <dt>置き方</dt>
            <dd>
              保護期間中のため、歌詞コード譜など本体は暗号化して置き、パスワードを知る持ち主だけが読めます。平文の出どころ: {licensing.transcribedFrom}
            </dd>
            <dt>出典</dt>
            <dd>
              <ul>
                {licensing.sources.map((source) => (
                  <li key={source}>
                    <a href={source} target="_blank" rel="noreferrer">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
            <dt>検証日</dt>
            <dd>{licensing.verifiedOn}</dd>
          </dl>
        ) : (
          <dl>
            <dt>作者</dt>
            <dd>
              {licensing.authors
                .map(
                  (author) =>
                    `${author.name}（${ROLE_LABELS[author.role]}・${
                      author.died === "traditional" ? "伝承" : `${author.died}年没`
                    }）`,
                )
                .join("、")}
            </dd>
            <dt>出版</dt>
            <dd>
              {licensing.earliestPublication === "traditional"
                ? (licensing.usBasis ?? "特定できない")
                : `確認できた最古は${licensing.earliestPublication}年`}
            </dd>
            <dt>判定</dt>
            <dd>
              日本は作詞者・作曲者の全員が1967年までに没していること、米国は1929年より前の出版であることの両方を満たす曲だけを掲載しています。
            </dd>
            {licensing.caveat ? (
              <>
                <dt>残る疑義</dt>
                <dd>{licensing.caveat}</dd>
              </>
            ) : null}
            <dt>出典</dt>
            <dd>
              <ul>
                {licensing.sources.map((source) => (
                  <li key={source}>
                    <a href={source} target="_blank" rel="noreferrer">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
            <dt>検証日</dt>
            <dd>{licensing.verifiedOn}</dd>
          </dl>
        )}
      </details>
    </main>
  );
}
