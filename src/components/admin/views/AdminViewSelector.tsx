"use client";

import React from "react";
import { DashboardOverview } from "./DashboardOverview";
import { ContentManagement } from "./ContentManagement";
import { ServiceManagement } from "./ServiceManagement";
import { BookingManagement } from "./BookingManagement";
import { FinanceManagement } from "./FinanceManagement";
import { UserManagement } from "./UserManagement";
import { EngagementManagement } from "./EngagementManagement";
import { AssetManagement } from "./AssetManagement";
import { SystemManagement } from "./SystemManagement";

export function AdminViewSelector({
 tab,
 searchQuery = ""
}: {
 tab: string;
 searchQuery?: string;
}) {
 switch (tab) {
 case "dashboard":
 return <DashboardOverview />;
 
 // Content Views
 case "posts":
 return <ContentManagement tab="posts" />;
 case "premium":
 return <ContentManagement tab="premium" />;
 case "categories":
 return <ContentManagement tab="categories" />;
 case "tags":
 return <ContentManagement tab="tags" />;
 
 // Services
 case "academic":
 return <ServiceManagement tab="academic" />;
 case "professional-writing":
 return <ServiceManagement tab="professional-writing" />;
 case "health-safety":
 return <ServiceManagement tab="health-safety" />;

 // Bookings
 case "bookings":
 return <BookingManagement />;
 case "bookings-pending":
 return <BookingManagement filterStatus="pending" />;
 case "bookings-approved":
 return <BookingManagement filterStatus="approved" />;
 case "bookings-completed":
 return <BookingManagement filterStatus="completed" />;
 case "bookings-cancelled":
 return <BookingManagement filterStatus="cancelled" />;

 // Payments
 case "payments":
 return <FinanceManagement tab="transactions" />;
 case "refunds":
 return <FinanceManagement tab="refunds" />;
 case "gateways":
 return <FinanceManagement tab="gateways" />;

 // Users
 case "users":
 return <UserManagement tab="users" />;
 case "guests":
 return <UserManagement tab="guests" />;

 // Engagement
 case "testimonials":
 return <EngagementManagement tab="testimonials" />;
 case "newsletter":
 return <EngagementManagement tab="newsletter" />;

 // Assets
 case "media":
 return <AssetManagement tab="media" />;
 case "uploads":
 return <AssetManagement tab="uploads" />;

 // Systems & Analytics
 case "reports":
 return <SystemManagement tab="reports" />;
 case "analytics":
 return <SystemManagement tab="analytics" />;
 case "settings":
 return <SystemManagement tab="settings" />;
 case "roles":
 return <SystemManagement tab="roles" />;
 case "logs":
 return <SystemManagement tab="logs" />;
 case "support":
 return <SystemManagement tab="support" />;
 case "faqs":
 return <SystemManagement tab="faqs" />;
 case "profile":
 return <SystemManagement tab="profile" />;
 case "notifications":
 return <SystemManagement tab="notifications" />;
 case "search":
 return <SystemManagement tab="search" searchQueryParam={searchQuery} />;
 case "health":
 return <SystemManagement tab="health" />;

 default:
 return <DashboardOverview />;
 }
}
