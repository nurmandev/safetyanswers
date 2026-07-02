import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="support" currentPath="/admin/support">
      <AdminViewSelector tab="support" />
    </AdminLayout>
  );
}
