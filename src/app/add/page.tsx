import React from "react";
import Link from "next/link";

export default function AddArticlePage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>新增文章</h2>

      {/* 返回首頁 */}
      <Link href="/" style={{ display: "inline-block", marginBottom: 20, color: "blue" }}>
        ← 返回首頁
      </Link>

      <form method="POST" action="/api/todoList" encType="multipart/form-data" style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Type Todo Name..."
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="date"
          name="due_date"
          required
          style={{ marginRight: 8 }}
        />
        <textarea
          name="content"
          placeholder="輸入文章內容..."
          rows={6}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
