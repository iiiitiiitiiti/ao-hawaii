import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { GLOSSARY } from "../src/content/glossary";
import { lessonsUsingTerm } from "../src/lesson/lessonModules";
import { AppRoutes } from "../src/routes";

const ROOT = process.cwd();

/** 原文から数えた (用語 id → それを <Terms> に載せるレッスン) の対応。逆引きの正解として使う */
function usageFromSource(): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  for (const course of readdirSync(path.join(ROOT, "content"))) {
    if (course === "pages" || course === "mele") continue;
    for (const file of readdirSync(path.join(ROOT, "content", course))) {
      const m = /^lesson-(\d{2})\.mdx$/.exec(file);
      if (!m) continue;
      const text = readFileSync(path.join(ROOT, "content", course, file), "utf8");
      for (const t of text.matchAll(/<Terms\s[^>]*?ids=\{\[([^\]]*)\]\}/g)) {
        for (const id of t[1].matchAll(/"([^"]+)"/g)) {
          if (!out.has(id[1])) out.set(id[1], new Set());
          out.get(id[1])!.add(`${course}/${Number(m[1])}`);
        }
      }
    }
  }
  return out;
}

describe("用語の逆引き", () => {
  test("全用語について、逆引きのレッスンが原文の <Terms> と一致する", () => {
    const expected = usageFromSource();
    for (const t of GLOSSARY) {
      const got = new Set(lessonsUsingTerm(t.id).map((u) => `${u.courseSlug}/${u.number}`));
      expect([...got].sort(), t.id).toEqual([...(expected.get(t.id) ?? [])].sort());
    }
  });

  test("用語ボックスの語は用語集のその語へのリンクになる", () => {
    render(
      <MemoryRouter initialEntries={["/hula/lesson-04"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const link = screen.getAllByRole("link", { name: "kaona" }).find((a) => a.classList.contains("terms__link"));
    expect(link?.getAttribute("href")).toBe("/glossary#kaona");
  });

  test("用語集に #id で来ると、その語が強調され、出てくるレッスンへのリンクが出る", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/glossary#kaona"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const item = container.querySelector("#kaona");
    expect(item?.classList.contains("is-target")).toBe(true);
    const hrefs = [...(item?.querySelectorAll(".glossary__uses a") ?? [])].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/hula/lesson-04");
    expect(container.querySelectorAll(".is-target")).toHaveLength(1);
  });
});
