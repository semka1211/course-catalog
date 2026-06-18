import { store, seedData } from './store';
import { Instructor, Course } from './types';

// Серверная функция для получения преподавателя по ID
export async function getInstructorByIdServer(id: string): Promise<Instructor & { courses: Course[] }> {
  seedData(); // Инициализируем данные
  
  const instructor = store.getInstructorById(id);
  if (!instructor) {
    throw new Error('Преподаватель не найден');
  }

  const courses = store.getCourses().filter(c => c.instructorId === id);
  return { ...instructor, courses };
}

// Серверная функция для получения курса по ID
export async function getCourseByIdServer(id: string): Promise<Course & { instructor: Instructor }> {
  seedData(); // Инициализируем данные
  
  const course = store.getCourseById(id);
  if (!course) {
    throw new Error('Курс не найден');
  }

  const instructor = store.getInstructorById(course.instructorId);
  if (!instructor) {
    throw new Error('Преподаватель курса не найден');
  }

  return { ...course, instructor };
}