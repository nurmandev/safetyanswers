import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="health" currentPath="/admin/health">
      <AdminViewSelector tab="health" />
    </AdminLayout>
  );
}
