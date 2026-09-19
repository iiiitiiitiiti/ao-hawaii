import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

/** 全ページ共通の枠。ヘッダー・ナビ・フッター。 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="shell__header">
        <Link className="brand" to="/">
          <span className="brand__name" lang="haw">
            Aʻo Hawaiʻi
          </span>
          <span className="brand__sub">ハワイを学ぶ講座</span>
        </Link>
        <nav className="shell__nav" aria-label="サイト内">
          <NavLink to="/">講座</NavLink>
          <NavLink to="/mele">メレを読む</NavLink>
          <NavLink to="/ukulele">ウクレレ</NavLink>
          <NavLink to="/glossary">用語集</NavLink>
          <NavLink to="/timeline">年表</NavLink>
          <NavLink to="/notation">表記について</NavLink>
        </nav>
      </header>
      {children}
      <footer className="shell__footer">
        <p>
          自分用の学習サイト。本文は出典に当たって書いていますが、誤りがあれば出典を優先してください。
          図版の出典は <Link to="/credits">画像の出典</Link> に一覧があります。
        </p>
      </footer>
    </div>
  );
}
