import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="User Accounts" currentPath="/admin/users">
 <AdminViewSelector tab="users" />
 </AdminLayout>
 );
}