import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminViewSelector } from "@/components/admin/views/AdminViewSelector";

export default async function Page({ searchParams }: { searchParams: Promise<{ refund?: string }> }) {
 const params = await searchParams;
 return (
 <AdminLayout title="Payments & Invoices" currentPath="/admin/payments">
 <AdminViewSelector tab={params.refund === "true" ? "refunds" : "payments"} />
 </AdminLayout>
 );
}