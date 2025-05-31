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
      <h2>ジョシュの台湾案内</h2>

      <Link href="/add">新建文章</Link>

      <div>
        {todos.map((todo) => (
          <article
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
              <h3>{todo.name}</h3>
              <time
                dateTime={todo.due_date}
                style={{ fontSize: 12, color: "#666" }}
              >
                {todo.due_date}
              </time>
            </div>

            <div>
              <Link
                href={`/todoList/${todo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: 8,
                  color: "green",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                閲覧
              </Link>
              <Link
                href={`/todoList/${todo.id}/edit`}
                style={{
                  marginRight: 8,
                  color: "blue",
                  textDecoration: "none",
                }}
              >
                編集
              </Link>

              <DeleteForm todoId={todo.id} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
