import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials({ testimonials }) {
  return (
    <section className="py-24 bg-primary-teal text-white relative overflow-hidden">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-teal-dk rounded-full filter blur-3xl opacity-30 mt-[-100px] mr-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-16">
          <span className="small-caps-label text-[#E6C75A]">
            WHAT TRAVELERS SAY
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Stories from Our Explorers
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold mt-2"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 backdrop-blur-sm border border-white/15 p-8 rounded-card text-left flex flex-col justify-between hover:bg-white/10 hover:border-accent-gold/40 transition-all duration-300 shadow-sm relative group"
            >
              {/* Double Quote Accent Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent-gold/20 group-hover:text-accent-gold/30 transition-colors" />

              <div className="flex flex-col gap-4">
                {/* Five Gold Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent-gold text-accent-gold"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-200 text-sm leading-relaxed italic font-light">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="flex items-center gap-3.5 mt-8 border-t border-white/10 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 object-cover rounded-full border-2 border-accent-gold/30"
                />

                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-white">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-accent-gold tracking-wider uppercase font-semibold">
                    {t.tourName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
