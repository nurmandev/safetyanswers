import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Client File Uploads" currentPath="/admin/uploads">
 <AdminViewSelector tab="uploads" />
 </AdminLayout>
 );
}
