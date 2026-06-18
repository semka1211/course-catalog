import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Герой-секция */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Каталог учебных курсов
        </h1>
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          Удобная система управления образовательными программами и преподавателями
        </p>
        
        <div className="flex justify-center gap-4">
          <Link 
            href="/instructors" 
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl font-medium"
          >
            👨‍🏫 Преподаватели
          </Link>
          <Link 
            href="/courses" 
            className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-xl font-medium"
          >
            📖 Курсы
          </Link>
        </div>
      </div>

      {/* Карточки возможностей */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div className="text-4xl mb-4">👨‍</div>
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Преподаватели</h2>
          <p className="text-gray-700 mb-4">
            Управление профилями преподавателей, их опытом и контактной информацией
          </p>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Просмотр списка преподавателей
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Создание и редактирование профилей
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Просмотр курсов каждого преподавателя
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div className="text-4xl mb-4">📖</div>
          <h2 className="text-2xl font-bold mb-3 text-green-700">Курсы</h2>
          <p className="text-gray-700 mb-4">
            Каталог учебных курсов с поиском, фильтрацией и пагинацией
          </p>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Поиск по названию и описанию
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Фильтрация по преподавателю
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Пагинация для удобной навигации
            </li>
          </ul>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
          <div className="text-3xl font-bold text-blue-700 mb-2">5+</div>
          <div className="text-gray-800 font-medium">Преподавателей</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
          <div className="text-3xl font-bold text-green-700 mb-2">5+</div>
          <div className="text-gray-800 font-medium">Курсов</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
          <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
          <div className="text-gray-800 font-medium">TypeScript</div>
        </div>
      </div>
    </div>
  );
}