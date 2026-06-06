"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Global error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-bg-cream px-6 py-16 text-center">
      <div className="max-w-md bg-white border border-border-soft p-8 rounded-card shadow-lg flex flex-col items-center gap-5">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
          !
        </div>

        <div className="flex flex-col gap-2">
          <span className="small-caps-label text-red-600">
            SYSTEM EXCEPTION
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-teal">
            Something went wrong
          </h2>
          <p className="text-xs text-text-muted leading-relaxed font-light">
            An unexpected error occurred while rendering this page. Please try
            reloading the view or navigate back to safety.
          </p>
        </div>

        <div className="flex gap-4 w-full mt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-primary-teal hover:bg-primary-teal-dk text-white font-semibold py-3 rounded-btn text-xs flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <RefreshCw className="h-4.5 w-4.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="flex-1 bg-white border border-border-soft hover:bg-bg-cream text-text-dark font-semibold py-3 rounded-btn text-xs flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Home className="h-4.5 w-4.5 text-accent-gold" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
