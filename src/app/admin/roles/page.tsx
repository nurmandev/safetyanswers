import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="roles" currentPath="/admin/roles">
      <AdminViewSelector tab="roles" />
    </AdminLayout>
  );
}
