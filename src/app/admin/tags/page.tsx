import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Tags List" currentPath="/admin/tags">
 <AdminViewSelector tab="tags" />
 </AdminLayout>
 );
}