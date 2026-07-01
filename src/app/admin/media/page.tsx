import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Media Library" currentPath="/admin/media">
 <AdminViewSelector tab="media" />
 </AdminLayout>
 );
}
