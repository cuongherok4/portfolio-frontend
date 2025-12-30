// components/AdminLayout.tsx
'use client';  // ← THÊM DÒNG NÀY VÀO ĐẦU FILE

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '🏠' },
    { href: '/admin/projects', label: 'Projects', icon: '💻' },
    { href: '/admin/achievements', label: 'Thành tích', icon: '🏆' },
    { href: '/admin/competitions', label: 'Cuộc thi', icon: '🏅' },
    { href: '/admin/skills', label: 'Kỹ năng', icon: '⚡' },
    { href: '/admin/contacts', label: 'Liên hệ khách', icon: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 fixed h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">
            Chào {user?.name || user?.email || 'Admin'}
          </p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition ${
                pathname === item.href || pathname.startsWith(item.href + '/') 
                  ? 'bg-gray-800 text-white border-l-4 border-blue-500' 
                  : ''
              }`}
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content - thêm padding-left để tránh bị sidebar che */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}