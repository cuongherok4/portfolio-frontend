// components/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface ProjectFormProps {
  initialData?: any;
  projectId?: string;
}

export default function ProjectForm({ initialData = {}, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    thumbnailUrl: initialData.thumbnailUrl || '',
    demoVideoUrl: initialData.demoVideoUrl || '',
    images: initialData.images || [],
    technologies: initialData.technologies?.join(', ') || '',
    githubLink: initialData.githubLink || '',
    liveLink: initialData.liveLink || '',
    isPublished: initialData.isPublished ?? true,
    isFeatured: initialData.isFeatured || false,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null); // mới thêm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload thumbnail nếu có
      let thumbnailUrl = formData.thumbnailUrl;
      if (thumbnailFile) {
        const form = new FormData();
        form.append('file', thumbnailFile);
        const res = await api.post('/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        thumbnailUrl = res.data.url;
      }

      // Upload nhiều ảnh mô tả
      const uploadedImages: string[] = [...formData.images];
      for (const file of imageFiles) {
        const form = new FormData();
        form.append('file', file);
        const res = await api.post('/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }

      // Upload video demo nếu có file mới
      let demoVideoUrl = formData.demoVideoUrl;
      if (videoFile) {
        const form = new FormData();
        form.append('file', videoFile);
        const res = await api.post('/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        demoVideoUrl = res.data.url;
      }

      const dataToSend = {
        ...formData,
        thumbnailUrl,
        images: uploadedImages,
        demoVideoUrl,
        technologies: formData.technologies
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean),
      };

      if (projectId) {
        await api.patch(`/projects/${projectId}`, dataToSend);
        alert('Cập nhật dự án thành công!');
      } else {
        await api.post('/projects', dataToSend);
        alert('Tạo dự án mới thành công!');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert('Lỗi: ' + (error.response?.data?.message || 'Không thể lưu dự án'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {projectId ? 'Sửa Dự án' : 'Tạo Dự án Mới'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tiêu đề & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Portfolio cá nhân với Next.js"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technologies (cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Next.js, Tailwind, NestJS, MongoDB"
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả chi tiết về dự án..."
            />
          </div>

          {/* Link GitHub & Live Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GitHub Link
              </label>
              <input
                type="url"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Live Demo Link
              </label>
              <input
                type="url"
                value={formData.liveLink}
                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-project.vercel.app"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail (ảnh đại diện)
            </label>
            {formData.thumbnailUrl && (
              <img
                src={formData.thumbnailUrl}
                alt="Thumbnail"
                className="w-full max-w-md h-64 object-cover rounded-lg mb-4 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Video Demo - Upload trực tiếp + dán URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Video Demo (upload từ máy hoặc dán URL)
            </label>

            {/* Upload video trực tiếp */}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
              className="w-full mb-4 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />

            {/* Dán URL thủ công */}
            <input
              type="url"
              placeholder="Hoặc dán URL video Cloudinary (nếu đã upload trước)"
              value={formData.demoVideoUrl}
              onChange={(e) => setFormData({ ...formData, demoVideoUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Preview video */}
            {formData.demoVideoUrl && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Preview video:</p>
                <video controls className="w-full max-w-3xl rounded-lg shadow-lg">
                  <source src={formData.demoVideoUrl} type="video/mp4" />
                  Trình duyệt không hỗ trợ video.
                </video>
              </div>
            )}
          </div>

          {/* Nhiều ảnh mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ảnh mô tả dự án (có thể chọn nhiều)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {formData.images.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Ảnh ${i + 1}`}
                    className="h-40 object-cover rounded-lg border shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Switch Public & Featured */}
          <div className="flex flex-col md:flex-row gap-8 pt-6 border-t">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-gray-700">Công khai (Public)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-gray-700">Nổi bật (Featured)</span>
            </label>
          </div>

          {/* Nút lưu */}
          <div className="flex gap-4 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              {loading ? 'Đang lưu...' : projectId ? 'Cập nhật Dự án' : 'Tạo Dự án'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}