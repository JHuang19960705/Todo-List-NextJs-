import { headers } from "next/headers";
import Link from "next/link";

type Todo = {
  id: number;
  name: string;
  due_date: string;
  content: string; // 新增這行
};

type Props = {
  params: { id: string };
};

export default async function TodoDetailPage({ params }: Props) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/todoList/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch 代辦細節失敗：${res.status} ${text}`);
  }

  const todo: Todo = await res.json();

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>代辦詳情</h1>
      {/* 返回首頁 */}
      <Link
        href="/"
        style={{ display: "inline-block", marginBottom: 20, color: "blue" }}
      >
        ← 返回首頁
      </Link>
      <div>
        <strong>名稱：</strong> {todo.name}
      </div>
      <div>
        <strong>截止日期：</strong> {todo.due_date}
      </div>
      <div>
        <strong>內容：</strong>
        <p style={{ whiteSpace: "pre-wrap" }}>{todo.content}</p>
      </div>
    </main>
  );
}
