import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';

// GET /api/courses/search?q= - поиск курсов
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

  const data = store.getCourses().filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q)
  );

  return NextResponse.json({ 
    items: data, 
    total: data.length, 
    query: q 
  });
}