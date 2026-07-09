"use client";

import { useState, useEffect, useRef } from "react";
import { AccountLayout } from "@/components/AccountLayout";
import { messagesApi, Conversation, Message } from "@/lib/messages-api";
import { toast } from "sonner";

export default function AccountMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"inbox" | "conversation">("inbox");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationsPagination, setConversationsPagination] = useState({ page: 1, totalPages: 1, hasNext: false, hasPrev: false });
  const [messagesPagination, setMessagesPagination] = useState({ page: 1, totalPages: 1, hasNext: false, hasPrev: false });

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async (page = 1, search?: string) => {
    setConversationsLoading(true);
    try {
      const res = await messagesApi.getConversations({ page, limit: 20, search });
      if (res.success && res.data?.conversations) {
        setConversations(res.data.conversations);
        setConversationsPagination(res.data.pagination);
      }
    } catch {
      toast.error("Failed to load conversations");
    } finally {
      setConversationsLoading(false);
    }
  };

  const openConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setActiveTab("conversation");
    setMessagesLoading(true);
    try {
      const res = await messagesApi.getMessages(conversation._id);
      if (res.success && res.data?.messages) {
        setMessages(res.data.messages);
        setMessagesPagination(res.data.pagination);
        await messagesApi.markAsRead(conversation._id).catch(() => {});
        setConversations((prev) =>
          prev.map((c) => (c._id === conversation._id ? { ...c, unreadCount: 0 } : c))
        );
      }
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;
    setSendingMessage(true);
    try {
      const res = await messagesApi.sendMessage(selectedConversation._id, { content: newMessage });
      if (res.success && res.data?.message) {
        setMessages((prev) => [...prev, res.data.message]);
        setNewMessage("");
        setConversations((prev) =>
          prev.map((c) =>
            c._id === selectedConversation._id
              ? { ...c, lastMessage: res.data.message, lastMessageAt: new Date().toISOString() }
              : c
          )
        );
      } else {
        toast.error(res.message || "Failed to send message");
      }
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getOtherParticipant = (conv: Conversation) => {
    return conv.participants.find((p) => p._id !== (selectedConversation?._id ? "" : ""));
  };

  const getConversationName = (conv: Conversation) => {
    if (conv.subject) return conv.subject;
    if (conv.participants.length === 2) {
      return conv.participants.map((p) => p.name).join(", ");
    }
    return conv.participants.map((p) => p.name).join(", ");
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <AccountLayout title="Messages" currentPath="/account/messages">
      <div className="bg-white border border-slate-100 shadow-sm h-[calc(100vh-200px)] flex flex-col">
        <div className="border-b border-slate-100 p-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Messages</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Your conversations and inbox</p>
          </div>
          {activeTab === "conversation" && selectedConversation && (
            <button
              onClick={() => {
                setActiveTab("inbox");
                setSelectedConversation(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-900 lg:hidden"
            >
              ← Back
            </button>
          )}
        </div>

        <div className="flex flex-1 min-h-0">
          {/* CONVERSATIONS LIST */}
          <div className={`w-full lg:w-80 border-r border-slate-100 flex flex-col ${activeTab === "conversation" ? "hidden lg:flex" : "flex"}`}>
            <div className="p-3 border-b border-slate-100 flex-shrink-0">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchConversations(1, searchQuery);
                }}
                className="w-full px-3 py-2 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="space-y-1 p-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-slate-50 animate-pulse" />
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No conversations found.
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv._id}
                    onClick={() => openConversation(conv)}
                    className={`w-full text-left p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                      selectedConversation?._id === conv._id ? "bg-slate-50 border-l-2 border-l-slate-900" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0">
                        {conv.participants[0]?.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {getConversationName(conv)}
                          </h5>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">
                            {formatTime(conv.lastMessageAt)}
                          </span>
                        </div>
                        {conv.lastMessage && (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {typeof conv.lastMessage === "object" ? conv.lastMessage.content : ""}
                          </p>
                        )}
                        {(conv.unreadCount || 0) > 0 && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {conversationsPagination.totalPages > 1 && (
              <div className="p-3 border-t border-slate-100 flex justify-center gap-2 flex-shrink-0">
                <button
                  onClick={() => fetchConversations(conversationsPagination.page - 1, searchQuery)}
                  disabled={!conversationsPagination.hasPrev}
                  className="px-2 py-1 text-[10px] font-bold border border-slate-200 disabled:opacity-40"
                >
                  ←
                </button>
                <span className="px-2 py-1 text-[10px] text-slate-500">
                  {conversationsPagination.page}/{conversationsPagination.totalPages}
                </span>
                <button
                  onClick={() => fetchConversations(conversationsPagination.page + 1, searchQuery)}
                  disabled={!conversationsPagination.hasNext}
                  className="px-2 py-1 text-[10px] font-bold border border-slate-200 disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* MESSAGE AREA */}
          <div className={`flex-1 flex flex-col min-h-0 ${activeTab === "inbox" ? "hidden lg:flex" : "flex"}`}>
            {!selectedConversation ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                Select a conversation to start messaging
              </div>
            ) : (
              <>
                {/* Conversation Header */}
                <div className="p-3 border-b border-slate-100 flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab("inbox");
                      setSelectedConversation(null);
                    }}
                    className="text-slate-400 hover:text-slate-900 lg:hidden text-sm"
                  >
                    ←
                  </button>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-900">
                      {getConversationName(selectedConversation)}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      {selectedConversation.participants.length} participant(s)
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messagesLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-slate-50 animate-pulse w-2/3" />
                      ))}
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isOwn = typeof msg.sender === "object" && msg.sender._id !== selectedConversation.participants[0]?._id;
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 ${
                              isOwn
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-900"
                            }`}
                          >
                            {typeof msg.sender === "object" && !isOwn && (
                              <p className="text-[10px] font-bold mb-1 opacity-70">{msg.sender.name}</p>
                            )}
                            <p className="text-xs whitespace-pre-wrap">{msg.isDeleted ? "This message has been deleted" : msg.content}</p>
                            <p className={`text-[9px] mt-1 ${isOwn ? "text-slate-400" : "text-slate-500"}`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              {msg.readBy.length > 1 && isOwn && " · Read"}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {selectedConversation.type !== "broadcast" && (
                  <div className="p-3 border-t border-slate-100 flex-shrink-0">
                    <div className="flex gap-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        rows={1}
                        className="flex-1 px-4 py-2.5 text-xs border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 resize-none"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={sendingMessage || !newMessage.trim()}
                        className="px-4 py-2.5 text-[10px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50 flex-shrink-0"
                      >
                        {sendingMessage ? "..." : "Send"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
