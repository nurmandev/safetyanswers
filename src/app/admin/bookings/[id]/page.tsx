"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  DollarSign,
  Clock,
  Paperclip,
  Download,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const bookingData = {
  id: "BK-1042",
  client: "Chidi Okonkwo",
  email: "chidi.okonkwo@gmail.com",
  phone: "+234 801 234 5678",
  country: "Nigeria",
  service: "PhD Dissertation Audit",
  category: "Academic Support",
  consultant: "Dr. Amara Okafor",
  date: "Jul 20, 2026",
  budget: "$1,200.00",
  status: "Approved",
  description: "Complete PhD dissertation audit including literature review validation, SPSS statistical modeling, and Harvard referencing check. Client requires 2-week turnaround with weekly progress updates.",
  files: ["thesis_proposal_v3.pdf", "spss_dataset.xlsx", "research_questions.docx"],
  timeline: [
    { date: "Jul 01, 2026", action: "Booking approved by admin coordinator", user: "Admin" },
    { date: "Jun 30, 2026", action: "Dr. Amara Okafor assigned as consultant", user: "System" },
    { date: "Jun 29, 2026", action: "Payment of $1,200.00 confirmed via Stripe", user: "System" },
    { date: "Jun 28, 2026", action: "Booking submitted by client", user: "Chidi Okonkwo" },
  ],
  notes: "Client has strict university deadline. Requires Harvard referencing style. Previous work submitted for review.",
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [noteText, setNoteText] = useState("");
  const [status, setStatus] = useState(bookingData.status);

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400",
    Approved: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400",
    Completed: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/20 dark:border-slate-900 dark:text-slate-400",
    Cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400",
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      alert("Internal note added successfully.");
      setNoteText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Bookings
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Booking {bookingData.id}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{bookingData.service}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-block px-3 py-1 text-[11px] font-bold border ${statusColors[status] || statusColors.Pending}`}>
            {status}
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-xs bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2 font-bold focus:outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">

          {/* Client Information */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Client Information</h4>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-[#7c3aed]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{bookingData.client}</p>
                  <p className="text-[10px] text-slate-400">Client Name</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-blue-50 dark:bg-blue-950/20 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{bookingData.email}</p>
                  <p className="text-[10px] text-slate-400">Email</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-green-50 dark:bg-green-950/20 text-green-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{bookingData.phone}</p>
                  <p className="text-[10px] text-slate-400">Phone</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-amber-50 dark:bg-amber-950/20 text-amber-600">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{bookingData.country}</p>
                  <p className="text-[10px] text-slate-400">Country</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Project Details</h4>
            <div className="grid gap-4 sm:grid-cols-2 text-xs mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{bookingData.service}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{bookingData.category}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultant</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{bookingData.consultant}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget</p>
                <p className="font-bold text-[#7c3aed] mt-1">{bookingData.budget}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deadline</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{bookingData.date}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-[#1a1a1f] pt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{bookingData.description}</p>
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Uploaded Files</h4>
            <div className="space-y-2">
              {bookingData.files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 dark:border-[#1a1a1f] hover:bg-slate-50 dark:hover:bg-[#121215] transition-colors">
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{file}</span>
                  </div>
                  <button className="text-[10px] font-bold text-[#7c3aed] hover:underline flex items-center gap-1">
                    <Download className="h-3 w-3" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Internal Notes</h4>
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900">
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{bookingData.notes}</p>
            </div>
            <form onSubmit={handleAddNote} className="flex gap-3">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add an internal note..."
                className="flex-1 bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 text-xs focus:outline-none"
              />
              <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold px-5 py-2.5">
                Add Note
              </button>
            </form>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">

          {/* Timeline */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Timeline</h4>
            <div className="space-y-4">
              {bookingData.timeline.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-[#1a1a1f] last:border-0 last:pb-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{entry.action}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{entry.date} by {entry.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assign Consultant */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Assign Consultant</h4>
            <select className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 text-xs font-bold focus:outline-none">
              <option>Dr. Amara Okafor</option>
              <option>Emeka Nwosu</option>
              <option>Sarah Adeleke</option>
              <option>Dr. Yemi Ogunleye</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Actions</h4>
            <div className="space-y-2">
              <button className="w-full py-2.5 bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9] transition-all flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" /> Approve Booking
              </button>
              <button className="w-full py-2.5 border border-slate-200 dark:border-[#1a1a1f] text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#121215] transition-all flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" /> Send Message
              </button>
              <button className="w-full py-2.5 border border-slate-200 dark:border-[#1a1a1f] text-red-600 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/20 transition-all flex items-center justify-center gap-2">
                <XCircle className="h-4 w-4" /> Cancel Booking
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
