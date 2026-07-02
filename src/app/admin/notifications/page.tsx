import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="notifications" currentPath="/admin/notifications">
      <AdminViewSelector tab="notifications" />
    </AdminLayout>
  );
}
