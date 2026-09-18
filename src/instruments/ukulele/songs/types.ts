import type { StrumStyle } from "../performance";

/**
 * 楽譜ライブラリの曲データの型。
 *
 * 掲載できるのは日本と米国の両方で保護期間が満了した曲だけ（DDR 004）。判定に必要な
 * 記録を必須フィールドとして持たせ、欠けたらテストでビルドを落とす。仕様 §6 の
 * 「権利情報のビルド時強制」を型で表したもの。
 */

export type SongAuthorRole = "lyrics" | "music" | "both";

export type SongAuthor = {
  name: string;
  role: SongAuthorRole;
  /**
   * 没年。伝承曲・作者不詳は "traditional"。
   *
   * 分かっている作者は全員書く。1人でも没年を追えない曲は掲載しない。
   * 作曲者だけを見て判断すると、作詞者が保護期間中の曲を通してしまう。
   */
  died: number | "traditional";
};

/**
 * 公開曲（平文で載せる曲）の権利記録。DDR 004 の条件を満たすことをテストが検査する。
 */
export type PublicDomainLicensing = {
  status: "public-domain";
  /** 分かっている作者を全員。 */
  authors: SongAuthor[];
  /**
   * 確認できた最も古い出版年。伝承曲で特定できない場合は "traditional"。
   *
   * 「初出版年」ではなく「確認できた最古」にしているのは、これより古い出版が
   * ありうるため。米国側の判定（1929年より前の出版）には確認できた年で足りる。
   */
  earliestPublication: number | "traditional";
  /** earliestPublication が "traditional" のときの、米国側の根拠。 */
  usBasis?: string;
  /** 検証した日。 */
  verifiedOn: string;
  /** 出典。1件以上。機関の記録を優先する。 */
  sources: string[];
  /** 判定に残る疑義。docs/songs-licensing.md にも同じことを書く。 */
  caveat?: string;
};

/**
 * 鍵付きの曲（保護期間中）の記録（DDR 021）。本体は暗号化して置くので、PD 判定の項目は持たない。
 * 代わりに「なぜ保護期間中と判断したか」と「平文の出どころ」を必ず書く。
 */
export type ProtectedLicensing = {
  status: "protected";
  /** 分かっている作者。没年は分からなければ書かない。 */
  authors: { name: string; role: SongAuthorRole; died?: number }[];
  /** 保護期間中と判断した理由。docs/songs-licensing.md の節にも同じことを書く。 */
  reason: string;
  /** 平文の出どころ（持ち主が所有する歌詞カード・曲集）。 */
  transcribedFrom: string;
  verifiedOn: string;
  sources: string[];
};

export type SongLicensing = PublicDomainLicensing | ProtectedLicensing;

/**
 * 曲の本体。鍵付きの曲では、これを暗号化して songs/locked/<id>.json に置く。
 * 公開曲では Song の同名フィールドに平文で持つ。
 */
export type SongBody = {
  sheet: string;
  /**
   * お手本の再生。公開曲では sheet を持つ曲に必須（tests/ukulele/songs.test.ts）。
   * 鍵付きの曲は、五線譜の出どころが無ければ省ける（DDR 022）。省くときは noPerformance が必須。
   */
  performance?: SongPerformance;
  /** お手本を置かない理由。譜面の下に出る。performance が無いときだけ持つ。 */
  noPerformance?: string;
  meaning: SongMeaningLine[];
  /** 鍵付きの曲で performance を持つなら必須（小節ごとのコードの検査を本体だけで完結させるため）。 */
  progression?: string[];
  arrangement?: string;
};

/**
 * お手本の再生に使うデータ（DDR 017）。
 *
 * 歌詞コード譜の記法には拍の長さが無いので、メロディ・コード・歌詞の音節を ABC 記法で別に持つ。
 * 譜面と食い違わないよう、歌詞の綴り・コードの並び・コードの位置をテストで突き合わせる。
 */
export type SongPerformance = {
  /** ABC 記法のサブセット（src/core/music/abc.ts）。歌詞は sheet と同じ綴りで書く。 */
  abc: string;
  /** 最初に表示するテンポ。2/4 の曲は音価を倍にして書くので、倍にした後の4分音符の速さ。 */
  bpm: number;
  strum: StrumStyle;
  /** 再生で原譜と変えた点（フェルマータを伸ばさない等）。再生の操作の下に出る。 */
  note?: string;
};

/**
 * 歌詞の1行と、その日本語の意味（DDR 020）。
 *
 * `line` は歌詞コード譜の歌詞行そのもの（コードを外して塊の文字を連ねたもの）。
 * 添字だけで対応させると、歌詞に行を足したときに行数が一致したままずれるので、行の文字列も持って照合する。
 */
export type SongMeaningLine = {
  line: string;
  meaning: string;
};

export type SongRecording = {
  /** 演奏者・年など、リンク先が何か分かる一言。 */
  label: string;
  url: string;
  /** Apple Music などの埋め込み用 URL。あれば iframe で出し、無ければリンクだけ。 */
  embedUrl?: string;
};

export type Song = {
  id: string;
  title: string;
  /** ハワイ語などの原題が別にある場合。 */
  altTitle?: string;
  /**
   * 使うコード。名前順で持つ。
   *
   * 鍵付きの曲でも公開する（「弾ける曲だけ」「コード数」の絞り込みに要る）。コード名の集合は
   * 編曲にも歌詞にも当たらない。本体のコードの集合と一致することは song:lock が検査する。
   */
  chords: string[];
  /**
   * 1小節ずつのコード。長さが小節数になる。
   *
   * 原譜を出典に、小節への割り振りはこの教材が決める。Web のコード譜は他人の編曲なので
   * 写さない。画面には「この教材の進行」と明記する。
   */
  progression?: string[];
  /** 歌詞コード譜（SongSheet の記法）。歌詞を裏取りできた曲だけ持つ。 */
  sheet?: string;
  /**
   * 譜面の出どころと、初心者向けに変えた点。
   *
   * 原典のコードを外したり置き換えたりした場合は、ここに必ず書く。書かないと、
   * 簡略化したコードを原曲どおりだと読み手が受け取ってしまう。
   */
  arrangement?: string;
  /** お手本の再生。sheet を持つ曲だけが持つ。 */
  performance?: SongPerformance;
  /** 歌詞の意味。歌詞コード譜の歌詞行（空行を除く）と同じ数・同じ順で持つ。 */
  meaning?: SongMeaningLine[];
  /** この教材の課題曲なら、そのレッスン ID。 */
  lessonId?: string;
  /**
   * 参考の録音（外部サイトへのリンク）。曲ページに「参考の録音」として出す。
   * お手本の再生を持たない曲で、演奏を聴ける場所を示すために使う（DDR 022）。歌詞や編曲を含まないので鍵付きの曲でも公開する。
   */
  recordings?: SongRecording[];
  licensing: SongLicensing;
  /** 1〜2文の紹介。 */
  note?: string;
};
