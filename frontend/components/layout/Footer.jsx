"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          data.message || "Thank you for subscribing to our newsletter!",
        );
        setEmail("");
      } else {
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-footer-dark text-white pt-16 pb-8 border-t border-primary-teal-dk">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
        {/* Col 1: Brand & Logo */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary-teal text-white p-2 rounded-btn">
              <Plane className="h-5 w-5 rotate-45 text-accent-gold" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Starline{" "}
              <span className="italic-accent text-xl font-normal lowercase">
                travel
              </span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Premium car rentals and curated journeys across India and Nepal.
            Drive beyond destinations, explore hidden wonders, and travel with
            luxury.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-semibold tracking-widest text-accent-gold font-sans">
            Explore
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link
              href="/tour-packages"
              className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
            >
              Tour Packages
            </Link>
            <Link
              href="/taxi-service"
              className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
            >
              Taxi Service
            </Link>
            <Link
              href="/wedding-rentals"
              className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
            >
              Wedding Rentals
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Col 3: Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-semibold tracking-widest text-accent-gold font-sans">
            Contact
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5 items-start text-sm text-gray-400">
              <MapPin className="h-4.5 w-4.5 text-accent-gold shrink-0 mt-0.5" />
              <span>Lakhnauti Road, Ayodhya, UP 224001</span>
            </div>
            <div className="flex gap-2.5 items-center text-sm text-gray-400">
              <Phone className="h-4.5 w-4.5 text-accent-gold shrink-0" />
              <a
                href="tel:+919876543210"
                className="hover:text-accent-gold transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
            <div className="flex gap-2.5 items-center text-sm text-gray-400">
              <Mail className="h-4.5 w-4.5 text-accent-gold shrink-0" />
              <a
                href="mailto:hello@starlinetravel.in"
                className="hover:text-accent-gold transition-colors"
              >
                hello@starlinetravel.in
              </a>
            </div>
          </div>
        </div>

        {/* Col 4: Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-semibold tracking-widest text-accent-gold font-sans">
            Newsletter
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Get curated travel deals and updates straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-btn text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent-gold text-white px-4 py-2 rounded-btn hover:bg-accent-gold-lt transition-colors text-sm font-semibold flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? "..." : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div>
          © {new Date().getFullYear()} Starline Travel. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="hover:text-accent-gold transition-colors"
          >
            Privacy Policy
          </Link>
          <span>·</span>
          <Link
            href="/terms"
            className="hover:text-accent-gold transition-colors"
          >
            Terms of Service
          </Link>
          <span>·</span>
          <Link
            href="/cookies"
            className="hover:text-accent-gold transition-colors"
          >
            Cookies Settings
          </Link>
        </div>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent-gold p-1.5 bg-white/5 rounded-full hover:scale-110 transition-all"
            aria-label="Instagram"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent-gold p-1.5 bg-white/5 rounded-full hover:scale-110 transition-all"
            aria-label="Facebook"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent-gold p-1.5 bg-white/5 rounded-full hover:scale-110 transition-all"
            aria-label="Twitter"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
