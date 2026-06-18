'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createInstructor } from '@/lib/api';

export default function NewInstructorPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // ← ОБЯЗАТЕЛЬНО добавить!
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      description: formData.get('description') as string,
      experienceYears: Number(formData.get('experienceYears')),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      await createInstructor(data);
      router.push('/instructors');
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
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Новый преподаватель</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Имя <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Иван Петров"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Описание / Биография
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Расскажите о преподавателе: опыт, специализация, достижения..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Опыт работы (лет) <span className="text-red-500">*</span>
              </label>
              <input
                name="experienceYears"
                type="number"
                required
                min={0}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-900 font-medium">Активен</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition font-medium shadow-lg"
              >
                {loading ? 'Сохранение...' : 'Создать преподавателя'}
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