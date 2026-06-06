import React from "react";
import Link from "next/link";
import PackageCard from "@/components/packages/PackageCard";
import { Compass } from "lucide-react";

export default function TourPreview({ packages }) {
  // Take first 3 packages (featured if possible, fallback to first 3)
  const featured = packages.filter((p) => p.isFeatured).slice(0, 3);
  const displayPackages = featured.length > 0 ? featured : packages.slice(0, 3);

  return (
    <section className="py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <span className="small-caps-label">CURATED EXPERIENCES</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-teal">
            Our Tour Packages
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold mt-2"></div>
          <p className="text-text-muted text-sm md:text-base max-w-xl mt-3 leading-relaxed">
            Handpicked adventures crafted by expert travel designers for every
            kind of explorer across India and Nepal.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {displayPackages.map((pkg) => (
            <div key={pkg.id} className="fade-in">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16">
          <Link
            href="/tour-packages"
            className="inline-flex items-center gap-2 border border-primary-teal text-primary-teal font-semibold px-8 py-3.5 rounded-btn hover:bg-primary-teal hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-102"
          >
            <Compass className="h-4 w-4" />
            <span>View All 50+ Packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
