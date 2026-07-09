"use client";

import { useState, useEffect } from "react";
import { AccountLayout } from "@/components/AccountLayout";
import { supportApi, SupportTicket, SupportFAQ, SupportCategory, SupportReply } from "@/lib/support-api";
import { toast } from "sonner";

export default function AccountSupportPage() {
  const [activeTab, setActiveTab] = useState<"faqs" | "tickets" | "new_ticket" | "ticket_detail">("faqs");
  const [faqs, setFaqs] = useState<SupportFAQ[]>([]);
  const [categories, setCategories] = useState<SupportCategory[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<{ ticket: SupportTicket; replies: SupportReply[] } | null>(null);
  const [faqLoading, setFaqLoading] = useState(true);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketDetailLoading, setTicketDetailLoading] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketStatusFilter, setTicketStatusFilter] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, hasNext: false, hasPrev: false });
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // New ticket form
  const [newTicket, setNewTicket] = useState({ subject: "", category: "", priority: "medium", description: "" });
  const [submittingTicket, setSubmittingTicket] = useState(false);

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
    fetchTickets();
  }, []);

  const fetchFAQs = async () => {
    setFaqLoading(true);
    try {
      const res = await supportApi.getFAQs();
      if (res.success && res.data?.faqs) {
        setFaqs(res.data.faqs);
      }
    } catch {
      toast.error("Failed to load FAQs");
    } finally {
      setFaqLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await supportApi.getCategories();
      if (res.success && res.data?.categories) {
        setCategories(res.data.categories);
      }
    } catch {}
  };

  const fetchTickets = async (page = 1, status?: string, search?: string) => {
    setTicketsLoading(true);
    try {
      const res = await supportApi.getTickets({ page, limit: 10, status, search });
      if (res.success && res.data?.tickets) {
        setTickets(res.data.tickets);
        setPagination(res.data.pagination);
      }
    } catch {
      toast.error("Failed to load tickets");
    } finally {
      setTicketsLoading(false);
    }
  };

  const fetchTicketDetail = async (ticketId: string) => {
    setTicketDetailLoading(true);
    try {
      const res = await supportApi.getTicketById(ticketId);
      if (res.success && res.data?.ticket) {
        setSelectedTicket({ ticket: res.data.ticket, replies: res.data.replies || [] });
        setActiveTab("ticket_detail");
      }
    } catch {
      toast.error("Failed to load ticket");
    } finally {
      setTicketDetailLoading(false);
    }
  };

  const submitTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim() || !newTicket.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmittingTicket(true);
    try {
      const res = await supportApi.createTicket(newTicket);
      if (res.success) {
        toast.success("Ticket created successfully");
        setNewTicket({ subject: "", category: "", priority: "medium", description: "" });
        setActiveTab("tickets");
        fetchTickets();
      } else {
        toast.error(res.message || "Failed to create ticket");
      }
    } catch {
      toast.error("Failed to create ticket");
    } finally {
      setSubmittingTicket(false);
    }
  };

  const sendReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await supportApi.addReply(selectedTicket.ticket.ticketId, { message: replyText });
      if (res.success && res.data?.reply) {
        setSelectedTicket({
          ...selectedTicket,
          replies: [...selectedTicket.replies, res.data.reply],
        });
        setReplyText("");
        toast.success("Reply sent");
      } else {
        toast.error(res.message || "Failed to send reply");
      }
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    open: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    awaiting_customer: "bg-purple-100 text-purple-700",
    resolved: "bg-slate-100 text-slate-600",
    closed: "bg-slate-100 text-slate-400",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <AccountLayout title="Support Center" currentPath="/account/support">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-lg font-bold text-slate-950">Support & Help Center</h3>
          <p className="text-xs text-slate-400 mt-1">Find answers to common questions or submit a support ticket.</p>
        </div>

        <div className="flex gap-1 border-b border-slate-100 mb-6 overflow-x-auto">
          {[
            { id: "faqs" as const, label: "FAQs" },
            { id: "tickets" as const, label: "My Tickets" },
            { id: "new_ticket" as const, label: "New Ticket" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-slate-900 text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQs TAB */}
        {activeTab === "faqs" && (
          <div className="max-w-3xl">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 mb-6"
            />

            {faqLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-50 animate-pulse" />
                ))}
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">No FAQs found.</div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div key={faq._id} className="border border-slate-100">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-900 pr-4">{faq.question}</span>
                      <span className="text-slate-400 text-lg flex-shrink-0">
                        {expandedFaq === faq._id ? "−" : "+"}
                      </span>
                    </button>
                    {expandedFaq === faq._id && (
                      <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div className="max-w-3xl">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Search tickets..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchTickets(1, ticketStatusFilter, ticketSearch);
                }}
                className="flex-1 px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
              />
              <select
                value={ticketStatusFilter}
                onChange={(e) => {
                  setTicketStatusFilter(e.target.value);
                  fetchTickets(1, e.target.value, ticketSearch);
                }}
                className="px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-slate-800"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="awaiting_customer">Awaiting Reply</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {ticketsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-50 animate-pulse" />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-xs mb-4">No tickets found.</p>
                <button
                  onClick={() => setActiveTab("new_ticket")}
                  className="px-4 py-2 text-[10px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Create a Ticket
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket._id}
                      onClick={() => fetchTicketDetail(ticket.ticketId)}
                      className="w-full text-left p-4 border border-slate-100 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-slate-400">{ticket.ticketId}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold ${statusColors[ticket.status] || "bg-slate-100 text-slate-600"}`}>
                              {ticket.status.replace(/_/g, " ")}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 truncate">{ticket.subject}</h5>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {ticket.category} · {new Date(ticket.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-slate-300 text-sm">→</span>
                      </div>
                    </button>
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      onClick={() => fetchTickets(pagination.page - 1, ticketStatusFilter, ticketSearch)}
                      disabled={!pagination.hasPrev}
                      className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 disabled:opacity-40 hover:border-slate-800 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1.5 text-[10px] text-slate-500">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => fetchTickets(pagination.page + 1, ticketStatusFilter, ticketSearch)}
                      disabled={!pagination.hasNext}
                      className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 disabled:opacity-40 hover:border-slate-800 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* NEW TICKET TAB */}
        {activeTab === "new_ticket" && (
          <div className="max-w-3xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Submit a Support Ticket</h4>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Subject *</label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Category *</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-slate-800"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="General">General</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Account">Account</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-slate-800"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Description *</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Provide detailed information about your issue..."
                rows={6}
                className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitTicket}
                disabled={submittingTicket}
                className="px-6 py-2.5 text-[10px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {submittingTicket ? "Submitting..." : "Submit Ticket"}
              </button>
              <button
                onClick={() => setActiveTab("tickets")}
                className="px-6 py-2.5 text-[10px] font-bold border border-slate-200 text-slate-700 hover:border-slate-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* TICKET DETAIL TAB */}
        {activeTab === "ticket_detail" && selectedTicket && (
          <div className="max-w-3xl">
            <button
              onClick={() => {
                setActiveTab("tickets");
                setSelectedTicket(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-900 mb-4 inline-flex items-center gap-1"
            >
              ← Back to tickets
            </button>

            <div className="border border-slate-100 p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400">{selectedTicket.ticket.ticketId}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold ${statusColors[selectedTicket.ticket.status] || "bg-slate-100 text-slate-600"}`}>
                  {selectedTicket.ticket.status.replace(/_/g, " ")}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 capitalize">
                  {selectedTicket.ticket.priority}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{selectedTicket.ticket.subject}</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                {selectedTicket.ticket.category} · Created {new Date(selectedTicket.ticket.createdAt).toLocaleString()}
              </p>
              <div className="mt-3 text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                {selectedTicket.ticket.description}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h5 className="text-xs font-bold text-slate-900">Conversation</h5>
              {selectedTicket.replies.length === 0 ? (
                <p className="text-[11px] text-slate-400">No replies yet.</p>
              ) : (
                selectedTicket.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className={`p-4 border ${
                      reply.senderType === "admin" ? "border-blue-100 bg-blue-50/30" : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-slate-900">
                        {typeof reply.sender === "object" ? reply.sender.name : "Support Agent"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                      {reply.senderType === "admin" && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700">Staff</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 whitespace-pre-wrap">{reply.message}</p>
                  </div>
                ))
              )}
            </div>

            {selectedTicket.ticket.status !== "closed" && selectedTicket.ticket.status !== "cancelled" && (
              <div className="border border-slate-100 p-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={3}
                  className="w-full px-4 py-3 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 resize-none mb-3"
                />
                <button
                  onClick={sendReply}
                  disabled={sendingReply || !replyText.trim()}
                  className="px-6 py-2.5 text-[10px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
