import { useEffect, useState } from "react";

/** 長いページで、スクロールしたら右下に出す「上へ戻る」。 */
export function BackToTop({ threshold = 600 }: { threshold?: number }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  if (!shown) return null;
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="ページの上へ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
