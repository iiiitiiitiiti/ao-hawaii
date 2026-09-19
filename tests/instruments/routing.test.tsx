import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";
import { AppRoutes } from "../src/routes";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("ルーティング", () => {
  beforeEach(() => localStorage.clear());

  test("トップに楽器の一覧が出る", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: /ウクレレ/ })).toBeInTheDocument();
  });

  test("コース概要にレッスンが15本並ぶ", () => {
    renderAt("/ukulele");
    expect(screen.getAllByRole("link", { name: /Lesson \d\d/ })).toHaveLength(15);
  });

  test("コース概要に Coming Soon のステージが出る", () => {
    renderAt("/ukulele");
    expect(screen.getByText(/人と合わせる/)).toBeInTheDocument();
    expect(screen.getByText(/準備中/)).toBeInTheDocument();
  });

  test("レッスンページに本文と到達点が出る", () => {
    renderAt("/ukulele/lesson-01");
    expect(screen.getByRole("heading", { name: /Lesson 01/ })).toBeInTheDocument();
    expect(screen.getByText(/構えが安定し、音が出る/)).toBeInTheDocument();
  });

  test("存在しない楽器は 404 になる", () => {
    renderAt("/trumpet");
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument();
  });

  test("存在しないレッスン番号は 404 になる", () => {
    renderAt("/ukulele/lesson-99");
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument();
  });

  /*
   * /ukulele/songs は :lessonSlug にも当たる形をしている。静的セグメントが
   * 優先されないと LessonPage 側へ流れて 404 になる。
   */
  test("楽譜ライブラリの一覧が出る（レッスンページに流れない）", () => {
    renderAt("/ukulele/songs");
    expect(screen.getByRole("heading", { name: /楽譜ライブラリ/ })).toBeInTheDocument();
    expect(screen.queryByText(/ページが見つかりません/)).not.toBeInTheDocument();
  });

  test("個別の曲ページが出る", () => {
    renderAt("/ukulele/songs/saints");
    expect(screen.getByRole("heading", { name: /聖者の行進/ })).toBeInTheDocument();
  });

  test("鍵付きの曲のページにはパスワード入力と参考の録音が出る", async () => {
    renderAt("/ukulele/songs/noho-paipai");
    expect(screen.getByRole("heading", { name: /Noho Paipai/ })).toBeInTheDocument();
    // 覚えている鍵の確認が終わってから入力欄が出る
    expect(await screen.findByLabelText(/パスワード/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /参考の録音/ })).toBeInTheDocument();
    expect(screen.getByTitle(/Wailau and Lopaka Ryder/)).toHaveAttribute("src", expect.stringContaining("embed.music.apple.com"));
    expect(screen.getByRole("link", { name: /Almeida 自身の録音/ })).toHaveAttribute("href", expect.stringContaining("music.apple.com"));
  });

  test("存在しない曲は 404 になる", () => {
    renderAt("/ukulele/songs/nope");
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument();
  });

  test("ライブラリを持たない楽器の /songs は 404 になる", () => {
    renderAt("/trumpet/songs");
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument();
  });
});
