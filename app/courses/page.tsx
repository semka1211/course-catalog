'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourses, deleteCourse, getInstructors } from '@/lib/api';
import { Course, Instructor } from '@/lib/types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCourses(page, 5, debouncedSearch, instructorFilter);
      setCourses(data.items);
      setTotalPages(data.pages);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstructors(1, 100).then(data => {
      setInstructors(data.items);
    });
  }, []);

  useEffect(() => {
    loadCourses();
  }, [page, debouncedSearch, instructorFilter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Вы уверены, что хотите удалить курс "${title}"?`)) {
      return;
    }

    try {
      await deleteCourse(id);
      loadCourses();
    } catch (e: any) {
      alert('Ошибка удаления: ' + e.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Курсы</h1>
          <p className="text-gray-600">Управление учебными программами</p>
        </div>
        <Link 
          href="/courses/new" 
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-lg font-medium flex items-center gap-2"
        >
          <span>+</span>
          Добавить курс
        </Link>
      </div>

      {/* Фильтры */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Поиск
            </label>
<input
  type="text"
  placeholder="Поиск по названию или описанию..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👨‍🏫 Фильтр по преподавателю
            </label>
<select
  value={instructorFilter}
  onChange={(e) => {
    setInstructorFilter(e.target.value);
    setPage(1);
  }}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 bg-white"
>
  <option value="" className="text-gray-900">Все преподаватели</option>
  {instructors.map((inst) => (
    <option key={inst.id} value={inst.id} className="text-gray-900">
      {inst.name}
    </option>
  ))}
</select>
          </div>
        </div>
      </div>

      {/* Список курсов */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          Ошибка: {error}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 text-lg">Курсы не найдены</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {courses.map((course) => {
              const instructor = instructors.find(i => i.id === course.instructorId);
              return (
                <div 
                  key={course.id} 
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link 
                        href={`/courses/${course.id}`} 
                        className="text-xl font-bold text-green-600 hover:text-green-700 hover:underline"
                      >
                        {course.title}
                      </Link>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                      <div className="flex gap-6 mt-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-bold">
                          {course.price} руб.
                        </span>
                        {instructor && (
                          <span className="text-gray-600">
                            👨‍{' '}
                            <Link 
                              href={`/instructors/${instructor.id}`} 
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {instructor.name}
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link 
                        href={`/courses/${course.id}/edit`} 
                        className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition font-medium"
                      >
                        ️ Изменить
                      </Link>
                      <button 
                        onClick={() => handleDelete(course.id, course.title)}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium"
                      >
                        🗑️ Удалить
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Пагинация */}
    {totalPages > 1 && (
  <div className="flex justify-center gap-4 mt-8">
    <button 
      disabled={page === 1}
      onClick={() => setPage(p => p - 1)}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition font-medium"
    >
      ← Назад
    </button>
    <span className="px-6 py-3 bg-gray-200 rounded-xl shadow-md font-medium text-gray-900">
      Страница {page} из {totalPages}
    </span>
    <button 
      disabled={page >= totalPages}
      onClick={() => setPage(p => p + 1)}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition font-medium"
    >
      Далее →
    </button>
  </div>
)
          }
        </>
      )}
    </div>
  );
}