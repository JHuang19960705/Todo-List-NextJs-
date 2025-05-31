import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

type Todo = {
  id: number;
  name: string;
  due_date: string;
  content: string;
};

// 只動態載入 Client Component 包裝器，不直接使用 ssr: false 的動態載入
const EditorWrapper = dynamic(() => import("../../../../components/EditorWithPreview"));

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 等待 params Promise 解包

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
      <Link href="/" style={{ display: "inline-block", marginBottom: 20, color: "blue", fontSize: 16 }}>
        ← ホームに戻る
      </Link>
      <h1>記事編集</h1>
      <form method="POST" action={`/api/todoList/${id}/edit`}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">タイトル：</label>
          <input type="text" id="name" name="name" defaultValue={todo.name} required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="due_date">日付：</label>
          <input type="date" id="due_date" name="due_date" defaultValue={todo.due_date} required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="content">內容：</label>
          <EditorWrapper initialContent={todo.content} />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          改訂
        </button>
      </form>
    </main>
  );
}

