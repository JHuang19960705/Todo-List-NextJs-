import { headers } from "next/headers";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Todo = {
  id: number;
  name: string;
  due_date: string;
  content: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.BASE_URL ?? "localhost:3000"; // 環境變數優先，否則 fallback

  const res = await fetch(`${protocol}://${host}/api/todoList/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "文章不存在 - ジョシュの台湾案内",
      description: "很抱歉，我們找不到這篇文章。",
    };
  }

  const todo: Todo = await res.json();

  return {
    title: `${todo.name} - ジョシュの台湾案内`,
    description: todo.content.slice(0, 80),
  };
}

export default async function TodoDetailPage({ params }: Props) {
  // 等待 params Promise 解析
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/todoList/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const todo: Todo = await res.json();

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: 20,
          color: "blue",
          fontSize: 16,
        }}
      >
        ← ホームに戻る
      </Link>
      <h1>{todo.name}</h1>
      <div>
        <strong>日付：</strong> {todo.due_date}
      </div>
      <div>
        <strong>內容：</strong>
        <p style={{ whiteSpace: "pre-wrap" }}>{todo.content}</p>
      </div>
    </main>
  );
}
