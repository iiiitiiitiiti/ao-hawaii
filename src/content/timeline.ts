/**
 * 年表。歴史講座とフラ講座の年代を横断して並べる。
 * 年代に諸説あるものは year に "c." を含めず、note に諸説を書く。
 */
export type TimelineEvent = {
  year: string;
  title: string;
  note?: string;
  /** どの講座に詳しいか */
  course?: "moaukala" | "hula" | "olelo" | "aina" | "mea-ola" | "moolelo";
};

export const TIMELINE: TimelineEvent[] = [];
