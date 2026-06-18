import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Каталог учебных курсов',
  description: 'Система управления курсами и преподавателями',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* Навигация */}
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                  Каталог курсов
                </span>
              </Link>
              <div className="flex gap-1">
                <Link 
                  href="/" 
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                >
                  Главная
                </Link>
                <Link 
                  href="/instructors" 
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                >
                  Преподаватели
                </Link>
                <Link 
                  href="/courses" 
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                >
                  Курсы
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Основной контент*/}
        <main className="container mx-auto px-4 py-8 flex-grow bg-gray-50">
          {children}
        </main>
        
        {/* Футер */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-700">
            <p className="font-medium">Практика ИП Шарапов А.Е. | Fullstack Next.js | 2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}