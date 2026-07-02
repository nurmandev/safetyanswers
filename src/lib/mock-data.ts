import type { ClassValue } from "clsx";

export interface AdminKpiCard {
  id: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  color: string;
  sparklineData: number[];
}

export const adminKpiCards: AdminKpiCard[] = [
  { id: "total-revenue", label: "Total Revenue", value: "$284,650.00", change: "+18.3%", positive: true, icon: "DollarSign", color: "text-green-600", sparklineData: [21000, 22500, 21800, 24000, 23500, 25500, 24800, 26000, 27500, 26800, 28200, 29000, 28500, 29600] },
  { id: "revenue-today", label: "Revenue Today", value: "$3,240.00", change: "+5.2%", positive: true, icon: "TrendingUp", color: "text-blue-600", sparklineData: [1200, 1800, 1500, 2100, 2400, 1900, 2600, 2300, 2800, 2500, 2700, 3000, 2900, 3240] },
  { id: "revenue-month", label: "Revenue This Month", value: "$38,240.00", change: "+12.4%", positive: true, icon: "Calendar", color: "text-indigo-600", sparklineData: [8200, 9100, 8700, 9600, 10200, 9800, 11500, 12400, 11800, 13200, 14100, 13800, 15200, 38240] },
  { id: "premium-sales", label: "Premium Article Sales", value: "$4,680.00", change: "+31.5%", positive: true, icon: "FileText", color: "text-purple-600", sparklineData: [180, 220, 210, 280, 260, 340, 320, 380, 360, 410, 390, 430, 450, 4680] },
  { id: "consultation-revenue", label: "Consultation Revenue", value: "$12,840.00", change: "+8.7%", positive: true, icon: "Users", color: "text-teal-600", sparklineData: [5200, 5800, 5400, 6100, 5900, 6700, 6300, 7200, 6900, 7800, 7400, 8100, 7900, 12840] },
  { id: "total-users", label: "Total Registered Users", value: "3,847", change: "+14.2%", positive: true, icon: "UserPlus", color: "text-sky-600", sparklineData: [2800, 2950, 3010, 3120, 3200, 3350, 3410, 3520, 3600, 3680, 3720, 3780, 3820, 3847] },
  { id: "active-users", label: "Active Users", value: "1,234", change: "+7.8%", positive: true, icon: "Activity", color: "text-emerald-600", sparklineData: [980, 1020, 1050, 1100, 1080, 1140, 1120, 1180, 1160, 1200, 1190, 1220, 1210, 1234] },
  { id: "guest-purchases", label: "Guest Purchases", value: "342", change: "+22.1%", positive: true, icon: "ShoppingCart", color: "text-orange-600", sparklineData: [180, 200, 195, 220, 210, 240, 235, 260, 250, 280, 275, 300, 310, 342] },
  { id: "pending-bookings", label: "Pending Bookings", value: "24", change: "-8.1%", positive: true, icon: "Clock", color: "text-amber-600", sparklineData: [38, 35, 40, 36, 32, 34, 30, 28, 31, 27, 26, 29, 25, 24] },
  { id: "approved-bookings", label: "Approved Bookings", value: "18", change: "+15.4%", positive: true, icon: "CheckCircle", color: "text-lime-600", sparklineData: [10, 12, 11, 14, 13, 16, 15, 17, 14, 18, 16, 19, 17, 18] },
  { id: "completed-projects", label: "Completed Projects", value: "142", change: "+23.7%", positive: true, icon: "Briefcase", color: "text-cyan-600", sparklineData: [85, 90, 92, 98, 102, 108, 110, 115, 118, 124, 128, 130, 136, 142] },
  { id: "blog-articles", label: "Blog Articles", value: "64", change: "+4.9%", positive: true, icon: "PenTool", color: "text-rose-600", sparklineData: [52, 54, 55, 56, 58, 57, 59, 60, 58, 61, 62, 63, 63, 64] },
  { id: "premium-articles", label: "Premium Articles", value: "28", change: "+33.3%", positive: true, icon: "Award", color: "text-violet-600", sparklineData: [18, 18, 19, 20, 20, 21, 22, 23, 23, 24, 25, 26, 27, 28] },
  { id: "newsletter-subs", label: "Newsletter Subscribers", value: "2,156", change: "+11.6%", positive: true, icon: "Mail", color: "text-pink-600", sparklineData: [1800, 1850, 1880, 1920, 1950, 1980, 2000, 2030, 2050, 2070, 2090, 2110, 2130, 2156] },
];

export interface RevenueDataPoint { date: string; revenue: number }

export const revenueData: Record<string, RevenueDataPoint[]> = {
  daily: [
    { date: "Jun 18", revenue: 2100 }, { date: "Jun 19", revenue: 2450 }, { date: "Jun 20", revenue: 2200 },
    { date: "Jun 21", revenue: 2780 }, { date: "Jun 22", revenue: 2540 }, { date: "Jun 23", revenue: 3200 },
    { date: "Jun 24", revenue: 2900 }, { date: "Jun 25", revenue: 3450 }, { date: "Jun 26", revenue: 3150 },
    { date: "Jun 27", revenue: 3680 }, { date: "Jun 28", revenue: 3400 }, { date: "Jun 29", revenue: 3820 },
    { date: "Jun 30", revenue: 3580 }, { date: "Jul 01", revenue: 3240 },
  ],
  weekly: [
    { date: "Wk 18", revenue: 14200 }, { date: "Wk 19", revenue: 15800 }, { date: "Wk 20", revenue: 15100 },
    { date: "Wk 21", revenue: 17200 }, { date: "Wk 22", revenue: 16800 }, { date: "Wk 23", revenue: 18400 },
    { date: "Wk 24", revenue: 17900 }, { date: "Wk 25", revenue: 19500 }, { date: "Wk 26", revenue: 18800 },
    { date: "Wk 27", revenue: 21200 }, { date: "Wk 28", revenue: 20600 }, { date: "Wk 29", revenue: 22400 },
  ],
  monthly: [
    { date: "Aug", revenue: 28500 }, { date: "Sep", revenue: 31200 }, { date: "Oct", revenue: 29800 },
    { date: "Nov", revenue: 34100 }, { date: "Dec", revenue: 42800 }, { date: "Jan", revenue: 35400 },
    { date: "Feb", revenue: 33800 }, { date: "Mar", revenue: 37100 }, { date: "Apr", revenue: 36200 },
    { date: "May", revenue: 38900 }, { date: "Jun", revenue: 41200 }, { date: "Jul", revenue: 38240 },
  ],
  yearly: [
    { date: "2022", revenue: 198400 }, { date: "2023", revenue: 245600 }, { date: "2024", revenue: 284100 },
    { date: "2025", revenue: 352800 }, { date: "2026", revenue: 284650 },
  ],
};

export interface BookingAnalytics { status: string; count: number; color: string }

export const bookingAnalytics: BookingAnalytics[] = [
  { status: "Pending", count: 24, color: "#f59e0b" },
  { status: "Approved", count: 18, color: "#3b82f6" },
  { status: "Completed", count: 45, color: "#22c55e" },
  { status: "Cancelled", count: 8, color: "#ef4444" },
  { status: "Rescheduled", count: 5, color: "#8b5cf6" },
];

export interface ServicePerformance { label: string; value: string; sub: string }

export const servicePerformance: ServicePerformance[] = [
  { label: "Most Requested Service", value: "PhD Dissertation Audit", sub: "142 bookings" },
  { label: "Highest Revenue Service", value: "NEBOSH Compliance Audit", sub: "$64,200.00" },
  { label: "Least Requested Service", value: "CV Formatting", sub: "12 bookings" },
  { label: "Average Project Budget", value: "$680.00", sub: "Across all services" },
  { label: "Average Completion Time", value: "6.4 days", sub: "Per project" },
];

export interface PaymentGatewayData { name: string; value: number; color: string }

export const paymentByGateway: PaymentGatewayData[] = [
  { name: "Stripe", value: 45, color: "#635bff" },
  { name: "Paystack", value: 28, color: "#0ba95b" },
  { name: "Flutterwave", value: 15, color: "#f7a440" },
  { name: "PayPal", value: 8, color: "#003087" },
  { name: "Manual Transfer", value: 4, color: "#64748b" },
];

export interface Booking { id: string; customer: string; service: string; deadline: string; budget: string; consultant: string; status: string }

export const recentBookings: Booking[] = [
  { id: "BK-1042", customer: "Chidi Okonkwo", service: "PhD Dissertation Audit", deadline: "Jul 20, 2026", budget: "$1,200.00", consultant: "Dr. Amara Okafor", status: "Approved" },
  { id: "BK-1041", customer: "Funmilayo Adebayo", service: "NEBOSH Compliance Audit", deadline: "Jul 15, 2026", budget: "$2,400.00", consultant: "Emeka Nwosu", status: "In Progress" },
  { id: "BK-1040", customer: "Kofi Mensah", service: "SOP Writing Service", deadline: "Jul 08, 2026", budget: "$350.00", consultant: "Sarah Adeleke", status: "Completed" },
  { id: "BK-1039", customer: "Ngozi Eze", service: "Research Proposal Development", deadline: "Jul 25, 2026", budget: "$890.00", consultant: "Dr. Amara Okafor", status: "Pending" },
  { id: "BK-1038", customer: "Tunde Balogun", service: "SPSS Data Analysis", deadline: "Jul 12, 2026", budget: "$450.00", consultant: "Dr. Yemi Ogunleye", status: "Approved" },
  { id: "BK-1037", customer: "Akua Asante", service: "CV Formatting", deadline: "Jul 05, 2026", budget: "$120.00", consultant: "Sarah Adeleke", status: "Completed" },
  { id: "BK-1036", customer: "Emeka Obi", service: "HSE Risk Assessment", deadline: "Jul 30, 2026", budget: "$1,800.00", consultant: "Emeka Nwosu", status: "Approved" },
  { id: "BK-1035", customer: "Zainab Abdullah", service: "PhD Dissertation Audit", deadline: "Aug 05, 2026", budget: "$1,500.00", consultant: "Dr. Amara Okafor", status: "Pending" },
  { id: "BK-1034", customer: "Kwame Boakye", service: "Personal Statement Review", deadline: "Jul 03, 2026", budget: "$180.00", consultant: "Sarah Adeleke", status: "Rescheduled" },
  { id: "BK-1033", customer: "Yetunde Osho", service: "NEBOSH Compliance Audit", deadline: "Jul 28, 2026", budget: "$2,600.00", consultant: "Emeka Nwosu", status: "Approved" },
];

export interface Payment { customer: string; amount: string; gateway: string; invoice: string; date: string; status: string }

export const recentPayments: Payment[] = [
  { customer: "Chidi Okonkwo", amount: "$1,200.00", gateway: "Stripe", invoice: "INV-1042", date: "Jul 01, 2026", status: "Successful" },
  { customer: "Funmilayo Adebayo", amount: "$2,400.00", gateway: "Paystack", invoice: "INV-1041", date: "Jun 30, 2026", status: "Successful" },
  { customer: "Ngozi Eze", amount: "$890.00", gateway: "Flutterwave", invoice: "INV-1040", date: "Jun 29, 2026", status: "Pending" },
  { customer: "Tunde Balogun", amount: "$450.00", gateway: "Stripe", invoice: "INV-1039", date: "Jun 28, 2026", status: "Successful" },
  { customer: "Akua Asante", amount: "$120.00", gateway: "Paystack", invoice: "INV-1038", date: "Jun 27, 2026", status: "Successful" },
  { customer: "Emeka Obi", amount: "$1,800.00", gateway: "Manual Transfer", invoice: "INV-1037", date: "Jun 26, 2026", status: "Pending" },
  { customer: "Zainab Abdullah", amount: "$500.00", gateway: "PayPal", invoice: "INV-1036", date: "Jun 25, 2026", status: "Failed" },
  { customer: "Yakubu Suleiman", amount: "$320.00", gateway: "Flutterwave", invoice: "INV-1035", date: "Jun 24, 2026", status: "Successful" },
];

export interface User { name: string; email: string; country: string; registered: string; membership: string; purchases: number; avatar: string }

export const latestUsers: User[] = [
  { name: "Chidi Okonkwo", email: "chidi.okonkwo@gmail.com", country: "Nigeria", registered: "Jul 01, 2026", membership: "Premium", purchases: 4, avatar: "CO" },
  { name: "Funmilayo Adebayo", email: "funmi.adebayo@yahoo.com", country: "Nigeria", registered: "Jun 28, 2026", membership: "Enterprise", purchases: 7, avatar: "FA" },
  { name: "Kofi Mensah", email: "kofi.mensah@outlook.com", country: "Ghana", registered: "Jun 25, 2026", membership: "Free", purchases: 1, avatar: "KM" },
  { name: "Ngozi Eze", email: "ngozi.eze@unilag.edu.ng", country: "Nigeria", registered: "Jun 22, 2026", membership: "Premium", purchases: 3, avatar: "NE" },
  { name: "Tunde Balogun", email: "tunde.balogun@protonmail.com", country: "Nigeria", registered: "Jun 19, 2026", membership: "Free", purchases: 2, avatar: "TB" },
  { name: "Akua Asante", email: "akua.asante@gmail.com", country: "Ghana", registered: "Jun 17, 2026", membership: "Premium", purchases: 5, avatar: "AA" },
  { name: "Emeka Obi", email: "emeka.obi@shell.ng", country: "Nigeria", registered: "Jun 14, 2026", membership: "Enterprise", purchases: 9, avatar: "EO" },
  { name: "Zainab Abdullah", email: "zainab.abdullah@kano.edu.ng", country: "Nigeria", registered: "Jun 10, 2026", membership: "Free", purchases: 1, avatar: "ZA" },
];

export interface BlogPost { title: string; category: string; views: number; premium: boolean; published: string; status: string }

export const latestBlogPosts: BlogPost[] = [
  { title: "Understanding NEBOSH IGC: A Complete Guide", category: "HSE", views: 2840, premium: false, published: "Jul 01, 2026", status: "Published" },
  { title: "How to Write a PhD Research Proposal in 7 Days", category: "Academic", views: 4530, premium: false, published: "Jun 28, 2026", status: "Published" },
  { title: "Advanced SPSS Techniques for Survey Analysis", category: "Data", views: 1210, premium: true, published: "Jun 25, 2026", status: "Published" },
  { title: "Top 10 HSE Compliance Mistakes in Manufacturing", category: "HSE", views: 3210, premium: false, published: "Jun 22, 2026", status: "Published" },
  { title: "Crafting a Winning Scholarship SOP", category: "Writing", views: 5120, premium: false, published: "Jun 20, 2026", status: "Published" },
  { title: "Mixed Methods Research: A Practical Approach", category: "Academic", views: 890, premium: true, published: "Jun 18, 2026", status: "Published" },
  { title: "ISO 45001: Implementation Roadmap for SMEs", category: "HSE", views: 1670, premium: true, published: "Jul 05, 2026", status: "Scheduled" },
  { title: "The Future of Academic Publishing in Africa", category: "Academic", views: 0, premium: false, published: "Jul 10, 2026", status: "Draft" },
];

export interface PremiumArticle { thumbnail: string; title: string; price: string; sales: number; revenue: string }

export const topPremiumArticles: PremiumArticle[] = [
  { thumbnail: "/thumbnails/spss-guide.jpg", title: "Advanced SPSS Techniques for PhD Research", price: "$29.00", sales: 142, revenue: "$4,118.00" },
  { thumbnail: "/thumbnails/hse-checklist.jpg", title: "HSE Audit Checklist for Manufacturing Plants", price: "$19.00", sales: 98, revenue: "$1,862.00" },
  { thumbnail: "/thumbnails/methods-guide.jpg", title: "Mixed Methods Research: A Practical Approach", price: "$24.00", sales: 76, revenue: "$1,824.00" },
  { thumbnail: "/thumbnails/dissertation-proposal.jpg", title: "Writing a Winning Dissertation Proposal", price: "$34.00", sales: 65, revenue: "$2,210.00" },
  { thumbnail: "/thumbnails/nebosh-questions.jpg", title: "NEBOSH Exam Questions & Answers Bank", price: "$49.00", sales: 54, revenue: "$2,646.00" },
  { thumbnail: "/thumbnails/cv-template.jpg", title: "Professional CV Templates for Academia", price: "$14.00", sales: 112, revenue: "$1,568.00" },
];

export interface PopularService { name: string; bookings: number; revenue: string; growth: string; positive: boolean }

export const popularServices: PopularService[] = [
  { name: "PhD Dissertation Audit", bookings: 142, revenue: "$85,200.00", growth: "+24.3%", positive: true },
  { name: "NEBOSH Compliance Audit", bookings: 88, revenue: "$64,200.00", growth: "+18.7%", positive: true },
  { name: "SPSS Data Analysis", bookings: 64, revenue: "$28,800.00", growth: "+31.2%", positive: true },
  { name: "Research Proposal Development", bookings: 52, revenue: "$36,400.00", growth: "+12.8%", positive: true },
  { name: "SOP Writing Service", bookings: 46, revenue: "$16,100.00", growth: "-3.5%", positive: false },
  { name: "HSE Risk Assessment", bookings: 38, revenue: "$45,600.00", growth: "+9.1%", positive: true },
];

export interface Activity { action: string; description: string; time: string; icon: string; color: string }

export const activityTimeline: Activity[] = [
  { action: "New User Registered", description: "Chidi Okonkwo signed up for a Premium account", time: "2 min ago", icon: "UserPlus", color: "text-green-500" },
  { action: "Payment Received", description: "$1,200.00 via Stripe from Chidi Okonkwo", time: "15 min ago", icon: "DollarSign", color: "text-blue-500" },
  { action: "Booking Approved", description: "PhD Dissertation Audit for Chidi Okonkwo", time: "1 hr ago", icon: "CheckCircle", color: "text-emerald-500" },
  { action: "Project Completed", description: "NEBOSH Audit for Funmilayo Adebayo marked done", time: "2 hr ago", icon: "Briefcase", color: "text-purple-500" },
  { action: "Consultant Assigned", description: "Dr. Amara Okafor → Ngozi Eze (Research Proposal)", time: "3 hr ago", icon: "Users", color: "text-indigo-500" },
  { action: "Article Published", description: "Understanding NEBOSH IGC went live", time: "4 hr ago", icon: "FileText", color: "text-rose-500" },
  { action: "Refund Processed", description: "$49.00 refunded to Yakubu Suleiman", time: "5 hr ago", icon: "RotateCcw", color: "text-orange-500" },
  { action: "New Review Posted", description: "5-star review from Kofi Mensah", time: "6 hr ago", icon: "Star", color: "text-yellow-500" },
  { action: "Subscription Upgraded", description: "Tunde Balogun upgraded to Premium", time: "8 hr ago", icon: "Award", color: "text-cyan-500" },
  { action: "Booking Rescheduled", description: "Kwame Boakye moved Personal Statement to Jul 03", time: "10 hr ago", icon: "Calendar", color: "text-violet-500" },
  { action: "Content Flagged", description: "User reported outdated NEBOSH guide", time: "1 day ago", icon: "AlertTriangle", color: "text-red-500" },
  { action: "Backup Completed", description: "Daily database backup finished successfully", time: "2 days ago", icon: "Database", color: "text-slate-500" },
];

export interface Notification { type: string; message: string; time: string; urgent: boolean }

export const notificationsData: Notification[] = [
  { type: "Booking Update", message: "Chidi Okonkwo's PhD audit has been approved.", time: "1 hr ago", urgent: false },
  { type: "Payment Alert", message: "Large payment of $2,400.00 received via Paystack.", time: "2 hr ago", urgent: false },
  { type: "System Warning", message: "API response time exceeded 500ms threshold.", time: "3 hr ago", urgent: true },
  { type: "New Registration", message: "Funmilayo Adebayo registered as Enterprise.", time: "4 hr ago", urgent: false },
  { type: "Project Deadline", message: "Kofi Mensah's SOP is due tomorrow.", time: "6 hr ago", urgent: true },
  { type: "Review Alert", message: "New 1-star review requires attention.", time: "8 hr ago", urgent: true },
  { type: "Subscription Expiry", message: "3 Premium subscriptions expiring this week.", time: "1 day ago", urgent: false },
  { type: "Update Available", message: "New platform update v2.4.1 is ready to deploy.", time: "2 days ago", urgent: false },
];

export interface SystemHealth { name: string; status: string; latency: string; healthy: boolean }

export const systemHealthData: SystemHealth[] = [
  { name: "Database", status: "Operational", latency: "12ms", healthy: true },
  { name: "Storage", status: "Operational", latency: "8ms", healthy: true },
  { name: "Email Service", status: "Operational", latency: "45ms", healthy: true },
  { name: "Payment Gateways", status: "Operational", latency: "120ms", healthy: true },
  { name: "API", status: "Degraded", latency: "320ms", healthy: false },
  { name: "Web Server", status: "Operational", latency: "24ms", healthy: true },
  { name: "Backups", status: "Operational", latency: "—", healthy: true },
  { name: "Security", status: "Operational", latency: "—", healthy: true },
];

export interface ReportSnapshot { label: string; value: string; change: string }

export const reportsSnapshot: ReportSnapshot[] = [
  { label: "Total Revenue (This Month)", value: "$38,240.00", change: "+12.4%" },
  { label: "Total Bookings", value: "94", change: "+8.2%" },
  { label: "New Users", value: "128", change: "+22.1%" },
  { label: "Premium Sales", value: "$4,680.00", change: "+31.5%" },
  { label: "File Downloads", value: "342", change: "+18.7%" },
  { label: "Top Country", value: "Nigeria", change: "42% of traffic" },
  { label: "Top Device", value: "Mobile", change: "58% of users" },
  { label: "Traffic Source", value: "Organic Search", change: "45% of traffic" },
];

export interface UserSummaryCard { label: string; value: string; icon: string; color: string }

export const userSummaryCards: UserSummaryCard[] = [
  { label: "Total Purchases", value: "12", icon: "ShoppingBag", color: "text-blue-600" },
  { label: "Active Consultations", value: "3", icon: "CalendarCheck", color: "text-green-600" },
  { label: "Completed Projects", value: "8", icon: "CheckCircle", color: "text-emerald-600" },
  { label: "Downloads", value: "24", icon: "Download", color: "text-purple-600" },
  { label: "Saved Articles", value: "7", icon: "Bookmark", color: "text-amber-600" },
  { label: "Membership", value: "Premium", icon: "Award", color: "text-yellow-600" },
  { label: "Wallet Balance", value: "$120.00", icon: "Wallet", color: "text-teal-600" },
  { label: "Referral Bonus", value: "$24.00", icon: "Gift", color: "text-pink-600" },
];

export interface UserPurchase { title: string; thumbnail: string; purchaseDate: string; price: string }

export const userPurchases: UserPurchase[] = [
  { title: "Advanced SPSS Techniques for PhD Research", thumbnail: "/thumbnails/spss-guide.jpg", purchaseDate: "Jul 01, 2026", price: "$29.00" },
  { title: "HSE Audit Checklist for Manufacturing Plants", thumbnail: "/thumbnails/hse-checklist.jpg", purchaseDate: "Jun 28, 2026", price: "$19.00" },
  { title: "NEBOSH Exam Questions & Answers Bank", thumbnail: "/thumbnails/nebosh-questions.jpg", purchaseDate: "Jun 22, 2026", price: "$49.00" },
  { title: "Professional CV Templates for Academia", thumbnail: "/thumbnails/cv-template.jpg", purchaseDate: "Jun 18, 2026", price: "$14.00" },
  { title: "Mixed Methods Research: A Practical Approach", thumbnail: "/thumbnails/methods-guide.jpg", purchaseDate: "Jun 10, 2026", price: "$24.00" },
  { title: "Writing a Winning Dissertation Proposal", thumbnail: "/thumbnails/dissertation-proposal.jpg", purchaseDate: "Jun 05, 2026", price: "$34.00" },
];

export interface UserConsultation { service: string; status: string; deadline: string; consultant: string; progress: number }

export const userConsultations: UserConsultation[] = [
  { service: "PhD Dissertation Audit", status: "In Progress", deadline: "Jul 20, 2026", consultant: "Dr. Amara Okafor", progress: 35 },
  { service: "Research Proposal Development", status: "Approved", deadline: "Jul 25, 2026", consultant: "Dr. Amara Okafor", progress: 10 },
  { service: "SPSS Data Analysis", status: "Completed", deadline: "Jul 02, 2026", consultant: "Dr. Yemi Ogunleye", progress: 100 },
  { service: "CV Formatting", status: "Completed", deadline: "Jun 28, 2026", consultant: "Sarah Adeleke", progress: 100 },
  { service: "SOP Writing Service", status: "Completed", deadline: "Jun 20, 2026", consultant: "Sarah Adeleke", progress: 100 },
  { service: "Personal Statement Review", status: "Rescheduled", deadline: "Jul 03, 2026", consultant: "Sarah Adeleke", progress: 0 },
];

export interface ConsultationProgressStep { label: string; completed: boolean; date: string }

export const consultationProgressSteps: ConsultationProgressStep[] = [
  { label: "Booking Submitted", completed: true, date: "Jun 28, 2026" },
  { label: "Approved", completed: true, date: "Jun 29, 2026" },
  { label: "Consultant Assigned", completed: true, date: "Jun 30, 2026" },
  { label: "In Progress", completed: false, date: "Expected: Jul 14" },
  { label: "Completed", completed: false, date: "Pending" },
];

export interface UserPayment { invoice: string; amount: string; gateway: string; date: string; status: string }

export const userPayments: UserPayment[] = [
  { invoice: "INV-1042", amount: "$1,200.00", gateway: "Stripe", date: "Jul 01, 2026", status: "Successful" },
  { invoice: "INV-1039", amount: "$450.00", gateway: "Stripe", date: "Jun 28, 2026", status: "Successful" },
  { invoice: "INV-1034", amount: "$29.00", gateway: "Paystack", date: "Jun 25, 2026", status: "Successful" },
  { invoice: "INV-1028", amount: "$49.00", gateway: "Flutterwave", date: "Jun 22, 2026", status: "Successful" },
  { invoice: "INV-1021", amount: "$24.00", gateway: "Paystack", date: "Jun 15, 2026", status: "Successful" },
  { invoice: "INV-1015", amount: "$34.00", gateway: "Stripe", date: "Jun 05, 2026", status: "Successful" },
];

export interface DownloadItem { name: string; type: string; date: string; size: string }

export const downloadItems: DownloadItem[] = [
  { name: "SPSS Data Analysis Template", type: "PDF", date: "Jul 01, 2026", size: "2.4 MB" },
  { name: "NEBOSH Risk Assessment Guide", type: "PDF", date: "Jun 28, 2026", size: "4.1 MB" },
  { name: "Dissertation Structure Framework", type: "DOCX", date: "Jun 25, 2026", size: "1.8 MB" },
  { name: "SOP Writing Checklist", type: "PDF", date: "Jun 22, 2026", size: "890 KB" },
  { name: "Research Proposal Template", type: "DOCX", date: "Jun 20, 2026", size: "3.2 MB" },
  { name: "Invoice - INV-1042", type: "PDF", date: "Jul 01, 2026", size: "245 KB" },
];

export interface SavedArticle { title: string; category: string; savedDate: string }

export const savedArticles: SavedArticle[] = [
  { title: "How to Structure a Dissertation Proposal", category: "Academic", savedDate: "Jun 30, 2026" },
  { title: "NEBOSH Essentials for Modern Workplaces", category: "HSE", savedDate: "Jun 28, 2026" },
  { title: "Writing a Persuasive SOP", category: "Writing", savedDate: "Jun 25, 2026" },
  { title: "Understanding Research Methodology", category: "Academic", savedDate: "Jun 22, 2026" },
];

export interface RecommendedArticle { title: string; reason: string; price: string }

export const recommendedArticles: RecommendedArticle[] = [
  { title: "Advanced SPSS Techniques for PhD Research", reason: "Based on your SPSS purchase", price: "$29.00" },
  { title: "HSE Audit Checklist for Manufacturing", reason: "Related to your NEBOSH booking", price: "$19.00" },
  { title: "Crafting a Standout Personal Statement", reason: "Popular among writing clients", price: "$14.00" },
  { title: "Qualitative vs Quantitative Methods", reason: "Purchased by similar clients", price: "$24.00" },
];

export interface UpcomingDeadline { title: string; date: string; time: string; type: string }

export const upcomingDeadlines: UpcomingDeadline[] = [
  { title: "PhD Proposal Review Meeting", date: "Jul 05, 2026", time: "10:00 AM", type: "Consultation" },
  { title: "NEBOSH Audit Draft Submission", date: "Jul 10, 2026", time: "11:59 PM", type: "Project" },
  { title: "SOP Revision Call", date: "Jul 12, 2026", time: "2:00 PM", type: "Consultation" },
  { title: "Final Dissertation Chapter", date: "Jul 20, 2026", time: "11:59 PM", type: "Project" },
];

export interface UserNotification { type: string; message: string; time: string; icon: string }

export const userNotifications: UserNotification[] = [
  { type: "Booking Update", message: "Your PhD consultation has been approved.", time: "2 hours ago", icon: "Calendar" },
  { type: "Payment Confirmed", message: "Payment of $29.00 for SPSS Template confirmed.", time: "5 hours ago", icon: "DollarSign" },
  { type: "Content Unlocked", message: "Premium article 'Research Methods' is now available.", time: "1 day ago", icon: "Lock" },
  { type: "Newsletter", message: "July Research Digest has been published.", time: "2 days ago", icon: "Mail" },
  { type: "Announcement", message: "New HSE compliance webinar available.", time: "3 days ago", icon: "Megaphone" },
];

export interface UserRecentActivity { action: string; description: string; time: string }

export const userRecentActivity: UserRecentActivity[] = [
  { action: "Purchased Article", description: "SPSS Data Analysis Template", time: "Today, 10:23 AM" },
  { action: "Downloaded File", description: "NEBOSH Risk Assessment Guide", time: "Yesterday, 3:45 PM" },
  { action: "Booked Consultation", description: "PhD Proposal Review - Dr. Jenkins", time: "Jun 30, 2026" },
  { action: "Payment Made", description: "$49.00 via Stripe", time: "Jun 30, 2026" },
  { action: "Profile Updated", description: "Contact information changed", time: "Jun 28, 2026" },
  { action: "Saved Article", description: "Understanding Research Methodology", time: "Jun 27, 2026" },
];
