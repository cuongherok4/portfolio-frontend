// app/admin/layout.tsx
import AdminLayout from '@/components/AdminLayout';
import RequireAuth from '@/components/RequireAuth';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <AdminLayout>{children}</AdminLayout>
    </RequireAuth>
  );
}