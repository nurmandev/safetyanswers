import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Professional Writing Services" currentPath="/admin/professional-writing">
 <AdminViewSelector tab="professional-writing" />
 </AdminLayout>
 );
}
