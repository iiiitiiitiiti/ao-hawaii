import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="notfound">
      <h1>ページが見つかりません</h1>
      <p>
        <Link to="/">講座一覧へ戻る</Link>
      </p>
    </main>
  );
}
