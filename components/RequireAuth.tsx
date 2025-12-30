// components/RequireAuth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Chờ một chút để Zustand hydrate từ localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
      setIsLoading(false);
    }, 100); // 100ms đủ để hydrate

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Đang tải...</div>
      </div>
    );
  }

  return <>{children}</>;
}