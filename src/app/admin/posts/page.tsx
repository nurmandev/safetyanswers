import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Blog Posts" currentPath="/admin/posts">
 <AdminViewSelector tab="posts" />
 </AdminLayout>
 );
}