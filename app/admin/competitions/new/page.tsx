// app/admin/competitions/new/page.tsx
import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';

export default function NewCompetition() {
  const fields = [
    { name: 'name', label: 'Tên cuộc thi', required: true, placeholder: 'Ví dụ: Google Kick Start 2024' },
    { name: 'rank', label: 'Hạng đạt được', placeholder: 'Ví dụ: Top 10%, Giải Nhì, Tham gia' },
    { name: 'date', label: 'Ngày thi', type: 'date', required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea', placeholder: 'Mô tả về cuộc thi, kết quả...' },
  ];

  return (
    <RequireAuth>
      <SimpleForm
        fields={fields}
        endpoint="competitions"
        title="Cuộc thi"
        hasImage={true}
        hasPublishedSwitch={true}
      />
    </RequireAuth>
  );
}