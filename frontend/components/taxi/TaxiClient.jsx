"use client";

import React, { useState } from "react";
import { Car, ShieldCheck, Clock, Calculator, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const vehicleTypes = [
  { id: "economy", name: "Economy", icon: "🚗", pricePerKm: 11 },
  { id: "comfort", name: "Comfort", icon: "🚙", pricePerKm: 16 },
  { id: "luxury", name: "Luxury", icon: "🚘", pricePerKm: 28 },
  { id: "van", name: "Group Van", icon: "🚐", pricePerKm: 22 },
];

export default function TaxiClient({ initialCars }) {
  // Estimator Form State
  const [selectedType, setSelectedType] = useState("comfort");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("4");
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);

  // Fleet Filter State
  const [activeFilter, setActiveFilter] = useState("All");

  const activeTypeOption =
    vehicleTypes.find((v) => v.id === selectedType) || vehicleTypes[1];

  const handleEstimateFare = (e) => {
    e.preventDefault();
    if (!pickup || !drop || !date || !time) {
      toast.error("Please fill in all route details.");
      return;
    }

    setIsEstimating(true);
    setTimeout(() => {
      const simulatedDistance = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
      const fare = simulatedDistance * activeTypeOption.pricePerKm + 150;
      setEstimatedFare(fare);
      setIsEstimating(false);
      toast.success(
        `Fare calculated for a distance of ${simulatedDistance} km!`,
      );
    }, 800);
  };

  const getWhatsAppLink = (carName, customFare) => {
    let text = "";
    if (carName) {
      text = `Hi Starline Travel, I would like to book the vehicle "${carName}" for a ride request. Please share availability.`;
    } else {
      text =
        `Hi Starline Travel, I would like to book a transfer:\n\n` +
        `Vehicle: ${activeTypeOption.name}\n` +
        `Pickup: ${pickup}\n` +
        `Dropoff: ${drop}\n` +
        `Date & Time: ${date} at ${time}\n` +
        `Passengers: ${passengers}\n` +
        `Estimated Fare: ₹${customFare || estimatedFare}`;
    }
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  // Filter cars based on selected category pill
  const filteredCars =
    activeFilter === "All"
      ? initialCars
      : initialCars.filter(
          (car) => car.category.toLowerCase() === activeFilter.toLowerCase(),
        );

  return (
    <div className="bg-bg-cream min-h-screen pb-24 text-left">
      {/* 1. Hero Estimator Section */}
      <section className="bg-white border-b border-border-soft py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Headline & Photo */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="small-caps-label">AIRPORT & CITY TRANSFERS</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-teal leading-tight">
                Book Your Transfer
              </h1>
              <p className="text-text-muted text-xs md:text-sm mt-2 leading-relaxed">
                Reliable, punctual, and professional drivers ready to take you
                anywhere. Travel across India & Nepal in absolute comfort.
              </p>
            </div>

            {/* Large car banner */}
            <div className="relative h-64 md:h-72 rounded-card overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800"
                alt="Starline premium taxi transfers"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary-teal/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-6 right-6 text-white flex gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent-gold" />
                  <span>Sanitized Vehicles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent-gold" />
                  <span>24/7 Availability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Estimator Form */}
          <div className="lg:col-span-7 bg-bg-cream border border-border-soft rounded-card shadow-lg p-6 md:p-8">
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary-teal mb-4">
              Select Vehicle Type & Route
            </h3>

            <form onSubmit={handleEstimateFare} className="flex flex-col gap-4">
              {/* 2x2 Vehicles Selection Grid */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                  Select Vehicle Category
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleTypes.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(v.id);
                        setEstimatedFare(null);
                      }}
                      className={`p-3 rounded-card text-left border transition-all flex flex-col gap-0.5 ${
                        selectedType === v.id
                          ? "bg-white border-primary-teal ring-1 ring-primary-teal shadow-sm"
                          : "bg-white/60 border-border-soft hover:bg-white hover:border-text-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xl">{v.icon}</span>
                        <span className="text-[10px] font-serif font-bold text-primary-teal">
                          from ₹{v.pricePerKm}/km
                        </span>
                      </div>
                      <span className="font-semibold text-xs text-text-dark mt-1">
                        {v.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Route */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="E.g. Ayodhya Junction or Airport"
                    className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Dropoff Location
                  </label>
                  <input
                    type="text"
                    required
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="E.g. Hotel Heritage or Janakpur"
                    className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3 py-2 bg-white border border-border-soft rounded-btn text-[11px] text-text-dark focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
                  >
                    <option value="2">2 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="7">7 Persons</option>
                    <option value="12">12 Persons</option>
                  </select>
                </div>
              </div>

              {/* Estimated Fare Display */}
              {estimatedFare !== null && (
                <div className="bg-white border border-primary-teal/20 p-4 rounded-card flex justify-between items-center gap-4 fade-in">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                      Estimated Fare
                    </span>
                    <span className="font-serif text-2xl font-bold text-primary-teal">
                      ₹{estimatedFare}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      Includes driver fee, fuel & taxes
                    </span>
                  </div>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold py-2.5 px-4 rounded-btn flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Book via WhatsApp</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isEstimating}
                className="w-full bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3 rounded-btn text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 disabled:opacity-50 mt-1"
              >
                <Calculator className="h-4 w-4" />
                <span>{isEstimating ? "Estimating..." : "Estimate Fare"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Fleet Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-soft pb-6">
          <div className="flex flex-col gap-1">
            <span className="small-caps-label">EXQUISITE FLEET</span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary-teal">
              Our Transfer Fleet
            </h2>
          </div>

          {/* Categories Pill Filters */}
          <div className="flex flex-wrap gap-1.5">
            {["All", "Economy", "Comfort", "Luxury", "Group Van"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    activeFilter === filter
                      ? "bg-primary-teal border-primary-teal text-white shadow-sm"
                      : "bg-white border-border-soft text-text-muted hover:border-text-muted"
                  }`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Cars Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-border-soft rounded-card overflow-hidden shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full bg-[#E8E4DC]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-4 left-4 bg-primary-teal text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {car.category}
                </span>

                {car.isFeatured && (
                  <span className="absolute top-4 right-4 bg-accent-gold text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                    ★ Highly Rated
                  </span>
                )}
              </div>

              {/* Specifications & Price List */}
              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-lg font-bold text-primary-teal">
                    {car.name}
                  </h3>

                  {/* Icon Specs */}
                  <div className="flex gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      👥 {car.capacity} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      🧳 {car.luggage} Bags
                    </span>
                    <span className="flex items-center gap-1">
                      ⚙️ {car.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      ⛽ {car.fuelType}
                    </span>
                  </div>

                  {/* Fares Table */}
                  <div className="border border-border-soft rounded-btn overflow-hidden mt-2 text-xs">
                    <div className="grid grid-cols-2 bg-bg-cream border-b border-border-soft p-2 font-semibold text-primary-teal">
                      <span>Rate Type</span>
                      <span>Pricing</span>
                    </div>
                    <div className="divide-y divide-border-soft text-text-muted">
                      <div className="grid grid-cols-2 p-2">
                        <span>Base Price per KM</span>
                        <span className="font-semibold text-text-dark">
                          ₹{car.pricePerKm}/km
                        </span>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        <span>Extra Hours Rate</span>
                        <span className="font-semibold text-text-dark">
                          ₹{car.extraHoursRate}/hr
                        </span>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        <span>Night Charges</span>
                        <span className="font-semibold text-text-dark">
                          ₹{car.nightCharge} / night
                        </span>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        <span>Daily Run Limit</span>
                        <span className="font-semibold text-text-dark">
                          {car.dailyLimitKm} km / Day
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Now Action */}
                <a
                  href={getWhatsAppLink(car.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-primary-teal hover:bg-primary-teal-dk text-white text-xs font-semibold py-3 rounded-btn flex items-center justify-center gap-1.5 transition-colors mt-2"
                >
                  <Car className="h-4 w-4 text-accent-gold" />
                  <span>Book Now via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
