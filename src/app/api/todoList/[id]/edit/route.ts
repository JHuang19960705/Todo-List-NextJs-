import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 從 params 直接取得 id
  const { id } = await params;
  const idNum = parseInt(id, 10);

  if (isNaN(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const data = await request.formData();
  const name = data.get('name');
  const due_date = data.get('due_date');
  const content = data.get('content');

  if (
    typeof name !== 'string' ||
    typeof due_date !== 'string' ||
    typeof content !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE todoList SET name = ?, due_date = ?, content = ? WHERE id = ?',
      [name, due_date, content, idNum]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    // 重新導向到首頁
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}