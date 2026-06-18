import { NextResponse } from 'next/server';
import { seedData } from '@/lib/store';

export async function GET() {
  seedData(); // Инициализируем тестовые данные
  return NextResponse.json({ message: 'Data initialized' });
}