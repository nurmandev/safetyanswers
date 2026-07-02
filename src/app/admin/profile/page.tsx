import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="profile" currentPath="/admin/profile">
      <AdminViewSelector tab="profile" />
    </AdminLayout>
  );
}
