"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";
import { api } from "@/lib/api-client";

interface Booking {
  _id: string;
  bookingId: string;
  title: string;
  service: string;
  category: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  assignedConsultant?: {
    name: string;
    title: string;
  };
  duration: number;
  meetingType: string;
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

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 border-amber-200 text-amber-700",
  awaiting_review: "bg-blue-50 border-blue-200 text-blue-700",
  approved: "bg-green-50 border-green-200 text-green-700",
  confirmed: "bg-green-50 border-green-200 text-green-700",
  scheduled: "bg-emerald-50 border-emerald-200 text-emerald-700",
  rescheduled: "bg-purple-50 border-purple-200 text-purple-700",
  completed: "bg-slate-100 border-slate-200 text-slate-600",
  cancelled: "bg-red-50 border-red-200 text-red-700",
  rejected: "bg-red-50 border-red-200 text-red-700",
  no_show: "bg-orange-50 border-orange-200 text-orange-700",
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

export default function AccountBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "10");
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await api.get<BookingsResponse>(`/bookings?${params.toString()}`);

      if (res.success && res.data) {
        setBookings(res.data.bookings || []);
        setPagination(res.data.pagination);
      } else {
        setError(res.message || "Failed to load bookings");
      }
    } catch {
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(1);
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings(1);
  };

  return (
    <AccountLayout title="Consultation Bookings" currentPath="/account/bookings">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        
        {/* Bookings Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-955">Active Consultations</h3>
            <p className="text-xs text-slate-400 mt-1">Review schedules and assignment progress for your booked services.</p>
          </div>
          
          <Link
            href="/book"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 self-start sm:self-center transition-colors"
          >
            Book New Consultation
          </Link>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed]"
            />
          </form>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed]"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex-grow flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
              <p className="text-xs text-slate-400 mt-4">Loading bookings...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex-grow flex items-center justify-center p-12">
            <div className="text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => fetchBookings(1)}
                className="mt-4 text-xs font-bold text-[#7c3aed] hover:underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="flex-grow flex items-center justify-center p-12">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center bg-slate-50 text-slate-400 mx-auto mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-slate-900">No Bookings Yet</h4>
              <p className="text-xs text-slate-400 mt-1">You haven&apos;t made any bookings yet.</p>
              <Link
                href="/book"
                className="mt-4 inline-block bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 transition-colors"
              >
                Book Your First Consultation
              </Link>
            </div>
          </div>
        )}

        {/* Bookings Table / List */}
        {!loading && !error && bookings.length > 0 && (
          <div className="flex-grow">
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-6">Consultation Brief</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Assigned Advisor</th>
                    <th className="py-4 px-6">Schedule Date</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {booking.bookingId}
                      </td>
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {booking.title}
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
                          {booking.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 font-semibold text-slate-600">
                        {booking.assignedConsultant?.name || "Unassigned"}
                      </td>
                      <td className="py-5 px-6 text-slate-500">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {new Date(booking.preferredDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] mt-0.5">{booking.preferredTime}</p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-extrabold border ${statusStyles[booking.status] || "bg-slate-50 border-slate-200 text-slate-500"}`}>
                          {statusLabels[booking.status] || booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="block lg:hidden p-4 space-y-3">
              {bookings.map((booking) => (
                <div key={booking._id} className="border border-slate-200 bg-slate-50/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400">{booking.bookingId}</p>
                      <h4 className="font-bold text-slate-900 text-sm">{booking.title}</h4>
                    </div>
                    <span className={`shrink-0 inline-block px-2.5 py-1 text-[10px] font-extrabold border ${statusStyles[booking.status] || "bg-slate-50 border-slate-200 text-slate-500"}`}>
                      {statusLabels[booking.status] || booking.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400 font-semibold">Category</p>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 border border-slate-100 bg-slate-50 text-slate-600">
                        {booking.category}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Advisor</p>
                      <p className="font-semibold text-slate-600">
                        {booking.assignedConsultant?.name || "Unassigned"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-400 font-semibold">Schedule</p>
                      <p className="font-semibold text-slate-800">
                        {new Date(booking.preferredDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[10px] text-slate-500">{booking.preferredTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs">
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
    </AccountLayout>
  );
}
