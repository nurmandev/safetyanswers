import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default function Page() {
 return (
 <AdminLayout title="Client Testimonials" currentPath="/admin/testimonials">
 <AdminViewSelector tab="testimonials" />
 </AdminLayout>
 );
}
