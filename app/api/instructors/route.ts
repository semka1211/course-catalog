import { NextRequest, NextResponse } from 'next/server';
import { store, seedData } from '@/lib/store';
import { instructorSchema } from '@/lib/types';

export async function GET(request: NextRequest) {
  seedData(); // ← ОБЯЗАТЕЛЬНО!
  console.log('GET /api/instructors вызван');
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const q = searchParams.get('q')?.toLowerCase() || '';

  let data = store.getInstructors();
  console.log('Всего преподавателей:', data.length);

  if (q) {
    data = data.filter(i => 
      i.name.toLowerCase().includes(q) || 
      i.email.toLowerCase().includes(q)
    );
  }

  const total = data.length;
  const pages = Math.ceil(total / limit);
  const items = data.slice((page - 1) * limit, page * limit);

  return NextResponse.json({ items, total, page, pages });
}

export async function POST(request: NextRequest) {
  seedData(); // ← И здесь!
  
  try {
    const body = await request.json();
    const validated = instructorSchema.parse(body);

    const exists = store.getInstructors().some(i => i.email === validated.email);
    if (exists) {
      return NextResponse.json(
        { error: 'Преподаватель с таким email уже существует' }, 
        { status: 422 }
      );
    }

const newInstructor = {
  id: store.generateId(),
  name: validated.name,
  email: validated.email,
  description: validated.description || '',
  experienceYears: validated.experienceYears,
  isActive: validated.isActive ?? true,
  createdAt: new Date().toISOString(),
};

    store.addInstructor(newInstructor);
    return NextResponse.json(newInstructor, { status: 201 });
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