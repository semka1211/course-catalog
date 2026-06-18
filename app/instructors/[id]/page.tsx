import { getInstructorByIdServer } from '@/lib/server-actions';
import Link from 'next/link';

export default async function InstructorPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  let instructor;
  try {
    instructor = await getInstructorByIdServer(id);
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Преподаватель не найден</h1>
            <p className="text-gray-700 mb-6">
              Преподаватель с таким идентификатором не существует или был удалён
            </p>
            <Link 
              href="/instructors" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
            >
              ← Вернуться к списку преподавателей
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Навигация */}
          <div className="mb-6">
            <Link 
              href="/instructors" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Назад к списку преподавателей
            </Link>
          </div>

          {/* Карточка преподавателя */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Заголовок */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{instructor.name}</h1>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  instructor.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {instructor.isActive ? '✅ Активен' : '❌ Неактивен'}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Информация о преподавателе */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📋</span> Информация о преподавателе
                </h2>
                
                {/* Описание */}
                {instructor.description && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Биография:</h3>
                    <p className="text-gray-700 leading-relaxed">{instructor.description}</p>
                  </div>
                )}
                
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a href={`mailto:${instructor.email}`} className="text-blue-600 hover:underline">
                      {instructor.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Опыт работы:</span>
                    <span className="font-semibold">{instructor.experienceYears} лет</span>
                  </p>
                </div>
              </div>
              
              {/* Курсы преподавателя */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📚</span> Курсы преподавателя
                </h2>
                {instructor.courses && instructor.courses.length > 0 ? (
                  <div className="grid gap-4">
                    {instructor.courses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.id}`}
                        className="block bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-700 mb-3">{course.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold">
                            {course.price.toLocaleString('ru-RU')} руб.
                          </span>
                          <span className="text-sm text-gray-600">
                            📆 Создан: {new Date(course.createdAt).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-xl text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-gray-700 text-lg">
                      У этого преподавателя пока нет курсов
                    </p>
                  </div>
                )}
              </div>

              {/* Дата создания */}
              {instructor.createdAt && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span>📆</span>
                  Добавлен:{' '}
                  <span className="font-medium">
                    {new Date(instructor.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
            
            {/* Кнопки действий */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/instructors/${instructor.id}/edit`}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition font-medium flex items-center gap-2"
              >
                <span>✏️</span>
                Редактировать
              </Link>
              <Link
                href="/instructors"
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                К списку преподавателей
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}