// src/app/todoList/[id]/page.tsx

import { headers } from "next/headers";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Todo 型別定義
type Todo = {
  id: number;
  name: string;
  due_date: string;
  content: string;
};

// props 型別：把 params 改成同步的 { id: string }
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  // fetch 用的 host：開發時用 localhost:3000，生產時使用環境變數 BASE_URL
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.BASE_URL ?? "localhost:3000";

  try {
    const res = await fetch(`${protocol}://${host}/api/todoList/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // 若 API 回 404 或其他錯誤，就回傳「文章不存在」的 metadata
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
  } catch (e) {
    // fetch 過程若有例外，回傳一組錯誤時的 metadata
    return {
      title: "エラーが発生しました",
      description: "メタデータの取得中にエラーが発生しました。",
    };
  }
}

export default async function TodoDetailPage({ params }: Props) {
  const { id } = params;

  // 因為這是 Server Component，可以用 headers() 拿到 host
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // 從 API 讀取單筆 todo
  const res = await fetch(`${protocol}://${host}/api/todoList/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // 若 API 回錯誤，就導向 404
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
