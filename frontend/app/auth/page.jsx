"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Plane, Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [activeTab, setActiveTab] = useState("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Read error parameter if passed by NextAuth redirect
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "CredentialsSignin") {
        toast.error("Invalid email or password.");
      } else {
        toast.error(`Authentication error: ${errorParam}`);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (activeTab === "signin") {
      // 1. Validate Sign In
      const validation = loginSchema.safeParse({
        email: formData.email,
        password: formData.password,
      });

      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        setIsLoading(false);
        return;
      }

      // 2. Sign In via NextAuth
      try {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Welcome back! Logging you in...");
          router.push("/");
          router.refresh();
        }
      } catch {
        toast.error("An authentication error occurred.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // 1. Validate Sign Up
      const validation = signupSchema.safeParse(formData);

      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        setIsLoading(false);
        return;
      }

      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${backendUrl}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(
            data.message || "Registration successful! Please log in.",
          );
          setActiveTab("signin");
          // Clear password fields
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        } else {
          toast.error(data.error || "Registration failed.");
        }
      } catch {
        toast.error("Failed to register. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    toast.info("Connecting to Google OAuth (Simulated local login)...");
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-bg-cream">
      <div className="w-full max-w-md bg-white border border-border-soft rounded-card shadow-lg overflow-hidden p-8 flex flex-col gap-6">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary-teal text-white p-3 rounded-btn animate-bounce">
            <Plane className="h-6 w-6 rotate-45 text-accent-gold" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary-teal mt-2">
            {activeTab === "signup" ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-text-muted">
            {activeTab === "signup"
              ? "Join Starline Travel to book premium tours & rides."
              : "Access your bookings and travel preferences."}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-border-soft">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
              activeTab === "signup"
                ? "text-accent-gold border-b-2 border-accent-gold font-bold"
                : "text-text-muted hover:text-primary-teal"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
              activeTab === "signin"
                ? "text-accent-gold border-b-2 border-accent-gold font-bold"
                : "text-text-muted hover:text-primary-teal"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCredentialsSubmit}
          className="flex flex-col gap-4"
        >
          {activeTab === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest font-semibold text-text-muted"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-widest font-semibold text-text-muted"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-widest font-semibold text-text-muted"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
              />
            </div>
          </div>

          {activeTab === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs uppercase tracking-widest font-semibold text-text-muted"
              >
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === "signin" && (
            <div className="text-xs text-text-muted flex gap-2 justify-center">
              <span>Demo Accounts:</span>
              <span className="font-semibold text-primary-teal">
                traveler@starlinetravel.in / user123
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-primary-teal hover:bg-primary-teal-dk text-white font-semibold py-3 rounded-btn text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 disabled:opacity-50"
          >
            <span>
              {activeTab === "signup" ? "Register & Join" : "Login to Account"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border-soft"></div>
          <span className="flex-shrink mx-4 text-xs text-text-muted uppercase tracking-widest">
            or continue with
          </span>
          <div className="flex-grow border-t border-border-soft"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full bg-white border border-border-soft hover:bg-bg-cream text-text-dark font-medium py-2.5 rounded-btn text-sm flex items-center justify-center gap-2.5 transition-colors duration-200"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.71 14.94 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.76 2.92c.9-2.7 3.42-4.44 6.85-4.44z"
            />

            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.92c2.2-2.03 3.67-5.01 3.67-8.65z"
            />

            <path
              fill="#FBBC05"
              d="M5.15 10.48c-.24-.72-.37-1.49-.37-2.28 0-.79.13-1.56.37-2.28L1.39 3.01C.5 4.81 0 6.8 0 8.9c0 2.1.5 4.09 1.39 5.89l3.76-2.92z"
            />

            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.92c-1.1.74-2.5 1.18-4.2 1.18-3.43 0-5.95-1.74-6.85-4.44l-3.76 2.92C3.37 20.33 7.35 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center bg-bg-cream">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-teal border-t-transparent"></div>
        </div>
      }
    >
      <AuthContent />
    </React.Suspense>
  );
}
