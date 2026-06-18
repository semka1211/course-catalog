import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  seedData();
  const { id } = await params;
  
  const instructor = store.getInstructorById(id);
  if (!instructor) {
    return NextResponse.json({ error: 'Преподаватель не найден' }, { status: 404 });
  }

  const courses = store.getCourses().filter(c => c.instructorId === id);
  return NextResponse.json({ ...instructor, courses });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  seedData();
  const { id } = await params;
  
  const instructor = store.getInstructorById(id);
  if (!instructor) {
    return NextResponse.json({ error: 'Преподаватель не найден' }, { status: 404 });
  }

  try {
    const body = await request.json();
    // ... остальной код PATCH
    store.updateInstructor(id, body);
    return NextResponse.json(store.getInstructorById(id));
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors?.[0]?.message || 'Ошибка валидации' }, 
      { status: 422 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  seedData(); // ← ОБЯЗАТЕЛЬНО!
  const { id } = await params;
  
  const instructor = store.getInstructorById(id);
  if (!instructor) {
    return NextResponse.json({ error: 'Преподаватель не найден' }, { status: 404 });
  }

  try {
    store.deleteInstructor(id); // ← Удаляем преподавателя и его курсы
    return NextResponse.json({ 
      message: 'Преподаватель и все его курсы удалены' 
    });
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления преподавателя' }, 
      { status: 500 }
    );
  }
}