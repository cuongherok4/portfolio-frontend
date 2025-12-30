// components/Toast.tsx
'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Tự ẩn sau 3 giây

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className={`px-6 py-4 rounded-lg shadow-2xl text-white font-semibold flex items-center gap-3 ${bgColor}`}>
        <span className="text-xl">{type === 'success' ? '✓' : '✕'}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}