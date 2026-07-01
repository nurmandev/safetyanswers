import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Payment Gateways" currentPath="/admin/gateways">
 <AdminViewSelector tab="gateways" />
 </AdminLayout>
 );
}
