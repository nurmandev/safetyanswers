"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  User,
  DollarSign,
  Clock,
  Paperclip,
  Download,
  CheckCircle,
  XCircle,
  FileText,
  UserCheck,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { api } from "@/lib/api-client";

interface Consultant {
  _id: string;
  name: string;
  title: string;
  expertise: string[];
  email: string;
}

interface Booking {
  _id: string;
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country?: string;
  organization?: string;
  service: string;
  category: string;
  title: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  duration: number;
  meetingType: string;
  status: string;
  paymentStatus: string;
  amount: number;
  currency: string;
  assignedConsultant?: Consultant;
  internalNotes?: string;
  adminNotes?: string;
  documents: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  timeline: Array<{
    action: string;
    date: string;
    by?: string;
  }>;
  createdAt: string;
}

interface BookingsResponse {
  bookings: Booking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ConsultantsResponse {
  consultants: Consultant[];
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20",
  awaiting_review: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20",
  approved: "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20",
  confirmed: "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20",
  scheduled: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20",
  rescheduled: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20",
  completed: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20",
  cancelled: "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20",
  rejected: "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20",
  no_show: "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  awaiting_review: "Awaiting Review",
  approved: "Approved",
  confirmed: "Confirmed",
  scheduled: "Scheduled",
  rescheduled: "Rescheduled",
  completed: "Completed",
  cancelled: "Cancelled",
  rejected: "Rejected",
  no_show: "No Show",
};

export function BookingManagement({ filterStatus }: { filterStatus?: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState(filterStatus || "All");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [assignedConsultant, setAssignedConsultant] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBookings = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "10");
      if (activeStatus !== "All") {
        params.set("status", activeStatus.toLowerCase());
      }
      if (searchQuery) {
        params.set("search", searchQuery);
      }

      const res = await api.get<BookingsResponse>(`/admin/bookings?${params.toString()}`, true);
      if (res.success && res.data) {
        setBookings(res.data.bookings || []);
        setPagination(res.data.pagination);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }, [activeStatus, searchQuery]);

  const fetchConsultants = useCallback(async () => {
    try {
      const res = await api.get<ConsultantsResponse>("/admin/bookings/consultants?isActive=true", true);
      if (res.success && res.data?.consultants) {
        setConsultants(res.data.consultants);
      }
    } catch {
      // Error handled silently
    }
  }, []);

  useEffect(() => {
    fetchBookings(1);
    fetchConsultants();
  }, [fetchBookings, fetchConsultants]);

  const handleSelectBooking = (bk: Booking) => {
    setSelectedBooking(bk);
    setAssignedConsultant(bk.assignedConsultant?._id || "");
    setInternalNotes(bk.internalNotes || "");
  };

  const handleStatusChange = async (status: string, reason?: string) => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      const res = await api.patch<{ booking: Booking }>(
        `/admin/bookings/${selectedBooking.bookingId}/status`,
        { status, reason },
        true
      );
      if (res.success && res.data?.booking) {
        setSelectedBooking(res.data.booking);
        setBookings((prev) =>
          prev.map((bk) =>
            bk._id === selectedBooking._id ? res.data.booking : bk
          )
        );
      }
    } catch {
      // Error handled silently
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !assignedConsultant) return;
    setActionLoading(true);
    try {
      const res = await api.patch<{ booking: Booking }>(
        `/admin/bookings/${selectedBooking.bookingId}/assign`,
        { consultantId: assignedConsultant },
        true
      );
      if (res.success && res.data?.booking) {
        setSelectedBooking(res.data.booking);
        setBookings((prev) =>
          prev.map((bk) =>
            bk._id === selectedBooking._id ? res.data.booking : bk
          )
        );
      }
    } catch {
      // Error handled silently
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      const res = await api.patch<{ booking: Booking }>(
        `/admin/bookings/${selectedBooking.bookingId}/notes`,
        { internalNotes },
        true
      );
      if (res.success && res.data?.booking) {
        setSelectedBooking(res.data.booking);
      }
    } catch {
      // Error handled silently
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await api.post<{ bookings: Booking[] }>(
        "/admin/bookings/export",
        { status: activeStatus !== "All" ? activeStatus.toLowerCase() : undefined },
        true
      );
      if (res.success && res.data?.bookings) {
        const csv = [
          ["Booking ID", "Client", "Email", "Service", "Category", "Date", "Status", "Amount"].join(","),
          ...res.data.bookings.map((b) =>
            [
              b.bookingId,
              b.name,
              b.email,
              b.service,
              b.category,
              new Date(b.preferredDate).toLocaleDateString(),
              b.status,
              `${b.amount} ${b.currency}`,
            ].join(",")
          ),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // Error handled silently
    }
  };

  const filteredBookings = bookings;

  return (
    <div className="space-y-6">
      
      {/* Overview stats header if not viewing details */}
      {!selectedBooking && (
        <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400 overflow-x-auto">
          {["All", "Pending", "Approved", "Completed", "Cancelled"].map((status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`pb-3 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-white"
                    : "border-transparent hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {status} Bookings
              </button>
            );
          })}
        </div>
      )}

      {/* Main split viewport (Details / List view toggle) */}
      {selectedBooking ? (
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          
          {/* Back button header */}
          <div className="lg:col-span-12">
            <button
              onClick={() => setSelectedBooking(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-1.5"
            >
              ← Back to Bookings Ledger
            </button>
          </div>

          {/* Left panel: client details & files */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Booking Details Card */}
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
              
              <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {selectedBooking.title || selectedBooking.service}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Booking ID: {selectedBooking.bookingId}
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {selectedBooking.status === "pending" || selectedBooking.status === "awaiting_review" ? (
                    <button
                      onClick={() => handleStatusChange("approved")}
                      disabled={actionLoading}
                      className="px-3.5 py-2 bg-green-600 text-white text-[10px] font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      Approve
                    </button>
                  ) : null}
                  {["approved", "confirmed", "scheduled"].includes(selectedBooking.status) && (
                    <button
                      onClick={() => handleStatusChange("completed")}
                      disabled={actionLoading}
                      className="px-3.5 py-2 bg-blue-600 text-white text-[10px] font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      Mark Complete
                    </button>
                  )}
                  {!["completed", "cancelled", "rejected"].includes(selectedBooking.status) && (
                    <button
                      onClick={() => handleStatusChange("cancelled")}
                      disabled={actionLoading}
                      className="px-3.5 py-2 bg-red-600 text-white text-[10px] font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <span className={`inline-block px-2.5 py-1 text-[10px] font-extrabold border ${statusStyles[selectedBooking.status] || ""}`}>
                {statusLabels[selectedBooking.status] || selectedBooking.status}
              </span>

              {/* Descriptions & Coordinates */}
              <div className="grid gap-6 sm:grid-cols-2 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Client Details</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedBooking.name}</p>
                  <p className="text-slate-500">{selectedBooking.email}</p>
                  <p className="text-slate-500">{selectedBooking.phone}</p>
                  {selectedBooking.country && <p className="text-slate-500">{selectedBooking.country}</p>}
                  {selectedBooking.organization && <p className="text-slate-500">{selectedBooking.organization}</p>}
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Timeline Goals</p>
                  <p className="font-semibold">Classification: <span className="text-slate-900 dark:text-white font-bold">{selectedBooking.category}</span></p>
                  <p className="font-semibold">Target Date: <span className="text-slate-900 dark:text-white font-bold">
                    {new Date(selectedBooking.preferredDate).toLocaleDateString()}
                  </span></p>
                  <p className="font-semibold">Time: <span className="text-slate-900 dark:text-white font-bold">{selectedBooking.preferredTime}</span></p>
                  <p className="font-semibold">Budget: <span className="text-slate-900 dark:text-white font-bold">
                    {selectedBooking.amount > 0 ? `${selectedBooking.currency} ${selectedBooking.amount}` : "TBD"}
                  </span></p>
                </div>

                <div className="sm:col-span-2 space-y-1.5 pt-4 border-t">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Project Requirement Brief</p>
                  <p className="text-slate-650 leading-relaxed font-semibold">{selectedBooking.description}</p>
                </div>
              </div>

            </div>

            {/* Client Uploaded Files Card */}
            {selectedBooking.documents && selectedBooking.documents.length > 0 && (
              <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
                  Uploaded Coordination Materials
                </h4>
                <div className="space-y-3">
                  {selectedBooking.documents.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] flex items-center justify-between hover:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-850 dark:text-slate-200">{file.name}</span>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center bg-white dark:bg-[#0c0c0e] border border-slate-250 dark:border-[#1e1e24] text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right panel: internal notes, assign staff, progress timeline */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coordination settings */}
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
                Internal Coordination
              </h4>
              
              {/* Assign Consultant */}
              <form onSubmit={handleAssignConsultant} className="space-y-4 text-xs mb-6">
                <div className="space-y-2">
                  <label className="block font-bold text-slate-450 uppercase tracking-wider">Assign Advisor</label>
                  <select
                    value={assignedConsultant}
                    onChange={(e) => setAssignedConsultant(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {consultants.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.title})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading || !assignedConsultant}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Assigning..." : "Assign Consultant"}
                </button>
              </form>

              {/* Internal Notes */}
              <form onSubmit={handleUpdateNotes} className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="block font-bold text-slate-455 uppercase tracking-wider">Coordinator Notes</label>
                  <textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Internal Update"}
                </button>
              </form>
            </div>

            {/* Timeline Progress */}
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
                Booking Log Timeline
              </h4>
              
              <div className="space-y-4">
                {selectedBooking.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="h-2 w-2 bg-blue-600 mt-1.5" />
                      {idx !== selectedBooking.timeline.length - 1 && <span className="w-0.5 bg-slate-205 dark:bg-[#1a1a1f] flex-grow mt-1" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{item.action}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Controls list */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search bookings by client, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchBookings(1)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
              />
            </div>
            
            <button
              onClick={handleExport}
              className="px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 bg-white dark:bg-[#0c0c0e]"
            >
              Export Bookings CSV
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
                <p className="text-xs text-slate-400 mt-4">Loading bookings...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredBookings.length === 0 && (
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm p-12">
              <div className="text-center">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Bookings Found</h4>
                <p className="text-xs text-slate-400 mt-1">No bookings match your current filters.</p>
              </div>
            </div>
          )}

          {/* Bookings Table */}
          {!loading && filteredBookings.length > 0 && (
            <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                      <th className="py-4 px-6">Client Name</th>
                      <th className="py-4 px-6">Project Request</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Assigned Advisor</th>
                      <th className="py-4 px-6">Deadline</th>
                      <th className="py-4 px-6">Budget</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
                        <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
                          {booking.name}
                        </td>
                        <td className="py-5 px-6 font-semibold">
                          {booking.title || booking.service}
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-650 dark:bg-slate-950/20">
                            {booking.category}
                          </span>
                        </td>
                        <td className="py-5 px-6 font-bold text-slate-600 dark:text-slate-350">
                          {booking.assignedConsultant?.name || "Unassigned"}
                        </td>
                        <td className="py-5 px-6 text-slate-500 font-semibold">
                          {new Date(booking.preferredDate).toLocaleDateString()}
                        </td>
                        <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
                          {booking.amount > 0 ? `${booking.currency} ${booking.amount}` : "TBD"}
                        </td>
                        <td className="py-5 px-6">
                          <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold border ${statusStyles[booking.status] || ""}`}>
                            {statusLabels[booking.status] || booking.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <button
                            onClick={() => handleSelectBooking(booking)}
                            className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[11px] font-bold hover:opacity-90 transition-all shadow-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1a1a1f] flex items-center justify-between text-xs">
                  <p className="text-slate-400">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} bookings
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchBookings(pagination.page - 1)}
                      disabled={!pagination.hasPrev}
                      className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchBookings(pagination.page + 1)}
                      disabled={!pagination.hasNext}
                      className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
