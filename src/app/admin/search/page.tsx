import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="search" currentPath="/admin/search">
      <AdminViewSelector tab="search" />
    </AdminLayout>
  );
}
