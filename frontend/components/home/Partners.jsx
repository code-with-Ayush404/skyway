import React from "react";

export default function Partners() {
  const partnersList = [
    "Emirates",
    "Marriott",
    "Hertz",
    "Booking.com",
    "TripAdvisor",
    "AirAsia",
  ];

  return (
    <section className="bg-primary-teal py-10 border-t border-primary-teal-dk overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-accent-gold-lt">
            TRUSTED PARTNERS
          </span>
          <div className="w-full flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-20 pt-4">
            {partnersList.map((partner, idx) => (
              <span
                key={idx}
                className="font-serif text-lg md:text-xl font-medium text-white/60 tracking-wider hover:text-white transition-colors cursor-default select-none"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
