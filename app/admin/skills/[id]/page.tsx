// app/admin/skills/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';
import api from '@/lib/api';

export default function EditSkill({ params }: { params: Promise<{ id: string }> }) {
  const [skill, setSkill] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const { id } = await params;
        const res = await api.get(`/skills/${id}`);
        setSkill(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Không thể tải kỹ năng');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [params]);

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Đang tải kỹ năng...</p>
        </div>
      </RequireAuth>
    );
  }

  if (error || !skill) {
    return (
      <RequireAuth>
        <div className="container mx-auto py-20 text-center">
          <p className="text-2xl text-red-600 mb-6">{error || 'Kỹ năng không tồn tại'}</p>
          <a href="/admin/skills" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ← Quay về danh sách
          </a>
        </div>
      </RequireAuth>
    );
  }

  const fields = [
    { name: 'name', label: 'Tên kỹ năng', required: true },
    { name: 'level', label: 'Mức độ (%)', type: 'number', required: true },
    { name: 'category', label: 'Danh mục' },
  ];

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <SimpleForm
          fields={fields}
          initialData={skill}
          itemId={skill._id}
          endpoint="skills"
          title="Kỹ năng"
          hasImage={true}
          hasPublishedSwitch={true}
        />
      </div>
    </RequireAuth>
  );
}