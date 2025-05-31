import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

type Todo = RowDataPacket & {
  id: number;
  name: string;
  due_date: string;
};

export async function GET(request: NextRequest) {
  // 直接從 URL 路徑取得 id
  const idStr = request.nextUrl.pathname.split('/').pop();
  const idNum = idStr ? parseInt(idStr, 10) : NaN;

  if (isNaN(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<Todo[]>(
      'SELECT * FROM todoList WHERE id = ?',
      [idNum]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
