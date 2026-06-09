"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plane, Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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

  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam) {
      toast.error(
        errorParam === "CredentialsSignin"
          ? "Invalid email or password."
          : `Authentication error: ${errorParam}`
      );
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (activeTab === "signin") {
      const validation = loginSchema.safeParse({
        email: formData.email,
        password: formData.password,
      });

      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Invalid email or password.");
          return;
        }

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful!");

        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Backend server check karo.");
      } finally {
        setIsLoading(false);
      }

      return;
    }

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registration successful! Please log in.");
        setActiveTab("signin");

        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Backend server check karo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google login abhi disabled hai.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-bg-cream">
      <div className="w-full max-w-md bg-white border border-border-soft rounded-card shadow-lg overflow-hidden p-8 flex flex-col gap-6">
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
              : "Login to access your account."}
          </p>
        </div>

        <div className="flex border-b border-border-soft">
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase ${
              activeTab === "signup"
                ? "text-accent-gold border-b-2 border-accent-gold font-bold"
                : "text-text-muted hover:text-primary-teal"
            }`}
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase ${
              activeTab === "signin"
                ? "text-accent-gold border-b-2 border-accent-gold font-bold"
                : "text-text-muted hover:text-primary-teal"
            }`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4">
          {activeTab === "signup" && (
            <InputBox
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              icon={<UserIcon className="h-4 w-4" />}
            />
          )}

          <InputBox
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            icon={<Mail className="h-4 w-4" />}
          />

          <InputBox
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
          />

          {activeTab === "signup" && (
            <InputBox
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
            />
          )}

          {activeTab === "signin" && (
            <div className="text-xs text-text-muted flex flex-col gap-1 text-center">
              <span>Admin Demo:</span>
              <span className="font-semibold text-primary-teal">
                admin@starlinetravel.in / admin123
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-primary-teal hover:bg-primary-teal-dk text-white font-semibold py-3 rounded-btn text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 disabled:opacity-50"
          >
            <span>
              {isLoading
                ? "Please wait..."
                : activeTab === "signup"
                ? "Register & Join"
                : "Login to Account"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border-soft"></div>
          <span className="flex-shrink mx-4 text-xs text-text-muted uppercase tracking-widest">
            or continue with
          </span>
          <div className="flex-grow border-t border-border-soft"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full bg-white border border-border-soft hover:bg-bg-cream text-text-dark font-medium py-2.5 rounded-btn text-sm flex items-center justify-center gap-2.5 transition-colors duration-200"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

function InputBox({ label, name, type, value, onChange, placeholder, icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-widest font-semibold text-text-muted"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-bg-cream border border-border-soft rounded-btn text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
        />
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