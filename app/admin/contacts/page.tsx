'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RequireAuth from '@/components/RequireAuth';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/contacts')
      .then(res => setContacts(res.data))
      .catch(() => alert('Lỗi tải dữ liệu'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">Liên hệ từ Khách hàng</h1>
        {loading ? <p>Đang tải...</p> : contacts.length === 0 ? <p>Chưa có liên hệ nào</p> : (
          <div className="space-y-6">
            {contacts.map((c: any) => (
              <div key={c._id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <p>Email: {c.email} | Phone: {c.phone}</p>
                    <p>Gói: <span className="font-semibold">{c.package}</span></p>
                    {c.message && <p className="mt-2 italic">"{c.message}"</p>}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  );
}