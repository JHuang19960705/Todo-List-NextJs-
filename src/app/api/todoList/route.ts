import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM todoList ORDER BY due_date ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const due_date = data.get('due_date');

    if (typeof name !== 'string' || typeof due_date !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await pool.query('INSERT INTO todoList (name, due_date) VALUES (?, ?)', [name, due_date]);

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
