import { Instructor, Course } from './types';

// In-memory хранилище
let instructors: Instructor[] = [];
let courses: Course[] = [];

let nextId = 100;

function generateId(): string {
  return String(nextId++);
}

export function seedData() {
  console.log('=== seedData вызвана ===');
  console.log('Текущее количество преподавателей:', instructors.length);
  
  if (instructors.length > 0) {
    console.log('Данные уже инициализированы');
    return;
  }

  console.log('Инициализация данных...');
  
  const inst1 = { 
    id: 'inst-1', 
    name: 'Иван Петров', 
    email: 'ivan@example.com',
    description: 'Senior JavaScript разработчик с 5-летним опытом.',
    experienceYears: 5, 
    isActive: true, 
    createdAt: '2026-01-15T10:00:00.000Z' 
  };
  
  const inst2 = { 
    id: 'inst-2', 
    name: 'Анна Сидорова', 
    email: 'anna@example.com',
    description: 'Эксперт по базам данных и backend-разработке.',
    experienceYears: 10, 
    isActive: true, 
    createdAt: '2026-01-20T10:00:00.000Z' 
  };
  
  const inst3 = { 
    id: 'inst-3', 
    name: 'Дмитрий Иванов', 
    email: 'dmitry@example.com',
    description: 'Junior разработчик, начинающий преподаватель.',
    experienceYears: 3, 
    isActive: false, 
    createdAt: '2026-02-01T10:00:00.000Z' 
  };
  
  const inst4 = { 
    id: 'inst-4', 
    name: 'Елена Смирнова', 
    email: 'elena@example.com',
    description: 'TypeScript expert и архитектор приложений.',
    experienceYears: 8, 
    isActive: true, 
    createdAt: '2026-02-15T10:00:00.000Z' 
  };
  
  const inst5 = { 
    id: 'inst-5', 
    name: 'Сергей Козлов', 
    email: 'sergey@example.com',
    description: 'Ветеран индустрии с 15-летним опытом.',
    experienceYears: 15, 
    isActive: true, 
    createdAt: '2026-03-01T10:00:00.000Z' 
  };

  instructors = [inst1, inst2, inst3, inst4, inst5];

  courses = [
  // Курсы Ивана Петрова (inst-1)
  { 
    id: 'course-1', 
    title: 'Основы JavaScript', 
    description: 'Курс для начинающих по JavaScript с нуля. Изучите переменные, функции, циклы и основы работы с DOM.', 
    price: 5000, 
    instructorId: 'inst-1', 
    createdAt: '2026-01-20T10:00:00.000Z' 
  },
  { 
    id: 'course-2', 
    title: 'Продвинутый React', 
    description: 'Хуки, контекст и оптимизация React приложений. Глубокое погружение в экосистему React.', 
    price: 15000, 
    instructorId: 'inst-1', 
    createdAt: '2026-02-01T10:00:00.000Z' 
  },
  { 
    id: 'course-6', 
    title: 'Vue.js для начинающих', 
    description: 'Изучение Vue.js с нуля. Компоненты, директивы, Vuex и создание SPA приложений.', 
    price: 7000, 
    instructorId: 'inst-1', 
    createdAt: '2026-03-10T10:00:00.000Z' 
  },
  
  // Курсы Анны Сидоровой (inst-2)
  { 
    id: 'course-3', 
    title: 'Базы данных SQL', 
    description: 'Изучение PostgreSQL с нуля до продвинутого уровня. Запросы, индексы, транзакции.', 
    price: 8000, 
    instructorId: 'inst-2', 
    createdAt: '2026-02-10T10:00:00.000Z' 
  },
  { 
    id: 'course-7', 
    title: 'MongoDB и NoSQL', 
    description: 'Работа с документоориентированными базами данных. Проектирование схем и оптимизация.', 
    price: 9000, 
    instructorId: 'inst-2', 
    createdAt: '2026-03-15T10:00:00.000Z' 
  },
  { 
    id: 'course-8', 
    title: 'Redis и кэширование', 
    description: 'Использование Redis для кэширования, сессий и очередей сообщений.', 
    price: 6000, 
    instructorId: 'inst-2', 
    createdAt: '2026-04-01T10:00:00.000Z' 
  },
  
  // Курсы Дмитрия Иванова (inst-3)
  { 
    id: 'course-9', 
    title: 'HTML и CSS для начинающих', 
    description: 'Основы веб-разработки. Верстка сайтов, адаптивный дизайн, Flexbox и Grid.', 
    price: 3000, 
    instructorId: 'inst-3', 
    createdAt: '2026-02-15T10:00:00.000Z' 
  },
  { 
    id: 'course-10', 
    title: 'Git и GitHub', 
    description: 'Системы контроля версий. Ветвление, слияние, работа в команде и код-ревью.', 
    price: 2500, 
    instructorId: 'inst-3', 
    createdAt: '2026-03-01T10:00:00.000Z' 
  },
  
  // Курсы Елены Смирновой (inst-4)
  { 
    id: 'course-4', 
    title: 'TypeScript для профессионалов', 
    description: 'Типизация сложных приложений и лучшие практики. Дженерики, утилитарные типы.', 
    price: 12000, 
    instructorId: 'inst-4', 
    createdAt: '2026-02-20T10:00:00.000Z' 
  },
  { 
    id: 'course-11', 
    title: 'Архитектура приложений', 
    description: 'Паттерны проектирования, SOLID, микросервисы и масштабируемые системы.', 
    price: 18000, 
    instructorId: 'inst-4', 
    createdAt: '2026-03-20T10:00:00.000Z' 
  },
  { 
    id: 'course-12', 
    title: 'Тестирование JavaScript', 
    description: 'Unit-тесты, интеграционные тесты, Jest, React Testing Library и TDD подход.', 
    price: 10000, 
    instructorId: 'inst-4', 
    createdAt: '2026-04-05T10:00:00.000Z' 
  },
  
  // Курсы Сергея Козлова (inst-5)
  { 
    id: 'course-5', 
    title: 'Алгоритмы и структуры данных', 
    description: 'Подготовка к техническим собеседованиям. Сортировки, графы, динамическое программирование.', 
    price: 10000, 
    instructorId: 'inst-5', 
    createdAt: '2026-03-05T10:00:00.000Z' 
  },
  { 
    id: 'course-13', 
    title: 'Системный дизайн', 
    description: 'Проектирование высоконагруженных систем. Балансировка, шардинг, кэширование.', 
    price: 20000, 
    instructorId: 'inst-5', 
    createdAt: '2026-04-10T10:00:00.000Z' 
  },
  { 
    id: 'course-14', 
    title: 'Оптимизация производительности', 
    description: 'Профилирование, оптимизация алгоритмов и работа с большими данными.', 
    price: 14000, 
    instructorId: 'inst-5', 
    createdAt: '2026-04-15T10:00:00.000Z' 
  },
];
  
  console.log('Создано преподавателей:', instructors.length);
  console.log('Создано курсов:', courses.length);
  console.log('========================');
}

export const store = {
  getInstructors: () => instructors,
  addInstructor: (inst: Instructor) => instructors.push(inst),
  updateInstructor: (id: string, data: Partial<Instructor>) => {
    const idx = instructors.findIndex(i => i.id === id);
    if (idx !== -1) instructors[idx] = { ...instructors[idx], ...data };
  },
  deleteInstructor: (id: string) => {
    instructors = instructors.filter(i => i.id !== id);
    courses = courses.filter(c => c.instructorId !== id);
  },
  getInstructorById: (id: string) => instructors.find(i => i.id === id),
  getCourses: () => courses,
  addCourse: (course: Course) => courses.push(course),
  updateCourse: (id: string, data: Partial<Course>) => {
    const idx = courses.findIndex(c => c.id === id);
    if (idx !== -1) courses[idx] = { ...courses[idx], ...data };
  },
  deleteCourse: (id: string) => {
    courses = courses.filter(c => c.id !== id);
  },
  getCourseById: (id: string) => courses.find(c => c.id === id),
  generateId: generateId,
};