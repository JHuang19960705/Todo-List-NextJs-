import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  // 從 request.nextUrl 拿 id
  const idStr = request.nextUrl.pathname.split('/').pop();
  const idNum = idStr ? parseInt(idStr, 10) : NaN;

  if (isNaN(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM todoList WHERE id = ?',
      [idNum]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.redirect(new URL('/', request.url));
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
