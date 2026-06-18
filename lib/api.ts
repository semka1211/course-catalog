import { Instructor, Course } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Тип для ответа с пагинацией
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

// ===== ПРЕПОДАВАТЕЛИ =====

export async function getInstructors(
  page = 1, 
  limit = 5, 
  q = ''
): Promise<PaginatedResponse<Instructor>> {
  const res = await fetch(
    `${API_URL}/api/instructors?page=${page}&limit=${limit}&q=${q}`, 
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Ошибка загрузки преподавателей');
  return res.json();
}

export async function getInstructorById(id: string): Promise<Instructor & { courses: Course[] }> {
  const res = await fetch(`${API_URL}/api/instructors/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Преподаватель не найден');
  return res.json();
}

export async function createInstructor(data: Partial<Instructor>): Promise<Instructor> {
  const res = await fetch(`${API_URL}/api/instructors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Ошибка создания преподавателя');
  }
  return res.json();
}

export async function updateInstructor(id: string, data: Partial<Instructor>): Promise<Instructor> {
  const res = await fetch(`${API_URL}/api/instructors/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Ошибка обновления преподавателя');
  }
  return res.json();
}

export async function deleteInstructor(id: string): Promise<void> {
  const res = await fetch(`/api/instructors/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Ошибка удаления преподавателя');
  }
}
// ===== КУРСЫ =====

export async function getCourses(
  page = 1, 
  limit = 5, 
  q = '',
  instructorId = ''
): Promise<PaginatedResponse<Course>> {
  const res = await fetch(
    `${API_URL}/api/courses?page=${page}&limit=${limit}&q=${q}&instructorId=${instructorId}`, 
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Ошибка загрузки курсов');
  return res.json();
}

export async function getCourseById(id: string): Promise<Course & { instructor: Instructor }> {
  const res = await fetch(`${API_URL}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Курс не найден');
  return res.json();
}

export async function createCourse(data: Partial<Course>): Promise<Course> {
  const res = await fetch(`${API_URL}/api/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Ошибка создания курса');
  }
  return res.json();
}

export async function updateCourse(id: string, data: Partial<Course>): Promise<Course> {
  const res = await fetch(`${API_URL}/api/courses/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Ошибка обновления курса');
  }
  return res.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/courses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Ошибка удаления курса');
}