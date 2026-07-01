import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Premium Articles" currentPath="/admin/premium">
 <AdminViewSelector tab="premium" />
 </AdminLayout>
 );
}