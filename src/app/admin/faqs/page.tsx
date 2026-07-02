import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
  return (
    <AdminLayout title="faqs" currentPath="/admin/faqs">
      <AdminViewSelector tab="faqs" />
    </AdminLayout>
  );
}
