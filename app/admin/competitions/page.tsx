// app/admin/competitions/page.tsx
'use client';  // ← THÊM DÒNG NÀY

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RequireAuth from '@/components/RequireAuth';

export default function CompetitionsAdmin() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/competitions/my');
        setCompetitions(res.data);
      } catch (error) {
        console.error('Lỗi load cuộc thi:', error);
        alert('Không thể tải dữ liệu. Vui lòng thử đăng nhập lại.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Quản lý Cuộc thi</h1>
          <Link href="/admin/competitions/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Thêm Cuộc thi
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-xl py-20">Đang tải...</p>
        ) : competitions.length === 0 ? (
          <p className="text-center text-xl text-gray-500 py-20">Chưa có cuộc thi nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((item: any) => (
              <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {item.prizeUrl && (
                  <img src={item.prizeUrl} alt={item.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-2">{item.rank || 'Tham gia'}</p>
                  <p className="text-gray-600">{new Date(item.date).toLocaleDateString('vi-VN')}</p>
                  <Link href={`/admin/competitions/${item._id}`} className="block mt-4">
                    <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      Sửa
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  );
}