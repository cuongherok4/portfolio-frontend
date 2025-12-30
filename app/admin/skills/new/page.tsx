// app/admin/skills/new/page.tsx
import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';

export default function NewSkill() {
  const fields = [
    { name: 'name', label: 'Tên kỹ năng', required: true, placeholder: 'Ví dụ: React, Node.js, Python' },
    { name: 'level', label: 'Mức độ thành thạo (%)', type: 'number', required: true, placeholder: '85' },
    { name: 'category', label: 'Danh mục', placeholder: 'Frontend, Backend, DevOps, Tools...' },
  ];

  return (
    <RequireAuth>
      <SimpleForm
        fields={fields}
        endpoint="skills"
        title="Kỹ năng"
        hasImage={true} // có thể upload icon
        hasPublishedSwitch={true}
      />
    </RequireAuth>
  );
}