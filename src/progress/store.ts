const STORAGE_KEY = "ao-hawaii:progress:v1";

export type ProgressState = {
  completedLessonIds: string[];
  lastLessonId: string | null;
};

export const EMPTY: ProgressState = { completedLessonIds: [], lastLessonId: null };

export function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds.filter((x) => typeof x === "string") : [],
      lastLessonId: typeof parsed.lastLessonId === "string" ? parsed.lastLessonId : null,
    };
  } catch {
    // 壊れた記録は捨てる。学習の進み具合は本文を読めば取り戻せる
    return EMPTY;
  }
}

export function save(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // プライベートモード等で書けないときは黙って諦める
  }
}

export function toggle(state: ProgressState, lessonId: string): ProgressState {
  const has = state.completedLessonIds.includes(lessonId);
  return {
    completedLessonIds: has ? state.completedLessonIds.filter((id) => id !== lessonId) : [...state.completedLessonIds, lessonId],
    lastLessonId: lessonId,
  };
}

export function visit(state: ProgressState, lessonId: string): ProgressState {
  return state.lastLessonId === lessonId ? state : { ...state, lastLessonId: lessonId };
}
