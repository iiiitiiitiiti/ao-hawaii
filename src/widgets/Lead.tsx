import type { ReactNode } from "react";

/** レッスン冒頭のリード文。本文より少し大きく組む。 */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="lead">{children}</p>;
}
