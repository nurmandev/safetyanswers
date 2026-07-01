import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Overview" currentPath="/admin">
 <AdminViewSelector tab="dashboard" />
 </AdminLayout>
 );
}