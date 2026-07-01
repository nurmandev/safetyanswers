import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Reports" currentPath="/admin/reports">
 <AdminViewSelector tab="reports" />
 </AdminLayout>
 );
}
