import React from "react";
import { headers } from "next/headers";
import DeleteForm from "./deletForm";
import Link from "next/link";

type Todo = {
  id: number;
  name: string;
  due_date: string;
};

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/todoList`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch 代辦失敗：${res.status} ${text}`);
  }

  const todos: Todo[] = await res.json();

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>我的代辦清單</h1>

      <Link href="/add">新增文章</Link>

      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <div>
              <div>{todo.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{todo.due_date}</div>
            </div>

            <div>
              <a
                href={`/todoList/${todo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: 8,
                  textDecoration: "none",
                  color: "green",
                  cursor: "pointer",
                }}
              >
                瀏覽
              </a>
              <a
                href={`/todoList/${todo.id}/edit`}
                style={{
                  marginRight: 8,
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                編輯
              </a>

              <DeleteForm todoId={todo.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
