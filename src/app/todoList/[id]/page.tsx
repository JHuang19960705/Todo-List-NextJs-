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
  params: { id: string }; // 改成非 Promise 型別
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.BASE_URL ?? "localhost:3000";

  try {
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
  } catch {
    return {
      title: "エラーが発生しました",
      description: "メタデータの取得中にエラーが発生しました。",
    };
  }
}

export default async function TodoDetailPage({ params }: Props) {
  const { id } = params;

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
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
