// app/admin/competitions/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';
import api from '@/lib/api';

export default function EditCompetition({ params }: { params: Promise<{ id: string }> }) {
  const [competition, setCompetition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const { id } = await params;
        const res = await api.get(`/competitions/${id}`);
        setCompetition(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Không thể tải cuộc thi');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [params]);

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Đang tải cuộc thi...</p>
        </div>
      </RequireAuth>
    );
  }

  if (error || !competition) {
    return (
      <RequireAuth>
        <div className="container mx-auto py-20 text-center">
          <p className="text-2xl text-red-600 mb-6">{error || 'Cuộc thi không tồn tại'}</p>
          <a href="/admin/competitions" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ← Quay về danh sách
          </a>
        </div>
      </RequireAuth>
    );
  }

  const fields = [
    { name: 'name', label: 'Tên cuộc thi', required: true },
    { name: 'rank', label: 'Hạng đạt được' },
    { name: 'date', label: 'Ngày thi', type: 'date', required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea' },
  ];

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <SimpleForm
          fields={fields}
          initialData={competition}
          itemId={competition._id}
          endpoint="competitions"
          title="Cuộc thi"
          hasImage={true}
          hasPublishedSwitch={true}
        />
      </div>
    </RequireAuth>
  );
}