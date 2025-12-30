// components/SimpleForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface SimpleFormProps {
  fields: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
  }[];
  initialData?: any;
  itemId?: string;
  endpoint: string; // ví dụ: 'achievements', 'competitions', 'skills'
  title: string;
  hasImage?: boolean; // có upload ảnh không (achievements & competitions có, skills có thể có icon)
  hasPublishedSwitch?: boolean; // có switch công khai không
}

export default function SimpleForm({
  fields,
  initialData = {},
  itemId,
  endpoint,
  title,
  hasImage = false,
  hasPublishedSwitch = true,
}: SimpleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    ...initialData,
    isPublished: initialData.isPublished ?? true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = formData.certificateUrl || formData.prizeUrl || formData.iconUrl || '';

    if (hasImage && imageFile) {
      const form = new FormData();
      form.append('file', imageFile);

      const uploadRes = await api.post('/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      imageUrl = uploadRes.data.url;
    }

    const dataToSend: any = {
      ...formData,
    };

    if (hasImage && imageUrl) {
      if (endpoint === 'achievements') dataToSend.certificateUrl = imageUrl;
      if (endpoint === 'competitions') dataToSend.prizeUrl = imageUrl;
      if (endpoint === 'skills') dataToSend.iconUrl = imageUrl;
    }

    if (itemId) {
      await api.patch(`/${endpoint}/${itemId}`, dataToSend);
      alert('Cập nhật thành công!');
    } else {
      await api.post(`/${endpoint}`, dataToSend);
      alert('Thêm mới thành công!');
    }

    router.push(`/admin/${endpoint}`);
    router.refresh();
  } catch (error: any) {
    console.error('Lỗi:', error);
    const msg = error.response?.data?.message || error.message || 'Có lỗi xảy ra';
    alert('Lỗi: ' + msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {itemId ? `Sửa ${title}` : `Tạo ${title} Mới`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  required={field.required}
                  rows={4}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                />
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  required={field.required}
                  value={formData[field.name]?.slice(0, 10) || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          {hasImage && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ảnh minh họa (chứng chỉ/giải thưởng/icon)
              </label>
              {formData.certificateUrl || formData.prizeUrl || formData.iconUrl ? (
                <img
                  src={formData.certificateUrl || formData.prizeUrl || formData.iconUrl}
                  alt="Current"
                  className="w-full max-w-md h-64 object-cover rounded-lg mb-4 border"
                />
              ) : null}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}

          {hasPublishedSwitch && (
            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="isPublished" className="text-lg font-medium text-gray-700 cursor-pointer">
                Công khai (Public)
              </label>
            </div>
          )}

          <div className="flex gap-4 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg shadow-lg transition"
            >
              {loading ? 'Đang lưu...' : itemId ? 'Cập nhật' : 'Tạo mới'}
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