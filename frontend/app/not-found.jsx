import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-bg-cream px-6 py-16 text-center">
      <div className="max-w-md bg-white border border-border-soft p-8 rounded-card shadow-lg flex flex-col items-center gap-5">
        <div className="w-16 h-16 bg-primary-teal/10 text-primary-teal rounded-full flex items-center justify-center text-2xl shadow-inner animate-pulse">
          <Compass className="h-8 w-8 text-accent-gold" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="small-caps-label">ERROR 404</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-teal">
            Destination <br />
            <span className="italic-accent text-accent-gold font-normal">
              Not Found
            </span>
          </h2>
          <p className="text-xs text-text-muted leading-relaxed font-light">
            We couldn&apos;t find the page or tour package you were looking for.
            It may have been moved, deleted, or the URL might be mistyped.
          </p>
        </div>

        <Link
          href="/"
          className="w-full bg-primary-teal hover:bg-primary-teal-dk text-white font-semibold py-3 rounded-btn text-xs flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 mt-2"
        >
          <Home className="h-4.5 w-4.5 text-accent-gold" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
