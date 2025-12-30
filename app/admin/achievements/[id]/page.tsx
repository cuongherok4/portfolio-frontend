// app/admin/achievements/[id]/page.tsx
'use client';  // ← QUAN TRỌNG: Chuyển sang Client Component

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';
import api from '@/lib/api';

export default function EditAchievement({ params }: { params: Promise<{ id: string }> }) {
  const [achievement, setAchievement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const { id } = await params;  // ← Đúng cách unwrap Promise
        const res = await api.get(`/achievements/${id}`);
        setAchievement(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Không thể tải thành tích. Có thể không tồn tại hoặc bạn không có quyền.');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [params]);

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Đang tải thành tích...</p>
        </div>
      </RequireAuth>
    );
  }

  if (error || !achievement) {
    return (
      <RequireAuth>
        <div className="container mx-auto py-20 text-center">
          <p className="text-2xl text-red-600 mb-6">{error || 'Thành tích không tồn tại'}</p>
          <a href="/admin/achievements" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ← Quay về danh sách
          </a>
        </div>
      </RequireAuth>
    );
  }

  const fields = [
    { name: 'title', label: 'Tiêu đề', required: true },
    { name: 'organization', label: 'Tổ chức/Chủ trì', required: true },
    { name: 'date', label: 'Ngày nhận', type: 'date', required: true },
    { name: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
  ];

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <SimpleForm
          fields={fields}
          initialData={achievement}
          itemId={achievement._id}
          endpoint="achievements"
          title="Thành tích"
          hasImage={true}
          hasPublishedSwitch={true}
        />
      </div>
    </RequireAuth>
  );
}