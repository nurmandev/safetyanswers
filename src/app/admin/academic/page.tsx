import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Academic Consultancy Services" currentPath="/admin/academic">
 <AdminViewSelector tab="academic" />
 </AdminLayout>
 );
}
