import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Guest Purchases" currentPath="/admin/guests">
 <AdminViewSelector tab="guests" />
 </AdminLayout>
 );
}
