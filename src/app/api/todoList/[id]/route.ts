import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

type Todo = RowDataPacket & {
  id: number;
  name: string;
  due_date: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const idNum = parseInt(params.id, 10);
  if (isNaN(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<Todo[]>('SELECT * FROM todoList WHERE id = ?', [idNum]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
