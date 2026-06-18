'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCourseById, updateCourse, getInstructors } from '@/lib/api';
import { Course, Instructor } from '@/lib/types';

export default function EditCoursePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [id, setId] = useState<string>('');
  const [course, setCourse] = useState<Course | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    params.then(async p => {
      setId(p.id);
      try {
        const [courseData, instructorsData] = await Promise.all([
          getCourseById(p.id),
          getInstructors(1, 100)
        ]);
        setCourse(courseData);
        setInstructors(instructorsData.items);
        setLoading(false);
      } catch (err) {
        setError('Курс не найден');
        setLoading(false);
      }
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      instructorId: formData.get('instructorId') as string,
    };

    try {
      await updateCourse(id, data);
      router.push('/courses');
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
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

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Редактирование курса</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Название <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                minLength={3}
                defaultValue={course.title}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Описание <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                minLength={10}
                rows={4}
                defaultValue={course.description}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Цена (руб.) <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                required
                min={0}
                defaultValue={course.price}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Преподаватель <span className="text-red-500">*</span>
              </label>
              <select
                name="instructorId"
                required
                defaultValue={course.instructorId}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                disabled={saving}
                className="flex-1 bg-yellow-100 text-yellow-700 py-4 rounded-xl hover:bg-yellow-200 disabled:opacity-50 transition font-medium shadow-lg"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
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