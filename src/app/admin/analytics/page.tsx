import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Analytics" currentPath="/admin/analytics">
 <AdminViewSelector tab="analytics" />
 </AdminLayout>
 );
}
