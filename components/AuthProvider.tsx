// components/AuthProvider.tsx
'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  // Chỉ để trigger re-render khi auth thay đổi nếu cần
  useAuthStore((state) => state.token);

  return <>{children}</>;
}