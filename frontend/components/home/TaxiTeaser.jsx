"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  Users,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const vehicles = [
  {
    id: "economy",
    name: "Economy",
    icon: "🚗",
    desc: "Comfortable & affordable",
    pricePerKm: 11,
    minPrice: 25,
  },
  {
    id: "comfort",
    name: "Comfort",
    icon: "🚙",
    desc: "Extra space & style",
    pricePerKm: 16,
    minPrice: 45,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: "🚘",
    desc: "First-class transfer",
    pricePerKm: 28,
    minPrice: 89,
  },
  {
    id: "van",
    name: "Group Van",
    icon: "🚐",
    desc: "Perfect for groups",
    pricePerKm: 22,
    minPrice: 110,
  },
];

export default function TaxiTeaser() {
  const [selectedVehicle, setSelectedVehicle] = useState("comfort");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("4");
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const activeVehicle =
    vehicles.find((v) => v.id === selectedVehicle) || vehicles[1];

  const handleEstimateFare = (e) => {
    e.preventDefault();
    if (!pickup || !drop || !date || !time) {
      toast.error("Please fill in all location and date/time fields.");
      return;
    }

    setIsEstimating(true);
    setTimeout(() => {
      // Simulate standard distance of 25-45km for city transfer
      const simulatedDistance = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
      const fare = simulatedDistance * activeVehicle.pricePerKm + 150; // Add 150 base fee/tax
      setEstimatedFare(fare);
      setIsEstimating(false);
      toast.success(
        `Fare estimated successfully for ${simulatedDistance} km distance!`,
      );
    }, 800);
  };

  const getWhatsAppLink = () => {
    const text =
      `Hi Starline Travel, I would like to book a transfer:\n\n` +
      `Vehicle: ${activeVehicle.name} (${activeVehicle.icon})\n` +
      `Pickup: ${pickup}\n` +
      `Dropoff: ${drop}\n` +
      `Date & Time: ${date} at ${time}\n` +
      `Passengers: ${passengers}\n` +
      `Estimated Fare: ₹${estimatedFare}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image & Subtext */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Section Heading */}
          <div className="flex flex-col gap-2">
            <span className="small-caps-label text-left">
              AIRPORT & CITY TRANSFERS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-teal text-left leading-tight">
              Book Your Transfer
            </h2>
            <p className="text-text-muted text-sm md:text-base mt-2 text-left leading-relaxed">
              Reliable, punctual, and professional drivers ready to take you
              anywhere across India and Nepal. Select your fleet category and
              request an instant rate estimate.
            </p>
          </div>

          {/* Large Car Photo */}
          <div className="relative h-80 rounded-card overflow-hidden border border-border-soft shadow-md group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800"
              alt="Starline Taxi fleet booking"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-primary-teal/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex gap-6 text-left">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-4.5 w-4.5 text-accent-gold" />
                <span>Sanitized Cars</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-4.5 w-4.5 text-accent-gold" />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="lg:col-span-7 bg-bg-cream border border-border-soft rounded-card shadow-lg p-6 md:p-8">
          <h3 className="font-serif text-xl font-bold text-primary-teal mb-5 text-left">
            Request an Estimate
          </h3>

          <form onSubmit={handleEstimateFare} className="flex flex-col gap-5">
            {/* 1. Vehicle Type 2x2 Grid */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-text-muted text-left">
                Select Vehicle Type
              </span>
              <div className="grid grid-cols-2 gap-3">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVehicle(v.id);
                      setEstimatedFare(null); // Reset estimation
                    }}
                    className={`p-3 rounded-card text-left border transition-all flex flex-col gap-1 ${
                      selectedVehicle === v.id
                        ? "bg-white border-primary-teal ring-1 ring-primary-teal shadow-sm"
                        : "bg-white/60 border-border-soft hover:bg-white hover:border-text-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{v.icon}</span>
                      <span className="text-xs font-serif font-bold text-primary-teal">
                        from ₹{v.pricePerKm}/km
                      </span>
                    </div>
                    <span className="font-semibold text-xs text-text-dark mt-1">
                      {v.name}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {v.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Route Inputs (Pickup / Drop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-accent-gold" />
                  Pickup Address
                </label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Airport, Hotel, or Station"
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-sm text-text-dark focus:outline-none focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-accent-gold" />
                  Dropoff Address
                </label>
                <input
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Hotel name or Landmark"
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-sm text-text-dark focus:outline-none focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all"
                />
              </div>
            </div>

            {/* 3. DateTime & Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-accent-gold" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
                  <Clock className="h-3 w-3 text-accent-gold" />
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
                  <Users className="h-3 w-3 text-accent-gold" />
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="px-3 py-2.5 bg-white border border-border-soft rounded-btn text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-all"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="7">7 Passengers</option>
                </select>
              </div>
            </div>

            {/* Fare Display Overlay */}
            {estimatedFare !== null && (
              <div className="bg-white border border-primary-teal/20 p-4 rounded-card text-left flex justify-between items-center gap-4 fade-in">
                <div className="flex flex-col">
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Estimated Fare
                  </span>
                  <span className="font-serif text-2xl font-bold text-primary-teal">
                    ₹{estimatedFare}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    Includes driver allowance, fuel, and taxes. Tolls extra.
                  </span>
                </div>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold py-2.5 px-4 rounded-btn flex items-center gap-1.5 transition-all shadow-sm hover:scale-102"
                >
                  <span>Book on WhatsApp</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {/* Estimate Button */}
            <button
              type="submit"
              disabled={isEstimating}
              className="w-full bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3 rounded-btn text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 disabled:opacity-50"
            >
              <Calculator className="h-4 w-4" />
              <span>{isEstimating ? "Calculating..." : "Estimate Fare"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
