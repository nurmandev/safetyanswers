"use client";

import { useState, useEffect } from "react";
import { AccountLayout } from "@/components/AccountLayout";
import { useAuth } from "@/lib/auth-context";
import { profileApi, type ProfileData } from "@/lib/dashboard-api";
import { toast } from "sonner";

export default function AccountProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    institution: "",
    company: "",
    jobTitle: "",
    address: "",
    state: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileApi.getProfile();
        if (res.success && res.data) {
          const p = (res.data as any).user || res.data;
          setProfile(p);
          setFormData({
            name: p.name || "",
            phone: p.phone || "",
            country: p.country || "",
            institution: p.institution || "",
            company: p.company || "",
            jobTitle: p.jobTitle || "",
            address: p.address || "",
            state: p.state || "",
            city: p.city || "",
            bio: p.bio || "",
          });
        }
      } catch {
        // use auth context fallback
        if (user) {
          setFormData((prev) => ({
            ...prev,
            name: user.name || "",
            phone: user.phone || "",
            country: user.country || "",
            institution: user.institution || "",
          }));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await profileApi.updateProfile(formData);
      if (res.success) {
        toast.success("Profile updated successfully");
        if (res.data) {
          const p = (res.data as any).user || res.data;
          setProfile(p);
        }
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: "Full Name", field: "name", type: "text", required: true },
    { label: "Phone Number", field: "phone", type: "tel" },
    { label: "Country of Residence", field: "country", type: "text" },
    { label: "State / Province", field: "state", type: "text" },
    { label: "City", field: "city", type: "text" },
    { label: "Address", field: "address", type: "text" },
    { label: "Institution / Organization", field: "institution", type: "text" },
    { label: "Company", field: "company", type: "text" },
    { label: "Job Title", field: "jobTitle", type: "text" },
  ];

  return (
    <AccountLayout title="Profile Settings" currentPath="/account/profile">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h3 className="text-lg font-bold text-slate-955">Personal Parameters</h3>
          <p className="text-xs text-slate-400 mt-1">Configure your personal and corporate coordinates for invoice validation and advisor booking assignments.</p>
        </div>

        {loading ? (
          <div className="space-y-6 max-w-2xl">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse bg-slate-100" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.field} className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={(formData as any)[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                    required={field.required}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                maxLength={1000}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
              <p className="text-[10px] text-slate-400">{formData.bio.length}/1000 characters</p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (profile) {
                    setFormData({
                      name: profile.name || "",
                      phone: profile.phone || "",
                      country: profile.country || "",
                      institution: profile.institution || "",
                      company: profile.company || "",
                      jobTitle: profile.jobTitle || "",
                      address: profile.address || "",
                      state: profile.state || "",
                      city: profile.city || "",
                      bio: profile.bio || "",
                    });
                  }
                }}
                className="bg-transparent hover:bg-slate-50 text-slate-700 text-xs font-bold px-6 py-3 border border-slate-200 transition-colors"
              >
                Reset Changes
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 border border-slate-900 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Profile Details"}
              </button>
            </div>
          </form>
        )}
      </div>
    </AccountLayout>
  );
}
