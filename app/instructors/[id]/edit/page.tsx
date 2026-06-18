'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getInstructorById, updateInstructor } from '@/lib/api';
import { Instructor } from '@/lib/types';

export default function EditInstructorPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [id, setId] = useState<string>('');
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    params.then(p => {
      setId(p.id);
      getInstructorById(p.id)
        .then(data => {
          setInstructor(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Преподаватель не найден');
          setLoading(false);
        });
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      experienceYears: Number(formData.get('experienceYears')),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      await updateInstructor(id, data);
      router.push(`/instructors/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-700">Загрузка...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        </div>
      </div>
    </div>
  );

  if (!instructor) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Редактирование преподавателя</h1>

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
                defaultValue={instructor.name}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                defaultValue={instructor.email}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                defaultValue={instructor.experienceYears}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={instructor.isActive}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-900 font-medium">Активен</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition font-medium shadow-lg"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/instructors/${id}`)}
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