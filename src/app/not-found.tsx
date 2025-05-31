import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        404 - ページが見つかりません
      </h1>
      <p style={{ marginBottom: "2rem" }}>
        URLが間違っているか、ページが削除された可能性があります。
      </p>
      <Link
        href="/"
        style={{
          color: "white",
          backgroundColor: "#0070f3",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        ← ホームに戻る
      </Link>
    </main>
  );
}
