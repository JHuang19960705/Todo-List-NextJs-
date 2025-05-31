import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const idNum = parseInt(params.id, 10);
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
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.redirect(new URL('/', request.url));
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
