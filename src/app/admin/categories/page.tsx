import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Categories" currentPath="/admin/categories">
 <AdminViewSelector tab="categories" />
 </AdminLayout>
 );
}