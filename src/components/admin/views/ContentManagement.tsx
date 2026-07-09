"use client";

import React, { useState, useEffect } from "react";
import { premiumApi, PremiumArticle, ArticleCategory as PremiumCategory } from "@/lib/premium";
import {
 Search,
 Plus,
 Edit2,
 Trash2,
 Lock,
 Unlock,
 FileText,
 FolderOpen,
 Tag as TagIcon,
 ChevronRight,
 Eye,
 Copy,
 Calendar,
 Image as ImageIcon
} from "lucide-react";

// Mock Data
const mockPosts = [
 { id: 1, title: "How to Structure a Dissertation Proposal with Confidence", category: "Academic Support", author: "Dr. Jenkins", date: "2026-06-24", status: "Published", views: 245, premium: false },
 { id: 2, title: "NEBOSH Essentials for Modern Safety Teams", category: "Health & Safety", author: "Marcus Vance", date: "2026-06-18", status: "Scheduled", views: 120, premium: true, price: "$39.00" },
 { id: 3, title: "Writing a Persuasive SOP for International Study Applications", category: "Professional Writing", author: "Sarah Jenkins", date: "2026-06-12", status: "Draft", views: 0, premium: false }
];

const mockCategories = [
 { name: "Academic Support", slug: "academic", count: 18, desc: "Dissertation templates, variables schemas, thesis guides." },
 { name: "Health & Safety", slug: "health-safety", count: 10, desc: "Risk assessment frameworks, audit checklists." },
 { name: "Professional Writing", slug: "writing", count: 7, desc: "SOP workbooks, resume guides, business plans." }
];

const mockTags = [
 { name: "Research", usage: 14 },
 { name: "Dissertation", usage: 8 },
 { name: "NEBOSH", usage: 11 },
 { name: "CV Writing", usage: 6 },
 { name: "Data Analysis", usage: 15 },
 { name: "Compliance", usage: 9 }
];

export function ContentManagement({ tab }: { tab: "posts" | "premium" | "categories" | "tags" }) {
  const [activeTab, setActiveTab] = useState(tab);
  const [searchQuery, setSearchQuery] = useState("");

  // Premium API data
  const [premiumArticles, setPremiumArticles] = useState<PremiumArticle[]>([]);
  const [premiumCategories, setPremiumCategories] = useState<PremiumCategory[]>([]);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumPage, setPremiumPage] = useState(1);
  const [premiumTotal, setPremiumTotal] = useState(0);
  
  // Blog form modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academic Support");
  const [status, setStatus] = useState("Draft");
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState("$29.00");

  useEffect(() => {
    if (activeTab === "premium") {
      (async () => {
        setPremiumLoading(true);
        try {
          const [artRes, catRes] = await Promise.all([
            premiumApi.adminGetArticles({ page: premiumPage, limit: 10, search: searchQuery || undefined }),
            premiumApi.getCategories(),
          ]);
          if (artRes.success) {
            setPremiumArticles(artRes.data.articles);
            setPremiumTotal(artRes.data.pagination.total);
          }
          if (catRes.success) {
            setPremiumCategories(catRes.data.categories);
          }
        } catch {} finally {
          setPremiumLoading(false);
        }
      })();
    } else if (activeTab === "categories") {
      (async () => {
        try {
          const catRes = await premiumApi.getCategories();
          if (catRes.success) setPremiumCategories(catRes.data.categories);
        } catch {}
      })();
    }
  }, [activeTab, premiumPage]);

 const handleEditPost = (post: any) => {
 setEditingPost(post);
 setTitle(post.title);
 setCategory(post.category);
 setStatus(post.status);
 setIsPremium(post.premium);
 setPrice(post.price || "$29.00");
 setShowFormModal(true);
 };

 const handleCreatePost = () => {
 setEditingPost(null);
 setTitle("");
 setCategory("Academic Support");
 setStatus("Draft");
 setIsPremium(false);
 setPrice("$29.00");
 setShowFormModal(true);
 };

 return (
 <div className="space-y-6">
 
 {/* Tab Switcher Headers */}
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "posts", label: "Blog Posts", icon: FileText },
 { key: "premium", label: "Premium Articles", icon: Lock },
 { key: "categories", label: "Categories", icon: FolderOpen },
 { key: "tags", label: "Tags List", icon: TagIcon }
 ].map((item) => {
 const Icon = item.icon;
 const isActive = activeTab === item.key;
 return (
 <button
 key={item.key}
 onClick={() => setActiveTab(item.key as any)}
 className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
 isActive
 ? "border-blue-600 text-blue-600 dark:text-white"
 : "border-transparent hover:text-slate-800 dark:hover:text-slate-200"
 }`}
 >
 <Icon className="h-4 w-4" />
 <span>{item.label}</span>
 </button>
 );
 })}
 </div>

 {/* Control Actions Row (Search & Action triggers) */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder={`Search ${activeTab}...`}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none focus:border-blue-600"
 />
 </div>

  {activeTab === "posts" && (
  <button
  onClick={handleCreatePost}
  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm"
  >
  <Plus className="h-3.5 w-3.5" />
  <span>Create Article</span>
  </button>
  )}
  {activeTab === "premium" && (
  <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm">
  <Plus className="h-3.5 w-3.5" />
  <span>Add Premium Article</span>
  </button>
  )}
  {activeTab === "categories" && (
 <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm">
 <Plus className="h-3.5 w-3.5" />
 <span>Add Category</span>
 </button>
 )}
 {activeTab === "tags" && (
 <div className="flex gap-2">
 <button className="px-4 py-2 bg-white dark:bg-[#0c0c0e] border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800">
 Merge Tags
 </button>
 <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm">
 <Plus className="h-3.5 w-3.5" />
 <span>Add Tag</span>
 </button>
 </div>
 )}
 </div>

 {/* Grid Content Lists */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 
 {/* Active View Switch */}
 {activeTab === "posts" && (
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Post Title</th>
 <th className="py-4 px-6">Classification</th>
 <th className="py-4 px-6">Author</th>
 <th className="py-4 px-6">Date</th>
 <th className="py-4 px-6">Views</th>
 <th className="py-4 px-6">Lock Status</th>
 <th className="py-4 px-6">State</th>
 <th className="py-4 px-6 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockPosts.map((post) => (
 <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-4 px-6 font-bold text-slate-900 dark:text-white max-w-sm truncate">{post.title}</td>
 <td className="py-4 px-6 font-semibold">{post.category}</td>
 <td className="py-4 px-6 font-medium">{post.author}</td>
 <td className="py-4 px-6 text-slate-550">{post.date}</td>
 <td className="py-4 px-6 font-mono text-slate-500">{post.views}</td>
 <td className="py-4 px-6">
 <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold border px-2 py-0.5 ${
 post.premium 
 ? "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900" 
 : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-950/20"
 }`}>
 {post.premium ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
 {post.premium ? `Premium (${post.price})` : "Free Access"}
 </span>
 </td>
 <td className="py-4 px-6">
 <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold border ${
 post.status === "Published" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20" :
 post.status === "Scheduled" ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20" :
 "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-950/20"
 }`}>
 {post.status}
 </span>
 </td>
 <td className="py-4 px-6 text-right space-x-2">
 <button onClick={() => handleEditPost(post)} className="text-slate-500 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button>
 <button className="text-slate-500 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

  {activeTab === "premium" && (
  <div className="overflow-x-auto">
  <table className="w-full text-left border-collapse text-xs">
  <thead>
  <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
  <th className="py-4 px-6">Document Title</th>
  <th className="py-4 px-6">Pricing</th>
  <th className="py-4 px-6">Category</th>
  <th className="py-4 px-6">Status</th>
  <th className="py-4 px-6">Purchases</th>
  <th className="py-4 px-6">Downloads</th>
  <th className="py-4 px-6 text-right">Action</th>
  </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
  {premiumLoading ? (
    <tr><td colSpan={7} className="py-10 text-center text-slate-400 text-xs">Loading...</td></tr>
  ) : premiumArticles.length === 0 ? (
    <tr><td colSpan={7} className="py-10 text-center text-slate-400 text-xs">No premium articles found</td></tr>
  ) : premiumArticles.map((art) => {
    const catName = typeof art.category === "object" ? art.category?.name : "Uncategorized";
    return (
  <tr key={art._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white max-w-xs truncate">{art.title}</td>
  <td className="py-4 px-6 font-bold text-blue-600 dark:text-blue-400">{art.currency} {art.price.toFixed(2)}{art.discount > 0 ? ` (-${art.discount}%)` : ""}</td>
  <td className="py-4 px-6 font-medium text-slate-550">{catName}</td>
  <td className="py-4 px-6">
  <span className={`inline-block px-2.5 py-0.5 text-[9px] font-extrabold border ${art.status === "published" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20" : art.status === "draft" ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20"}`}>
  {art.status}
  </span>
  </td>
  <td className="py-4 px-6 font-bold">{art.purchaseCount || 0}</td>
  <td className="py-4 px-6 font-bold">{art.downloadCount || 0}</td>
  <td className="py-4 px-6 text-right">
  <button onClick={() => handleEditPost(art)} className="inline-flex h-8 px-4 items-center justify-center border border-slate-200 dark:border-[#1e1e24] hover:border-slate-800 text-[11px] font-bold transition-all">Configure</button>
  </td>
  </tr>
    );
  })}
  </tbody>
  </table>
  {premiumTotal > 10 && (
    <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-100">
      <button disabled={premiumPage <= 1} onClick={() => setPremiumPage(p => p - 1)} className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 hover:border-slate-800 disabled:opacity-30">Previous</button>
      <span className="text-[10px] text-slate-400">Page {premiumPage}</span>
      <button disabled={premiumArticles.length < 10} onClick={() => setPremiumPage(p => p + 1)} className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 hover:border-slate-800 disabled:opacity-30">Next</button>
    </div>
  )}
  </div>
  )}

  {activeTab === "categories" && (
  <div className="overflow-x-auto">
  <table className="w-full text-left border-collapse text-xs">
  <thead>
  <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
  <th className="py-4 px-6">Category Name</th>
  <th className="py-4 px-6">Slug Target</th>
  <th className="py-4 px-6">Description</th>
  <th className="py-4 px-6">Sort Order</th>
  <th className="py-4 px-6 text-right">Action</th>
  </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
  {premiumCategories.length === 0 ? (
    <tr><td colSpan={5} className="py-10 text-center text-slate-400 text-xs">No categories found</td></tr>
  ) : premiumCategories.map((cat) => (
  <tr key={cat._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{cat.name}</td>
  <td className="py-4 px-6 font-mono text-[10px] text-blue-600 dark:text-blue-400">/{cat.slug}</td>
  <td className="py-4 px-6 text-slate-500 dark:text-slate-450 max-w-sm truncate font-semibold">{cat.description || "-"}</td>
  <td className="py-4 px-6 font-bold">{cat.sortOrder || 0}</td>
  <td className="py-4 px-6 text-right space-x-2">
  <button className="text-slate-500 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button>
  <button className="text-slate-500 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
  </td>
  </tr>
  ))}
  </tbody>
  </table>
  </div>
  )}

 {activeTab === "tags" && (
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Tag Name</th>
 <th className="py-4 px-6">Usage Frequency</th>
 <th className="py-4 px-6 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockTags.map((tag) => (
 <tr key={tag.name} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-4 px-6">
 <span className="text-xs font-bold text-blue-600 dark:text-blue-450">
 #{tag.name}
 </span>
 </td>
 <td className="py-4 px-6 font-bold text-slate-550">Linked in {tag.usage} deliverables</td>
 <td className="py-4 px-6 text-right space-x-2">
 <button className="text-slate-500 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button>
 <button className="text-slate-500 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 </div>

 {/* 5. Create / Edit Post Modal */}
 {showFormModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
 <div className="w-full max-w-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-2xl p-8 space-y-6 overflow-y-auto max-h-[90vh]">
 
 <div className="border-b pb-4 flex justify-between items-center">
 <h3 className="text-base font-bold text-slate-950 dark:text-white">
 {editingPost ? "Edit Content Parameters" : "Draft New Article"}
 </h3>
 <button onClick={() => setShowFormModal(false)} className="text-slate-400 hover:text-slate-900">&times;</button>
 </div>

 <form onSubmit={(e) => { e.preventDefault(); setShowFormModal(false); }} className="space-y-4 text-xs">
 
 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Article Title</label>
 <input
 type="text"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none focus:border-blue-600"
 />
 </div>

 <div className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Category</label>
 <select
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 >
                  {premiumCategories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
 </select>
 </div>
 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Publish State</label>
 <select
 value={status}
 onChange={(e) => setStatus(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 >
 <option value="Draft">Draft</option>
 <option value="Published">Published</option>
 <option value="Scheduled">Scheduled</option>
 </select>
 </div>
 </div>

 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Upload Cover Image</label>
 <div className="border border-dashed border-slate-200 dark:border-[#1e1e24] bg-slate-50/50 p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:border-slate-800">
 <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
 <p className="text-[11px] text-slate-500">Drag/Drop cover graphics, or click to browse local files.</p>
 </div>
 </div>

 <div className="flex items-center gap-3">
 <input
 type="checkbox"
 id="premium-gate"
 checked={isPremium}
 onChange={(e) => setIsPremium(e.target.checked)}
 className="h-4 w-4 text-blue-600 "
 />
 <label htmlFor="premium-gate" className="font-bold text-slate-700 dark:text-slate-350">
 Lock article behind Premium Gate
 </label>
 </div>

 {isPremium && (
 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Unlock License Price ($)</label>
 <input
 type="text"
 value={price}
 onChange={(e) => setPrice(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none focus:border-blue-600"
 />
 </div>
 )}

 <div className="pt-4 border-t flex justify-end gap-3">
 <button
 type="button"
 onClick={() => setShowFormModal(false)}
 className="px-5 py-3 border border-slate-200 text-slate-700 dark:text-slate-300 font-bold"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
 >
 Save Changes
 </button>
 </div>

 </form>

 </div>
 </div>
 )}

 </div>
 );
}
