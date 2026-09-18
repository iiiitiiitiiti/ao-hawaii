import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

type Heading = { id: string; text: string };

/**
 * レッスン本文の h2 から目次を作り、リード文の直後に差し込む。
 * MDX の見出しには id が無いので、ここで sec-N を付ける。本文（bodyRef）が描画されたあとに集める。
 */
export function LessonToc({ bodyRef }: { bodyRef: RefObject<HTMLDivElement | null> }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const list = [...root.querySelectorAll("h2")].map((h, i) => {
      if (!h.id) h.id = `sec-${i + 1}`;
      return { id: h.id, text: h.textContent ?? "" };
    });
    setHeadings(list);

    // 差し込み先: リード文の直後（無ければ本文の先頭）
    const holder = document.createElement("div");
    holder.className = "lesson__toc-slot";
    const lead = root.querySelector(":scope > .lead");
    if (lead) lead.after(holder);
    else root.prepend(holder);
    setSlot(holder);
    return () => {
      holder.remove();
      setSlot(null);
    };
  }, [bodyRef]);

  if (!slot || headings.length < 2) return null;
  return createPortal(
    <nav className="lesson__toc" aria-label="このレッスンの目次">
      <p className="lesson__toc-title">目次</p>
      <ol className="lesson__toc-list">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>,
    slot,
  );
}
