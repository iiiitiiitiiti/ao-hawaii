/**
 * 「メレを読む」の曲データ。
 *
 * - MeleMeta（題・作者・背景・関連レッスン）は src/content/mele.ts に置き、保護曲でも公開する
 * - MeleBody（歌詞・逐語注・行訳・kaona）は、公開曲なら content/mele/<id>.ts、
 *   保護曲なら Drive の平文を scripts/mele-lock.ts で暗号化した src/content/mele-locked/<id>.json に置く
 *   （docs/decisions/008）
 */

/**
 * 出典。src/widgets/Sources.tsx の Source と同じ形（そのまま <Sources items> に渡せる）。
 * ここで定義し直すのは、scripts/mele-lock.ts の型チェック（tsconfig.node.json）が JSX を読まないようにするため。
 */
export type MeleSource = { label: string; url?: string; note?: string };

/** レッスンの参照。"olelo/lesson-02" の形（lessonPath から先頭の / を除いたもの） */
export type LessonRef = `${string}/lesson-${string}`;

export type MeleWord = {
  /** 歌詞に現れる形のまま（ʻokina・kahakō 付き、句読点は含めない） */
  w: string;
  /** 逐語の意味。文法上の働きがあれば「（所有 a）」のように添える */
  gloss: string;
  /** 用語集の id。あれば用語集へリンクする */
  term?: string;
};

export type MeleNote = {
  text: string;
  /** その規則を扱うレッスン */
  lesson?: LessonRef;
};

export type MeleLine = {
  /** 1行の歌詞。表示はこれを使い、words を並べたものと一致することを検査する */
  haw: string;
  words: MeleWord[];
  /** 行訳 */
  ja: string;
  /** 文法・語義のメモ */
  notes?: MeleNote[];
};

export type MeleStanza = {
  /** 「1」「hui」など。無ければ番号だけ出す */
  label?: string;
  lines: MeleLine[];
};

export type MeleBody = {
  stanzas: MeleStanza[];
  /** kaona（隠された意味）の解説。段落ごと */
  kaona: string[];
  /** この版が何に拠り、よく知られた版とどこが違うか */
  version: string;
  sources: MeleSource[];
};

export type MeleMeta = {
  id: string;
  title: string;
  composer: string;
  /** 「1893」「1893（新聞初出）」など */
  year: string;
  /** public: 全文を平文で公開 / locked: 本体を暗号化して置く */
  protection: "public" | "locked";
  /** 一覧に出す1〜2文 */
  summary: string;
  /** 成立の背景。段落ごと。保護曲でもここは公開する（歌詞を引かない） */
  background: string[];
  related: LessonRef[];
  /** ウクレレ教材の同じ曲のページ（サイト内のパス。例 /ukulele/songs/noho-paipai） */
  ukulele?: string;
  /**
   * Apple Music の埋め込み（docs/decisions/012）。url は music.apple.com の曲ページ（?i=<trackId> 付き）。
   * 埋め込みは embed.music.apple.com に置き換えて出す。note は誰の録音かの一言（画面に出す）
   */
  appleMusic?: { url: string; note: string };
};
