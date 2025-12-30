import RequireAuth from '@/components/RequireAuth';
import SimpleForm from '@/components/SimpleForm';

export default function NewAchievement() {
  const fields = [
    { name: 'title', label: 'Tiêu đề', required: true },
    { name: 'organization', label: 'Tổ chức/Chủ trì', required: true },
    { name: 'date', label: 'Ngày nhận', type: 'date', required: true },
    { name: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
  ];

  return (
    <RequireAuth>
      <SimpleForm
        fields={fields}
        endpoint="achievements"
        title="Thành tích"
        hasImage={true}
        hasPublishedSwitch={true}
      />
    </RequireAuth>
  );
}