import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';

// GET /api/instructors/search?q= - поиск преподавателей
export async function GET(request: NextRequest) {
  seedData();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return NextResponse.json(
      { error: 'Параметр q обязателен для поиска' }, 
      { status: 400 }
    );
  }

  const data = store.getInstructors().filter(i => 
    i.name.toLowerCase().includes(q) || 
    i.email.toLowerCase().includes(q)
  );

  return NextResponse.json({ 
    items: data, 
    total: data.length, 
    query: q 
  });
}