// app/admin/projects/new/page.tsx
import RequireAuth from '@/components/RequireAuth';
import ProjectForm from '@/components/ProjectForm';

export default function NewProjectPage() {
  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tạo Dự án Mới
          </h1>
          <p className="text-lg text-gray-600">
            Điền thông tin chi tiết để thêm một dự án mới vào portfolio của bạn.
          </p>
        </div>

        {/* Form tạo mới - không truyền initialData và projectId */}
        <ProjectForm />
      </div>
    </RequireAuth>
  );
}