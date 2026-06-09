"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, MapPin, Calendar, Users, ArrowRight } from "lucide-react";

export default function PackageCard({ pkg }) {
  const [isLiked, setIsLiked] = useState(false);

  // Badge color mapping
  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case "best seller":
        return "bg-accent-gold text-white";
      case "popular":
        return "bg-primary-teal text-white";
      case "new":
        return "bg-success-green text-white";
      case "luxury":
        return "bg-amber-800 text-white";
      default:
        return "bg-text-dark text-white";
    }
  };

  return (
    <div className="group bg-white border border-border-soft rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      {/* Image & Badges Banner */}
      <div className="relative h-56 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {pkg.badge && (
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm ${getBadgeClass(pkg.badge)}`}
            >
              {pkg.badge}
            </span>
          )}
          {pkg.discount && (
            <span className="bg-[#2E8B57] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              {pkg.discount}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-sm transition-transform active:scale-95 duration-200 z-10"
          aria-label="Add to favorites"
        >
          <Heart
            className={`h-4.5 w-4.5 transition-colors duration-200 ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-text-dark hover:text-red-500"
            }`}
          />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-text-dark text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-accent-gold text-accent-gold" />
          <span>{pkg.rating}</span>
          <span className="text-text-muted font-normal">
            ({pkg.ratingCount})
          </span>
        </div>
      </div>

      {/* Package Contents */}
      <div className="p-5 flex-grow flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-text-muted text-xs font-medium">
            <MapPin className="h-3.5 w-3.5 text-accent-gold shrink-0" />
            <span>{pkg.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-primary-teal leading-snug line-clamp-2 group-hover:text-primary-teal-dk transition-colors">
            <Link href={`/tour-packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>
        </div>

        {/* Trip Metadata (Days, Nights, Group) */}
        <div className="flex justify-between items-center text-xs text-text-muted py-2 border-y border-border-soft">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-accent-gold" />
            <span>
              {pkg.days} Days / {pkg.nights} Nights
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-accent-gold" />
            <span>{pkg.groupSize || "N/A"}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(pkg.tags || []).slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium text-text-muted bg-bg-cream px-2 py-0.5 rounded-full border border-border-soft"
            >
              {tag}
            </span>
          ))}
          {(pkg.tags || []).length > 3 && (
            <span className="text-[10px] font-bold text-accent-gold bg-bg-cream px-2 py-0.5 rounded-full border border-border-soft">
              +{(pkg.tags || []).length - 3}
            </span>
          )}
        </div>

        {/* Pricing & Button Actions */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex flex-col text-left">
            <span className="text-xs text-text-muted line-through">
              ${pkg.originalPrice}
            </span>
            <span className="font-serif text-xl font-bold text-primary-teal">
              ${pkg.currentPrice}{" "}
              <span className="text-xs text-text-muted font-sans font-normal">
                / person
              </span>
            </span>
          </div>

          <Link
            href={`/tour-packages/${pkg.slug}`}
            className="bg-primary-teal hover:bg-primary-teal-dk text-white text-xs font-semibold py-2.5 px-4 rounded-btn flex items-center gap-1 transition-all hover:translate-x-1 duration-200"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
