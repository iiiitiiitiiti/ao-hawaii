import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { AppRoutes } from "../src/routes";

function at(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("ルーティング", () => {
  test("トップに全講座が並ぶ", () => {
    at("/");
    expect(screen.getByRole("heading", { name: "Hula" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ʻŌlelo Hawaiʻi" })).toBeInTheDocument();
  });

  test("講座ページが開く", () => {
    at("/hula");
    expect(screen.getByRole("heading", { level: 1, name: "Hula" })).toBeInTheDocument();
  });

  test("存在しない講座は 404", () => {
    at("/nope");
    expect(screen.getByRole("heading", { name: "ページが見つかりません" })).toBeInTheDocument();
  });

  test("表記ページが開く", () => {
    at("/notation");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("表記について");
  });
});
