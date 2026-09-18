/** スマホ幅かどうか。テスト（jsdom）や SSR では matchMedia が無いので false。 */
export const NARROW_QUERY = "(max-width: 480px)";

export function isNarrowScreen(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(NARROW_QUERY).matches;
}
