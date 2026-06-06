import React from "react";
import { Users, Map, Star } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      id: 1,
      icon: <Users className="h-6 w-6 text-accent-gold" />,
      value: "12K+",
      label: "Happy Travelers",
    },
    {
      id: 2,
      icon: <Map className="h-6 w-6 text-accent-gold" />,
      value: "50+",
      label: "Curated Destinations",
    },
    {
      id: 3,
      icon: <Star className="h-6 w-6 text-accent-gold fill-current" />,
      value: "4.9★",
      label: "Average Guest Rating",
    },
  ];

  return (
    <section className="bg-white border-y border-border-soft py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border-soft">
        {statsList.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-center gap-4 py-4 md:py-0 transition-transform duration-300 hover:translate-y-[-2px]"
          >
            <div className="p-3 bg-bg-cream rounded-full">{stat.icon}</div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary-teal">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-text-muted">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
