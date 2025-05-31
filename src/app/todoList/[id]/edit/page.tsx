import { headers } from "next/headers";
import React from "react";
import Link from "next/link";

type Todo = {
  id: number;
  name: string;
  due_date: string;
  content: string;
};

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/todoList/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch 代辦失敗：${res.status} ${text}`);
  }

  const todo: Todo = await res.json();

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>編輯代辦事項</h1>

      <Link href="/" style={{ display: "inline-block", marginBottom: 20, color: "blue" }}>
        ← 返回首頁
      </Link>

      <form method="POST" action={`/api/todoList/${id}/edit`}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">名稱：</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={todo.name}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="due_date">到期日：</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            defaultValue={todo.due_date}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="content">內容：</label>
          <textarea
            id="content"
            name="content"
            defaultValue={todo.content}
            required
            rows={6}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          更新
        </button>
      </form>
    </main>
  );
}
