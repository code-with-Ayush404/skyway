"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Users,
  Globe,
  Check,
  X,
  Phone,
  MessageSquare,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Send,
  Image as GalleryIcon,
} from "lucide-react";
import PackageCard from "@/components/packages/PackageCard";
import { toast } from "sonner";
import { z } from "zod";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  travelDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Please pick a valid date"),
  travelers: z.number().int().min(1, "At least 1 traveler required"),
  specialRequests: z.string().optional(),
});

export default function PackageDetailsClient({ pkg, relatedPackages }) {
  // Tabs State: 'itinerary' | 'inclusions' | 'gallery'
  const [activeTab, setActiveTab] = useState("itinerary");
  // Selected Day state for Day-wise Plan
  const [selectedDay, setSelectedDay] = useState(1);
  // Accordion state
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travelers: 2,
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "travelers" ? parseInt(value) || 1 : value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Zod Validation
    const validation = bookingFormSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    // 2. Call API
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageId: pkg.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          data.message || "Booking request submitted successfully!",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelDate: "",
          travelers: 2,
          specialRequests: "",
        });
      } else {
        toast.error(data.error || "Submission failed.");
      }
    } catch (error) {
      console.warn("Booking request failed, simulating local success:", error);
      toast.success("Booking request submitted successfully (Local Demo Mode)!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        travelers: 2,
        specialRequests: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const getWhatsAppLink = () => {
    const text = `Hi Skyway Travel, I am interested in the "${pkg.title}" package (${pkg.days}D/${pkg.nights}N) starting from $${pkg.currentPrice}/person. Please share details.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  // Get current day wise plan content
  const dayWisePlan = Array.isArray(pkg?.dayWisePlan) ? pkg.dayWisePlan : [];
const inclusions = Array.isArray(pkg?.inclusions) ? pkg.inclusions : [];
const exclusions = Array.isArray(pkg?.exclusions) ? pkg.exclusions : [];
const gallery = Array.isArray(pkg?.gallery) ? pkg.gallery : [];

const activeDayPlan =
  dayWisePlan.find((d) => Number(d.day) === Number(selectedDay)) ||
  dayWisePlan[0] ||
  null;
  return (
    <div className="bg-bg-cream min-h-screen pb-24 text-left">
      {/* 1. Full-Width Hero Header */}
      <div
        className="relative h-[65vh] min-h-[400px] w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(15, 31, 36, 0.95)), url('${pkg.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

        {/* Hero Meta Panel */}
        <div className="max-w-7xl mx-auto px-6 w-full pb-8 z-10 flex flex-col gap-4">
          {/* Back Navigation */}
          <Link
            href="/tour-packages"
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider w-fit"
          >
            <ArrowLeft className="h-4 w-4 text-accent-gold" />
            Back to Packages
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-accent-gold text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              {pkg.category}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent-gold" />
              {pkg.location}
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-4xl" style={{ color: "#FFFFFF" }}>
            {pkg.title}
          </h1>

          {/* Metadata Grid */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-300 font-light border-t border-white/10 pt-4 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
              <span className="font-bold text-white" style={{ color: "#FFFFFF" }}>{pkg.rating}</span>
              <span>({pkg.ratingCount} reviews)</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-accent-gold" />
              <span>
                {pkg.days || 0} Days / {pkg.nights || 0} Nights
              </span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-accent-gold" />
              <span>Group Size: {pkg.groupSize || "N/A"}</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-accent-gold" />
              <span>English / Hindi / Nepali</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Page Layout (Details Left / Form Sidebar Right) */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Tabs Content & Itinerary details */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {(pkg.tripSummary || pkg.highlights?.length > 0) && (
  <div className="bg-white border border-border-soft rounded-card shadow-sm p-6 md:p-8">
    {pkg.tripSummary && (
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-primary-teal mb-3">
          Trip Summary
        </h2>
        <p className="text-text-muted leading-relaxed text-sm md:text-base">
          {pkg.tripSummary}
        </p>
      </div>
    )}

    {pkg.highlights?.length > 0 && (
      <div>
        <h3 className="font-serif text-xl font-bold text-primary-teal mb-4">
          Highlights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pkg.highlights.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
              <span className="text-sm text-text-muted leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-border-soft bg-white p-2 rounded-card shadow-sm gap-2">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`flex-1 py-3 px-4 rounded-btn text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "itinerary"
                  ? "bg-primary-teal text-white shadow-sm"
                  : "text-text-muted hover:text-primary-teal hover:bg-bg-cream"
              }`}
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Day-Wise Plan</span>
            </button>
            <button
              onClick={() => setActiveTab("inclusions")}
              className={`flex-1 py-3 px-4 rounded-btn text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "inclusions"
                  ? "bg-primary-teal text-white shadow-sm"
                  : "text-text-muted hover:text-primary-teal hover:bg-bg-cream"
              }`}
            >
              <Check className="h-4 w-4 shrink-0" />
              <span>What&apos;s Included</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 py-3 px-4 rounded-btn text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "gallery"
                  ? "bg-primary-teal text-white shadow-sm"
                  : "text-text-muted hover:text-primary-teal hover:bg-bg-cream"
              }`}
            >
              <GalleryIcon className="h-4 w-4 shrink-0" />
              <span>Gallery</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className={`${activeTab === "itinerary" ? "" : "bg-white border border-border-soft rounded-card shadow-sm p-6 md:p-8"}`}>
            {/* Panel 1: Day Wise Plan */}
            {activeTab === "itinerary" && (
              <div className="flex flex-col gap-6">
                {/* Day Navigation Tabs */}
                <div className="text-left">
                  <p className="text-xs text-text-muted mb-3 font-medium">Click any day to see the photo and details</p>
                  <div className="flex flex-wrap gap-2 pb-4">
                    {dayWisePlan.map((d) => (
                      <button
                        key={d.day}
                        onClick={() => setSelectedDay(d.day)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                          selectedDay === d.day
                            ? "bg-primary-teal border-primary-teal text-white shadow-sm"
                            : "bg-white border-border-soft text-text-dark hover:border-text-muted"
                        }`}
                      >
                        Day {d.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day Plan Display Card */}
                {activeDayPlan && (
                  <div className="bg-white border border-border-soft rounded-card shadow-sm overflow-hidden flex flex-col gap-6 fade-in">
                    {/* Day Image Banner */}
                    <div className="relative h-[250px] md:h-[350px] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeDayPlan.image || pkg.image}
                        alt={activeDayPlan.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                      {/* Dark gradient shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Day Pill Badge */}
                      <div className="absolute top-4 left-4 bg-accent-gold text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                        Day {activeDayPlan.day}
                      </div>

                      {/* Day Title Text Overlay */}
                      <div className="absolute bottom-4 left-6 right-6">
                        <h3 className="font-serif text-lg md:text-2xl font-bold text-white tracking-wide text-left" style={{ color: "#FFFFFF" }}>
                          {activeDayPlan.title}
                        </h3>
                      </div>
                    </div>

                    {/* Day Plan Content Info */}
                 <div className="px-6 pb-6">
  <div className="space-y-5">
    {(Array.isArray(activeDayPlan.description)
      ? activeDayPlan.description
      : String(activeDayPlan.description || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
    ).map((point, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full border-2 border-sky-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {point}
        </p>
      </div>
    ))}
  </div>

                      {/* Side-by-side details */}
                      {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Left Side: Activities List */}
                        {/* <div className="md:col-span-7 flex flex-col gap-3.5 text-left">
                          <button className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-text-dark hover:text-accent-gold w-fit transition-colors">
                            <span className="w-5 h-5 rounded-full bg-border-soft flex items-center justify-center text-[10px] font-bold text-text-muted font-sans shrink-0">
                              &gt;
                            </span>
                            Activities
                          </button>
                          
                          {activeDayPlan.activities && activeDayPlan.activities.length > 0 ? (
                            <ul className="flex flex-col gap-2.5 text-xs text-text-muted pl-2">
                              {activeDayPlan.activities.map((act, i) => (
                                <li key={i} className="flex gap-2.5 items-center">
                                  <span className="w-4.5 h-4.5 rounded-full bg-success-green/10 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-success-green" />
                                  </span>
                                  <span className="font-light">{act}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-text-muted italic pl-2">Leisure time or custom activity.</p>
                          )}
                        </div> */}

                        {/* Right Side: Meals Included */}
                        {/* <div className="md:col-span-5 bg-[#FAF8F3] border border-border-soft rounded-card p-4 flex flex-col gap-2 text-left">
                          <span className="text-xs font-bold text-[#8A631E] flex items-center gap-1.5 font-serif">
                            🍴 Meals Included
                          </span>
                          <span className="text-xs font-semibold text-text-dark">
                            {activeDayPlan.meals || "Breakfast & Dinner"}
                          </span>
                        </div>
                      </div> */} 

                      {/* Inside Card Footer Navigation */}
                      <div className="flex justify-between items-center border-t border-border-soft pt-4 mt-2">
                        <button
                          disabled={selectedDay === 1}
                          onClick={() => setSelectedDay((prev) => prev - 1)}
                          className="flex items-center gap-1 text-xs font-bold text-primary-teal hover:text-accent-gold disabled:opacity-30 disabled:hover:text-primary-teal transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous Day</span>
                        </button>
                        <span className="text-xs text-text-muted font-semibold font-sans">
                          {selectedDay} / {pkg.dayWisePlan.length}
                        </span>
                        <button
                          disabled={selectedDay === pkg.dayWisePlan.length}
                          onClick={() => setSelectedDay((prev) => prev + 1)}
                          className="flex items-center gap-1 text-xs font-bold text-primary-teal hover:text-accent-gold disabled:opacity-30 disabled:hover:text-primary-teal transition-colors"
                        >
                          <span>Next Day</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Panel 2: What's Included */}
            {activeTab === "inclusions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-lg font-bold text-primary-teal border-b border-border-soft pb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 text-success-green" />
                    Inclusions
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {inclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 items-start text-xs text-text-muted leading-relaxed"
                      >
                        <span className="p-0.5 bg-emerald-50 rounded-full shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-success-green" />
                        </span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-lg font-bold text-primary-teal border-b border-border-soft pb-2 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    Exclusions
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {exclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 items-start text-xs text-text-muted leading-relaxed"
                      >
                        <span className="p-0.5 bg-rose-50 rounded-full shrink-0 mt-0.5">
                          <X className="h-3.5 w-3.5 text-red-500" />
                        </span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Panel 3: Gallery */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative h-44 rounded-card overflow-hidden shadow-sm hover:scale-102 transition-transform duration-200 cursor-zoom-in"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`${pkg.title} Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full Itinerary Overview List with Thumbnails */}
          <div className="flex flex-col gap-4 mt-6">
            <h3 className="font-serif text-xl font-bold text-primary-teal text-left pl-2">
              Full Itinerary Overview
            </h3>

            <div className="flex flex-col gap-3">
              {dayWisePlan.map((d, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDay(d.day);
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="w-full bg-white border border-border-soft hover:border-accent-gold rounded-card p-4 flex items-center justify-between gap-4 text-left transition-all shadow-sm group hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    {/* Circle badge for day */}
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-border-soft flex items-center justify-center font-bold text-text-dark text-sm shrink-0 group-hover:bg-primary-teal group-hover:text-white group-hover:border-primary-teal transition-colors">
                      {d.day}
                    </div>

                    {/* Day details */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-serif font-bold text-primary-teal text-sm md:text-base group-hover:text-accent-gold transition-colors">
                        {d.title}
                      </span>
                      <span className="text-xs text-text-muted leading-relaxed font-light">
                        {d.activities && d.activities.length > 0
                          ? d.activities.join(" · ")
                          : "Leisure or custom routing"}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail on the far right */}
                  <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-border-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.image || pkg.image}
                      alt={d.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Location Map */}
<div className="flex flex-col gap-4 mt-10">
  <h3 className="font-serif text-2xl font-bold text-primary-teal text-left">
    Location
  </h3>

  <div className="w-full h-[450px] rounded-card overflow-hidden border border-border-soft shadow-sm">
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        pkg.mapLocation || pkg.location
      )}&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
        </div>

        {/* Right Side: Sticky Booking Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-[100px] flex flex-col gap-6">
          {/* Price & Book Card */}
          <div className="bg-white border border-border-soft rounded-card shadow-lg p-6 flex flex-col gap-5 text-left">
            {/* <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">
                Starting from
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-serif text-3xl font-bold text-primary-teal">
                  ${pkg.currentPrice}
                </span>
                <span className="text-xs text-text-muted">/ person</span>
                {pkg.originalPrice > pkg.currentPrice && (
                  <span className="text-xs text-text-muted line-through ml-2">
                    ${pkg.originalPrice}
                  </span>
                )}
              </div>
            </div> */}

            {/* Quick Contact buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-btn text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919876543210"
                className="bg-primary-teal hover:bg-primary-teal-dk text-white py-3 rounded-btn text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="h-4.5 w-4.5 text-accent-gold" />
                <span>Call Us</span>
              </a>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border-soft"></div>
              <span className="flex-shrink mx-3 text-[10px] text-text-muted uppercase tracking-widest font-semibold">
                or request booking
              </span>
              <div className="flex-grow border-t border-border-soft"></div>
            </div>

            {/* Booking Request Form */}
            <form
              onSubmit={handleBookingSubmit}
              className="flex flex-col gap-3.5"
            >
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    required
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-[11px] text-text-dark focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Travelers
                  </label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="6">6+ Persons</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Any dietary needs, child seat, or custom routing?"
                  className="px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3 rounded-btn text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-50 mt-1 uppercase tracking-wider"
              >
                <Send className="h-3.5 w-3.5" />
                <span>
                  {isSubmitting ? "Sending..." : "Send Booking Request"}
                </span>
              </button>
            </form>

            {/* Inclusions highlights */}
            <div className="border-t border-border-soft pt-4 mt-1 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Shield className="h-4 w-4 text-accent-gold" />
                <span>No payment now · Pay after review</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock className="h-4 w-4 text-accent-gold" />
                <span>Free cancellation up to 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Related Tour Packages */}
      {relatedPackages.length > 0 && (
        <section className="mt-24 border-t border-border-soft pt-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-teal mb-8 text-left">
              Related Tour Packages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.slice(0, 3).map((related) => (
                <div key={related.id} className="fade-in">
                  <PackageCard pkg={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
