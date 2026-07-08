"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AccountLayout } from "@/components/AccountLayout";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

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
  "Health & Safety Consultation",
  "Academic Consultation",
  "Training Session",
  "Corporate Consultation",
  "Site Inspection",
  "Virtual Consultation",
  "Physical Consultation",
  "Custom Service",
];

interface Service {
  _id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  shortDescription: string;
}

interface BookingResponse {
  booking: {
    bookingId: string;
    name: string;
    email: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
  };
}

export default function BookPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    whatsapp: "",
    country: "",
    service: "",
    title: "",
    deadline: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [bookingResult, setBookingResult] = useState<BookingResponse["booking"] | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get<{ services: Service[] }>("/bookings/services");
        if (res.success && res.data?.services) {
          setServices(res.data.services);
        }
      } catch {
        // Services will use hardcoded list if API fails
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.deadline || !formData.description) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const selectedService = services.find((s) => s.name === formData.service);
      const category = selectedService?.category || formData.service;

      let uploadedFiles: Array<{ name: string; url: string; publicId: string; type: string; size: number }> = [];
      if (files.length > 0) {
        uploadedFiles = await uploadFiles();
      }

      const res = await api.post<BookingResponse>("/bookings", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        country: formData.country,
        service: formData.service,
        category: category,
        title: formData.title,
        description: formData.description,
        preferredDate: formData.deadline,
        preferredTime: "10:00",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        duration: 60,
        meetingType: "virtual",
        budget: formData.budget ? parseFloat(formData.budget.replace(/[^0-9.]/g, "")) : undefined,
        currency: "USD",
        documents: uploadedFiles,
      });

      if (res.success) {
        setBookingResult((res.data as BookingResponse).booking);
        setSubmitted(true);
      } else {
        setError(res.message || "Failed to submit booking. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<Array<{ name: string; url: string; publicId: string; type: string; size: number }>> => {
    if (files.length === 0) return [];
    setUploadingFiles(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const res = await api.upload<{ files: Array<{ name: string; url: string; publicId: string; type: string; size: number }> }>("/bookings/upload", formData);
      if (res.success && res.data?.files) {
        return res.data.files;
      }
      return [];
    } catch {
      return [];
    } finally {
      setUploadingFiles(false);
    }
  };

  if (submitted && bookingResult) {
    return (
      <AccountLayout title="Booking Confirmation" currentPath="/book">
        <div className="bg-white border border-slate-100 shadow-sm p-10 text-center flex flex-col items-center justify-center min-h-[50vh]">
          <div className="flex h-12 w-12 items-center justify-center bg-green-50 text-green-600 mb-6">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Consultation Booked Successfully</h3>
          <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
            Your brief has been submitted to our coordinators. You will receive a confirmation email shortly.
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-100 p-6 text-left w-full max-w-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Booking Details</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID</span>
                <span className="font-bold text-slate-900">{bookingResult.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service</span>
                <span className="font-bold text-slate-900">{bookingResult.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-900">
                  {new Date(bookingResult.preferredDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time</span>
                <span className="font-bold text-slate-900">{bookingResult.preferredTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/account/bookings")}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setBookingResult(null);
                setFormData({
                  name: user?.name || "",
                  email: user?.email || "",
                  phone: "",
                  whatsapp: "",
                  country: "",
                  service: "",
                  title: "",
                  deadline: "",
                  budget: "",
                  description: "",
                });
              }}
              className="border border-slate-200 hover:border-slate-800 text-slate-700 text-xs font-bold px-6 py-3 transition-colors"
            >
              Book Another
            </button>
          </div>
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

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs">
            {error}
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Full Name *
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
                Email Address *
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
                Phone Number *
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
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Service Required *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              >
                <option value="">Select a service</option>
                {services.length > 0
                  ? services.map((s) => (
                      <option key={s._id} value={s.name}>
                        {s.name}
                      </option>
                    ))
                  : serviceCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Title *
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
                Target Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
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
              Project Description *
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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:border-slate-800 transition-colors"
            >
              <svg className="h-6 w-6 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <p className="text-xs text-slate-700">Drag and drop files, or <span className="text-[#7c3aed] underline">browse local files</span></p>
              <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, DOCX, PNG, JPEG (Max 100MB each)</p>
            </div>
            {files.length > 0 && (
              <div className="space-y-2 mt-3">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <svg className="h-4 w-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="truncate">{file.name}</span>
                      <span className="text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700 ml-2 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading || uploadingFiles}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-8 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingFiles ? "Uploading files..." : loading ? "Submitting..." : "Submit Booking Form"}
            </button>
          </div>

        </form>

      </div>
    </AccountLayout>
  );
}
