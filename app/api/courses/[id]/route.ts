import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';  // ← Тоже добавьте seedData!
import { courseSchema } from '@/lib/types';
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  seedData();
  const { id } = await params;
  
  const course = store.getCourseById(id);
  if (!course) {
    return NextResponse.json({ error: 'Курс не найден' }, { status: 404 });
  }

  const instructor = store.getInstructorById(course.instructorId);
  return NextResponse.json({ ...course, instructor });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  seedData();
  const { id } = await params;
  
  const course = store.getCourseById(id);
  if (!course) {
    return NextResponse.json({ error: 'Курс не найден' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const validated = courseSchema.partial().parse(body);
    
    if (validated.instructorId && validated.instructorId !== course.instructorId) {
      const instructor = store.getInstructorById(validated.instructorId);
      if (!instructor) {
        return NextResponse.json(
          { error: 'Преподаватель не найден' }, 
          { status: 422 }
        );
      }
    }
    
    store.updateCourse(id, validated);
    return NextResponse.json(store.getCourseById(id));
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
  seedData();
  const { id } = await params;
  
  const course = store.getCourseById(id);
  if (!course) {
    return NextResponse.json({ error: 'Курс не найден' }, { status: 404 });
  }

  store.deleteCourse(id);
  return NextResponse.json({ message: 'Курс удален' });
}