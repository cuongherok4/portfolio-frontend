// app/admin/projects/page.tsx
'use client';  // ← QUAN TRỌNG: THÊM DÒNG NÀY ĐẦU TIÊN

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RequireAuth from '@/components/RequireAuth';
import Toast from '@/components/Toast'; // nếu bạn đã tạo Toast component

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects/my');  // ← endpoint lấy project của user hiện tại
      setProjects(res.data);
    } catch (error: any) {
      console.error('Lỗi load projects:', error);
      setToast({ message: 'Không thể tải danh sách dự án', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return;

    try {
      await api.delete(`/projects/${id}`);
      setToast({ message: 'Xóa dự án thành công!', type: 'success' });
      fetchProjects(); // Reload danh sách ngay
    } catch (error) {
      setToast({ message: 'Xóa thất bại', type: 'error' });
    }
  };

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Quản lý Dự án</h1>
          <Link href="/admin/projects/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + Thêm Dự án Mới
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Đang tải danh sách dự án...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-2xl text-gray-500 mb-6">Bạn chưa có dự án nào.</p>
            <Link href="/admin/projects/new">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
                Tạo dự án đầu tiên
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Chưa có ảnh thumbnail</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 6).map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                   <Link href={`/admin/projects/${project._id}/edit`}>
  <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
    Sửa
  </button>
</Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toast thông báo */}
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