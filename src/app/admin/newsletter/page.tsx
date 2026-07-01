import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Newsletter Campaigns" currentPath="/admin/newsletter">
 <AdminViewSelector tab="newsletter" />
 </AdminLayout>
 );
}
