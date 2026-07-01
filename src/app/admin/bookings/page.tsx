import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
 const params = await searchParams;
 return (
 <AdminLayout title="Booking Management" currentPath="/admin/bookings">
 <AdminViewSelector tab={params.status ? `bookings-${params.status}` : "bookings"} />
 </AdminLayout>
 );
}