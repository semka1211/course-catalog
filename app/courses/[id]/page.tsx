import { getCourseByIdServer } from '@/lib/server-actions';
import Link from 'next/link';

export default async function CoursePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  let course;
  try {
    course = await getCourseByIdServer(id);
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4"></div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Курс не найден</h1>
            <p className="text-gray-700 mb-6">
              Курс с таким идентификатором не существует или был удалён
            </p>
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
            >
              ← Вернуться к списку курсов
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
              href="/courses" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Назад к списку курсов
            </Link>
          </div>

          {/* Карточка курса */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Заголовок */}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{course.title}</h1>
            
            <div className="space-y-6">
              {/* Описание курса */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span></span> Описание курса
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  {course.description}
                </p>
              </div>
              
              {/* Цена */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 px-6 py-4 rounded-xl border border-green-200">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Стоимость обучения</span>
                  <span className="text-3xl font-bold text-green-700">{course.price.toLocaleString('ru-RU')} руб.</span>
                </div>
              </div>
              
              {/* Преподаватель */}
              {course.instructor && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span></span> Преподаватель курса
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Link 
                        href={`/instructors/${course.instructor.id}`}
                        className="text-xl font-bold text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        {course.instructor.name}
                      </Link>
                      {course.instructor.description && (
                        <p className="text-gray-700 mt-2 text-sm">{course.instructor.description}</p>
                      )}
                      <div className="mt-3 space-y-2 text-gray-700">
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500"></span>
                          {course.instructor.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500"></span>
                          Опыт работы: <span className="font-semibold">{course.instructor.experienceYears} лет</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Дата создания */}
              {course.createdAt && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span></span>
                  Дата создания:{' '}
                  <span className="font-medium">
                    {new Date(course.createdAt).toLocaleDateString('ru-RU', {
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
                href={`/courses/${course.id}/edit`}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition font-medium flex items-center gap-2"
              >
                <span></span>
                Редактировать курс
              </Link>
              <Link
                href="/courses"
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                К списку курсов
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}