// app/admin/projects/[id]/page.tsx
'use client';  // ← QUAN TRỌNG: Chuyển sang Client Component

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import ProjectForm from '@/components/ProjectForm';
import api from '@/lib/api';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Đúng cách unwrap params Promise
        const { id } = await params;
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Không thể tải dự án. Có thể bạn không có quyền hoặc dự án không tồn tại.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Đang tải dự án...</p>
        </div>
      </RequireAuth>
    );
  }

  if (error || !project) {
    return (
      <RequireAuth>
        <div className="container mx-auto py-20 text-center">
          <p className="text-2xl text-red-600 mb-6">{error || 'Dự án không tồn tại'}</p>
          <a href="/admin/projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ← Quay về danh sách
          </a>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <ProjectForm initialData={project} projectId={project._id} />
      </div>
    </RequireAuth>
  );
}