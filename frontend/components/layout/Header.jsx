"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Plane, Menu, X, User, LogOut } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tour Packages", href: "/tour-packages" },
    { name: "Taxi Service", href: "/taxi-service" },
    { name: "Wedding Rentals", href: "/wedding-rentals" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary-teal text-white p-2 rounded-btn transition-transform group-hover:rotate-12 duration-300">
            <Plane className="h-5 w-5 rotate-45" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-primary-teal flex items-center gap-1">
            Starline{" "}
            <span className="italic-accent text-lg md:text-xl font-normal lowercase">
              travel
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent-gold ${
                isActive(link.href)
                  ? "text-primary-teal border-b-2 border-accent-gold pb-1 font-semibold"
                  : "text-text-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-10 w-24 bg-border-soft animate-pulse rounded-btn"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border-soft hover:border-primary-teal rounded-btn text-primary-teal font-medium text-sm transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>{session.user?.name || "My Account"}</span>
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border-soft rounded-card shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-border-soft text-xs text-text-muted">
                    Signed in as{" "}
                    <p className="font-semibold text-text-dark truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-bg-cream flex items-center gap-2 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm font-semibold text-primary-teal border border-primary-teal px-5 py-2.5 rounded-btn hover:bg-primary-teal hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/tour-packages"
            className="text-sm font-semibold bg-accent-gold text-white px-6 py-2.5 rounded-btn hover:bg-primary-teal hover:shadow-lg transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 lg:hidden text-primary-teal hover:bg-bg-cream rounded-btn transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border-soft shadow-xl p-6 flex flex-col gap-5 z-40 fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors hover:text-accent-gold ${
                  isActive(link.href)
                    ? "text-primary-teal font-semibold pl-2 border-l-2 border-accent-gold"
                    : "text-text-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <hr className="border-border-soft" />

          <div className="flex flex-col gap-3">
            {session ? (
              <div className="flex flex-col gap-2">
                <div className="text-xs text-text-muted px-2">
                  Signed in as{" "}
                  <span className="font-semibold text-text-dark">
                    {session.user?.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2.5 border border-red-200 text-red-600 rounded-btn hover:bg-red-50 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-primary-teal text-primary-teal rounded-btn hover:bg-primary-teal hover:text-white text-sm font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/tour-packages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-accent-gold text-white rounded-btn hover:bg-primary-teal text-sm font-semibold transition-colors duration-200 shadow-md"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
