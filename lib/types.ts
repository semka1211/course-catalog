import { z } from 'zod';

// Интерфейс преподавателя
export interface Instructor {
  id: string;
  name: string; // обязательное
  email: string; // обязательное, уникальное
  description: string; // описание/биография
  experienceYears: number; // обязательное
  isActive: boolean; // опциональное
  createdAt: string; // дата создания
}

// Интерфейс курса
export interface Course {
  id: string;
  title: string; // обязательное
  description: string; // обязательное
  price: number; // обязательное
  instructorId: string; // ссылка на преподавателя, обязательное
  createdAt: string; // дата создания
}

// валидация для преподавателя
export const instructorSchema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  email: z.string().email('Некорректный email'),
  description: z.string().min(10, 'Описание должно быть не менее 10 символов').optional().or(z.literal('')),
  experienceYears: z.number().min(0, 'Опыт не может быть отрицательным'),
  isActive: z.boolean().optional(),
});

// валидация для курса
export const courseSchema = z.object({
  title: z.string().min(3, 'Название должно быть не менее 3 символов'),
  description: z.string().min(10, 'Описание должно быть не менее 10 символов'),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  instructorId: z.string().min(1, 'Выберите преподавателя'),
});