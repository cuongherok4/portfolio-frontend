// app/admin/achievements/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RequireAuth from '@/components/RequireAuth';
import Toast from '@/components/Toast';

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/achievements/my');
      setAchievements(res.data);
    } catch (error) {
      setToast({ message: 'Không thể tải dữ liệu', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Hàm xóa (sẽ thêm toast và reload)
  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa thành tích này?')) return;

    try {
      await api.delete(`/achievements/${id}`);
      setToast({ message: 'Xóa thành công!', type: 'success' });
      fetchAchievements(); // Reload danh sách
    } catch (error) {
      setToast({ message: 'Xóa thất bại', type: 'error' });
    }
  };

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Quản lý Thành tích</h1>
          <Link href="/admin/achievements/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Thêm Thành tích
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-xl py-20">Đang tải...</p>
        ) : achievements.length === 0 ? (
          <p className="text-center text-xl text-gray-500 py-20">Chưa có thành tích nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {item.certificateUrl && (
                  <img src={item.certificateUrl} alt={item.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {item.organization} - {new Date(item.date).toLocaleDateString('vi-VN')}
                  </p>
                  <div className="flex gap-3">
                    <Link href={`/admin/achievements/${item._id}`} className="flex-1">
                      <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                        Sửa
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toast notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </RequireAuth>
  );
}