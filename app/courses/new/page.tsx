'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse, getInstructors } from '@/lib/api';
import { Instructor } from '@/lib/types';

export default function NewCoursePage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    getInstructors(1, 100).then(data => {
      setInstructors(data.items);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      instructorId: formData.get('instructorId') as string,
    };

    try {
      await createCourse(data);
      router.push('/courses');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Новый курс</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Название <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                minLength={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Основы JavaScript"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Описание <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                minLength={10}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Подробное описание курса..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Цена (руб.) <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                required
                min={0}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Преподаватель <span className="text-red-500">*</span>
              </label>
              <select
                name="instructorId"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="" className="text-gray-900">Выберите преподавателя</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id} className="text-gray-900">
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 disabled:opacity-50 transition font-medium shadow-lg"
              >
                {loading ? 'Сохранение...' : 'Создать курс'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-gray-900"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}