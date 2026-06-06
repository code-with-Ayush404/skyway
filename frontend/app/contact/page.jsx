"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Validate Form Data
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    // 2. Submit Inquiry
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch {
      toast.error("Failed to submit request. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-cream min-h-screen pb-24 text-left">
      {/* Hero Strip */}
      <div
        className="relative bg-primary-teal text-white py-16 md:py-20 text-center overflow-hidden border-b border-primary-teal-dk"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27, 77, 90, 0.9), rgba(19, 56, 66, 0.95)), url('https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="small-caps-label mb-2 inline-block" style={{ color: "#E6C75A" }}>
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Let&apos;s Plan Your Trip
          </h1>
          <p className="text-xs md:text-sm max-w-lg mx-auto mt-3 font-light leading-relaxed" style={{ color: "#E2E8F0" }}>
            Reach out with any custom itinerary inquiries, taxi hire
            requirements, or wedding car bookings.
          </p>
        </div>
      </div>

      {/* Main Form + Info Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-border-soft rounded-card shadow-sm p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-primary-teal">
              Send Us a Message
            </h2>
            <p className="text-xs text-text-muted">
              Fill out this form and our customer experience coordinators will
              contact you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-[10px] uppercase tracking-wider font-semibold text-text-muted"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className="px-3 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-[10px] uppercase tracking-wider font-semibold text-text-muted"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., +91 98765 43210"
                  className="px-3 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[10px] uppercase tracking-wider font-semibold text-text-muted"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="px-3 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-[10px] uppercase tracking-wider font-semibold text-text-muted"
              >
                Your Message / Request
              </label>
              <textarea
                name="message"
                id="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Tell us about your trip plans, required car configuration, dates, or other specific inquiries..."
                className="px-3 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3 rounded-btn text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md disabled:opacity-50 tracking-wider uppercase"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-primary-teal">
              Contact Information
            </h2>
            <p className="text-xs text-text-muted">
              Connect with our office directly via call, email, or WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Card 1: Office */}
            <div className="bg-white border border-border-soft p-5 rounded-card shadow-sm text-left flex gap-4 items-start">
              <div className="p-3 bg-emerald-50 rounded-full shrink-0 text-success-green">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                  OFFICE HEADQUARTERS
                </span>
                <span className="font-serif font-bold text-primary-teal text-sm">
                  Ayodhya Main Office
                </span>
                <span className="text-xs text-text-muted leading-relaxed">
                  Lakhnauti Road, Ayodhya, Uttar Pradesh, 224001
                </span>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white border border-border-soft p-5 rounded-card shadow-sm text-left flex gap-4 items-start">
              <div className="p-3 bg-amber-50 rounded-full shrink-0 text-accent-gold">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                  DIRECT CALL SUPPORT
                </span>
                <span className="font-serif font-bold text-primary-teal text-sm">
                  24/7 Hotline
                </span>
                <a
                  href="tel:+919876543210"
                  className="text-xs text-text-muted hover:underline hover:text-accent-gold"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white border border-border-soft p-5 rounded-card shadow-sm text-left flex gap-4 items-start">
              <div className="p-3 bg-blue-50 rounded-full shrink-0 text-blue-900">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                  EMAIL ENQUIRIES
                </span>
                <span className="font-serif font-bold text-primary-teal text-sm">
                  Support Inbox
                </span>
                <a
                  href="mailto:hello@starlinetravel.in"
                  className="text-xs text-text-muted hover:underline hover:text-accent-gold"
                >
                  hello@starlinetravel.in
                </a>
              </div>
            </div>

            {/* Card 4: WhatsApp */}
            <div className="bg-white border border-border-soft p-5 rounded-card shadow-sm text-left flex gap-4 items-start">
              <div className="p-3 bg-green-50 rounded-full shrink-0 text-green-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                  QUICK CHAT
                </span>
                <span className="font-serif font-bold text-primary-teal text-sm">
                  WhatsApp Support
                </span>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Starline%20Travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted hover:underline hover:text-accent-gold"
                >
                  Click to Chat (Avg Reply: 5 mins)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Google Maps Embed Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <h3 className="font-serif text-xl font-bold text-primary-teal mb-6 text-left pl-2">
          Find Us in Ayodhya
        </h3>

        <div className="w-full h-96 rounded-card overflow-hidden border border-border-soft shadow-md bg-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.856950247656!2d82.19503417628867!3d26.796791665045054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07ecc1d8d9b9%3A0xe21dfcb7a6042ee1!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Starline Travel office location in Ayodhya, UP"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
