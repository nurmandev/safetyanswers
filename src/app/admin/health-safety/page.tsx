import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Health and Safety Consultancy" currentPath="/admin/health-safety">
 <AdminViewSelector tab="health-safety" />
 </AdminLayout>
 );
}
