import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import keyInfo from "../src/content/mele-keyinfo.json";
import { MELE } from "../src/content/mele";
import { deriveKey, encryptJson, type KeyInfo } from "../src/mele/crypto";
import { getPublicBody } from "../src/mele/meleData";
import type { MeleBody } from "../src/mele/types";
import { LockedBody } from "../src/pages/MelePage";
import { AppRoutes } from "../src/routes";

function at(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

// 実在の歌詞は使わない（docs/decisions/008）
const DUMMY: MeleBody = {
  stanzas: [{ lines: [{ haw: "He mele hoʻāʻo kēia", words: [{ w: "He", gloss: "不定冠詞" }, { w: "mele", gloss: "歌" }, { w: "hoʻāʻo", gloss: "試す" }, { w: "kēia", gloss: "これ" }], ja: "これは試しの歌" }] }],
  kaona: [],
  version: "テスト用のダミー",
  sources: [{ label: "なし" }],
};

describe("メレのページ", () => {
  test("一覧に全曲が並び、曲ページへリンクする", () => {
    at("/mele");
    for (const m of MELE) {
      expect(screen.getByRole("link", { name: new RegExp(m.title) }).getAttribute("href")).toBe(`/mele/${m.id}`);
    }
  });

  test("曲が関連に挙げたレッスンからは、その曲へ戻れる", () => {
    for (const m of MELE) {
      for (const ref of m.related) {
        const { container, unmount } = at(`/${ref}`);
        const hrefs = [...container.querySelectorAll(".lesson__mele a")].map((a) => a.getAttribute("href"));
        expect(hrefs, ref).toContain(`/mele/${m.id}`);
        unmount();
      }
    }
    const { container } = at("/olelo/lesson-01");
    expect(container.querySelector(".lesson__mele")).toBeNull();
  });

  test("公開曲は全行が描画され、逐語の意味を畳める", () => {
    const { container } = at("/mele/kaulana-na-pua");
    const lines = getPublicBody("kaulana-na-pua")!.stanzas.flatMap((s) => s.lines);
    expect(container.querySelectorAll(".mele-line")).toHaveLength(lines.length);
    expect(container.querySelectorAll(".mele-word").length).toBe(lines.reduce((n, l) => n + l.words.length, 0));

    fireEvent.click(screen.getByLabelText("逐語の意味とメモを出す"));
    expect(container.querySelectorAll(".mele-word")).toHaveLength(0);
    expect(container.querySelectorAll(".mele-line__ja")).toHaveLength(lines.length);
  });

  test("逐語注の用語は用語集へ、文法メモはレッスンへリンクする", () => {
    const { container } = at("/mele/kaulana-na-pua");
    const hrefs = [...container.querySelectorAll(".mele-body a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/glossary#pua");
    expect(hrefs).toContain("/olelo/lesson-04");
  });

  test("用語集の逆引きに、その語が出てくる公開曲が出る", () => {
    const { container } = at("/glossary#pua");
    const hrefs = [...container.querySelectorAll("#pua .glossary__uses a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/mele/kaulana-na-pua");
  });

  test("目次に無い曲は 404", () => {
    at("/mele/no-such-song");
    expect(screen.getByRole("heading", { name: "ページが見つかりません" })).toBeInTheDocument();
  });

  test("トップとヘッダーから一覧へ行ける", () => {
    const { container } = at("/");
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs.filter((h) => h === "/mele").length).toBeGreaterThanOrEqual(2);
  });
});

describe("鍵付きの曲", () => {
  test("誤ったパスワードでは開かず、正しいパスワードで開く", async () => {
    // 本番と同じ salt・反復回数で、テスト用パスフレーズとダミー歌詞を暗号化する
    const envelope = await encryptJson(DUMMY, await deriveKey("test-only-passphrase", keyInfo as KeyInfo), "dummy");
    render(
      <MemoryRouter>
        <LockedBody id="dummy" envelope={envelope} />
      </MemoryRouter>,
    );

    const input = await screen.findByLabelText("パスワード");
    fireEvent.change(input, { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: "開く" }));
    expect(await screen.findByRole("alert", {}, { timeout: 10000 })).toHaveTextContent("パスワードが違います");
    expect(screen.queryByText("これは試しの歌")).toBeNull();

    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "test-only-passphrase" } });
    fireEvent.click(screen.getByRole("button", { name: "開く" }));
    await waitFor(() => expect(screen.getByText("これは試しの歌")).toBeInTheDocument(), { timeout: 10000 });
    // テスト環境には IndexedDB が無いので、覚えられない旨が出る
    expect(screen.getByText(/この端末では覚えられない/)).toBeInTheDocument();
  }, 30000);
});
