import React from "react";
import {
  Compass,
  Headset,
  CreditCard,
  Award,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Compass className="h-6 w-6 text-primary-teal" />,
    title: "50+ Destinations",
    desc: "Vast coverage of curated locations across India & Nepal.",
    bgColor: "bg-emerald-50",
  },
  {
    id: 2,
    icon: <Headset className="h-6 w-6 text-accent-gold" />,
    title: "24/7 Support",
    desc: "Real-time travel assistance for complete peace of mind.",
    bgColor: "bg-amber-50",
  },
  {
    id: 3,
    icon: <CreditCard className="h-6 w-6 text-blue-900" />,
    title: "Flexible Payments",
    desc: "Book with a low deposit, pay locally, cancel up to 30 days.",
    bgColor: "bg-blue-50",
  },
  {
    id: 4,
    icon: <Award className="h-6 w-6 text-red-950" />,
    title: "Award-Winning Service",
    desc: "Recognized excellence in travel coordination and rental fleet.",
    bgColor: "bg-rose-50",
  },
];

export default function WhyChoose() {
  const brandStats = [
    { value: "12K+", label: "Trips Completed" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "8+", label: "Years Experience" },
  ];

  return (
    <section className="py-24 bg-bg-cream border-t border-border-soft">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Copy & Stats */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <span className="small-caps-label">WHY CHOOSE STARLINE TRAVEL</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-teal leading-tight">
            Travel Differently. <br />
            <span className="italic-accent text-accent-gold">
              Travel Better.
            </span>
          </h2>
          <p className="text-text-muted text-sm md:text-base leading-relaxed">
            Starline Travel isn&apos;t just another travel agency. We are
            designers of custom, memorable journeys. Since 2018, we have built a
            reputation of delivering premium, high-standard travel services —
            from private, local-guided sightseeing caravans to professional
            airport transfers and wedding convoys.
          </p>

          <hr className="border-border-soft" />

          {/* Core Brand Stats */}
          <div className="grid grid-cols-3 gap-4">
            {brandStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="font-serif text-2xl md:text-3xl font-bold text-primary-teal">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 2x2 Feature Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              className="bg-white border border-border-soft p-6 rounded-card shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 flex flex-col gap-4 text-left group"
            >
              <div
                className={`p-3 rounded-card w-12 h-12 flex items-center justify-center ${f.bgColor} transition-transform group-hover:rotate-6 duration-300`}
              >
                {f.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-lg font-bold text-primary-teal flex items-center gap-1 group-hover:text-accent-gold transition-colors">
                  <span>{f.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
