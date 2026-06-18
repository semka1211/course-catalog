import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';
import { courseSchema } from '@/lib/types';

export async function GET(request: NextRequest) {
  seedData();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const q = searchParams.get('q')?.toLowerCase() || '';
  const instructorId = searchParams.get('instructorId') || '';

  let data = store.getCourses();

  if (q) {
    data = data.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q)
    );
  }

  if (instructorId) {
    data = data.filter(c => c.instructorId === instructorId);
  }

  const total = data.length;
  const pages = Math.ceil(total / limit);
  const items = data.slice((page - 1) * limit, page * limit);

  return NextResponse.json({ items, total, page, pages });
}

export async function POST(request: NextRequest) {
  seedData();

  try {
    const body = await request.json();
    const validated = courseSchema.parse(body);

    const instructor = store.getInstructorById(validated.instructorId);
    if (!instructor) {
      return NextResponse.json(
        { error: 'Преподаватель не найден' }, 
        { status: 422 }
      );
    }

    const newCourse = {
      id: store.generateId(), // ← Используем новый генератор
      ...validated,
      createdAt: new Date().toISOString(),
    };

    store.addCourse(newCourse);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0].message }, 
        { status: 422 }
      );
    }
    return NextResponse.json(
      { error: 'Ошибка сервера' }, 
      { status: 500 }
    );
  }
}