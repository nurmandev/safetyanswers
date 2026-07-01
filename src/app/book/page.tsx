"use client";

import { useState } from "react";
import { AccountLayout } from "@/components/AccountLayout";

const serviceCategories = [
  "NEBOSH Writer",
  "Health & Safety Consultant",
  "Academic Consultant",
  "Research Assistant",
  "Project Supervisor",
  "Dissertation Consultant",
  "Statistical Data Analyst",
  "Risk Assessment Specialist",
  "HSE Documentation Consultant",
];

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: "Jason Ranti",
    email: "jason.ranti@example.com",
    phone: "+44 20 1234 5678",
    whatsapp: "+44 20 1234 5678",
    country: "United Kingdom",
    service: "Academic Consultant",
    title: "",
    deadline: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.deadline && formData.description) {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <AccountLayout title="Booking Form" currentPath="/book">
        <div className="bg-white border border-slate-100 shadow-sm p-10 text-center flex flex-col items-center justify-center min-h-[50vh]">
          <div className="flex h-12 w-12 items-center justify-center bg-green-50 text-green-600 mb-6">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Consultation Booked Successfully</h3>
          <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
            Your brief has been submitted to our coordinators. Dr. Jenkins or Marcus Vance will review your reference parameters and contact you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Schedule Consultation" currentPath="/book">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h3 className="text-lg font-bold text-slate-955">Submit Project Brief</h3>
          <p className="text-xs text-slate-400 mt-1">
            Provide details about your academic draft, thesis metrics, or HSE safety documentation. File upload limits support up to 100 MB.
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Service Required
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              >
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. SPSS Dissertation Data Validation"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Target Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Budget (Optional)
              </label>
              <input
                type="text"
                name="budget"
                placeholder="e.g. $500"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Description
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="Detail your requirements, reference styles (APA, Harvard), or safety regulations (OSHA, NEBOSH)..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
            />
          </div>

          {/* Drag & Drop File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Upload Supporting Materials (Max 100 MB)
            </label>
            <div className="border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:border-slate-800 transition-colors">
              <svg className="h-6 w-6 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <p className="text-xs text-slate-700">Drag and drop files, or <span className="text-[#7c3aed] underline">browse local files</span></p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-8 py-4 transition-colors"
            >
              Submit Booking Form
            </button>
          </div>

        </form>

      </div>
    </AccountLayout>
  );
}