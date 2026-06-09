"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RefreshCw,
  Compass,
} from "lucide-react";
import PackageCard from "@/components/packages/PackageCard";

function TourPackagesContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState("Recommended");

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "All",
    "Beach",
    "Adventure",
    "Luxury",
    "Cultural",
    "Honeymoon",
    "Domestic",
  ];

  const fetchFilteredPackages = async () => {
    setIsLoading(true);

    const queryParams = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory,
      minPrice: "0",
      maxPrice: maxPrice.toString(),
      sort: sortBy,
    });

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const response = await fetch(
        `${backendUrl}/api/packages?${queryParams.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch packages: ${response.status}`);
      }

      const data = await response.json();

      setPackages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("API packages fetch error:", error);
      setPackages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredPackages();
  }, [selectedCategory, maxPrice, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredPackages();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(50000);
    setSortBy("Recommended");
  };

  return (
    <div className="min-h-screen bg-bg-cream pb-24">
      <div
        className="relative bg-primary-teal text-white py-16 md:py-20 text-center overflow-hidden border-b border-primary-teal-dk"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27, 77, 90, 0.9), rgba(19, 56, 66, 0.95)), url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span
            className="small-caps-label mb-2 inline-block"
            style={{ color: "#E6C75A" }}
          >
            EXPLORE THE EXTRAORDINARY
          </span>

          <h1
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            Our Tour Packages
          </h1>

          <p
            className="text-xs md:text-sm max-w-lg mx-auto mt-3 font-light leading-relaxed"
            style={{ color: "#E2E8F0" }}
          >
            Handpicked and expert-designed itineraries across Himalayan passes,
            tropical beaches, and historic heritage forts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 bg-white border border-border-soft rounded-card shadow-sm p-6 flex flex-col gap-6 text-left h-fit">
          <div className="flex items-center justify-between border-b border-border-soft pb-4">
            <span className="font-serif text-lg font-bold text-primary-teal flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-accent-gold" />
              Filter Options
            </span>

            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-bold tracking-wider text-accent-gold hover:text-primary-teal"
            >
              Reset All
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-text-muted">
              Search Destination
            </label>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Country, city, tag..."
                className="w-full pl-3 pr-9 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
              />

              <button
                type="submit"
                className="absolute right-2.5 top-2.5 text-text-muted hover:text-primary-teal"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                Price Limit
              </span>

              <span className="text-xs font-serif font-bold text-primary-teal">
                up to ₹{maxPrice}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-border-soft rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />

            <div className="flex justify-between text-[10px] text-text-muted">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3 text-accent-gold" />
              Sort Results By
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-bg-cream border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
            >
              <option value="Recommended">Recommended</option>
              <option value="Price Low-High">Price: Low to High</option>
              <option value="Price High-Low">Price: High to Low</option>
              <option value="Rating">Rating: Highest First</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col gap-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "bg-primary-teal border-primary-teal text-white shadow-sm"
                      : "bg-white border-border-soft text-text-muted hover:border-text-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-text-muted">
              {!isLoading && (
                <span>
                  Showing{" "}
                  <strong className="text-text-dark">{packages.length}</strong>{" "}
                  packages found
                </span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border-soft rounded-card h-[430px] w-full animate-pulse flex flex-col gap-4 p-5"
                >
                  <div className="h-48 bg-border-soft rounded-card w-full"></div>
                  <div className="h-4 bg-border-soft rounded w-2/3"></div>
                  <div className="h-6 bg-border-soft rounded w-full"></div>
                  <div className="h-4 bg-border-soft rounded w-1/2 mt-auto"></div>
                </div>
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="bg-white border border-border-soft rounded-card p-12 text-center flex flex-col items-center gap-4">
              <Compass className="h-12 w-12 text-text-muted animate-spin" />

              <h3 className="font-serif text-xl font-bold text-primary-teal">
                No Packages Found
              </h3>

              <p className="text-text-muted text-sm max-w-sm">
                No tour packages are available from database right now.
              </p>

              <button
                onClick={handleResetFilters}
                className="bg-primary-teal text-white text-xs font-semibold px-5 py-2.5 rounded-btn hover:bg-primary-teal-dk"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.id || pkg.slug} className="fade-in">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TourPackagesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-bg-cream">
          <RefreshCw className="h-8 w-8 text-primary-teal animate-spin" />
        </div>
      }
    >
      <TourPackagesContent />
    </Suspense>
  );
}