'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getInstructors, deleteInstructor } from '@/lib/api';
import { Instructor } from '@/lib/types';

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getInstructors(page, 5);
      setInstructors(data.items);
      setTotalPages(data.pages);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Вы уверены, что хотите удалить преподавателя "${name}" и все его курсы?`)) {
      return;
    }

    try {
      await deleteInstructor(id);
      loadData();
    } catch (e: any) {
      alert('Ошибка удаления: ' + e.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-700">Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            Ошибка: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Заголовок */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Преподаватели</h1>
              <p className="text-gray-700">Управление профилями преподавателей</p>
            </div>
            <Link 
              href="/instructors/new" 
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg font-medium flex items-center gap-2"
            >
              <span>+</span>
              Добавить
            </Link>
          </div>

          {instructors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-200">
              <div className="text-6xl mb-4"></div>
              <p className="text-gray-700 text-lg">Преподаватели не найдены</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {instructors.map((inst) => (
                  <div 
                    key={inst.id} 
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <Link 
                          href={`/instructors/${inst.id}`} 
                          className="text-xl font-bold text-blue-700 hover:text-blue-800 hover:underline"
                        >
                          {inst.name}
                        </Link>
                        <div className="flex gap-4 mt-2 text-gray-700">
                          <span>{inst.email}</span>
                          <span>{inst.experienceYears} лет опыта</span>
                          {inst.isActive ? (
                            <span className="text-green-700 font-medium"> Активен</span>
                          ) : (
                            <span className="text-red-700 font-medium"> Неактивен</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link 
                          href={`/instructors/${inst.id}/edit`} 
                          className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition font-medium"
                        >
                           Изменить
                        </Link>
                        <button 
                          onClick={() => handleDelete(inst.id, inst.name)}
                          className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
)}
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}