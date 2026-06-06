import { Sparkles, Heart } from "lucide-react";

const team = [
  {
    name: "Aditya Verma",
    role: "Founder & CEO",
    initials: "AV",
    bio: "Over 12 years in travel management. Started Starline with a single vehicle and a vision to redefine tourism across the subcontinent.",
  },
  {
    name: "Sneha Kapoor",
    role: "Head of Experiences",
    initials: "SK",
    bio: "Curator of luxury expeditions. Hand-crafts each package with detail, selecting the finest heritage hotels and routes.",
  },
  {
    name: "Imran Khan",
    role: "Fleet Director",
    initials: "IK",
    bio: "Supervises our 80+ vehicle garage. Guarantees safety checks, vehicle maintenance, and uniformed chauffeur certifications.",
  },
  {
    name: "Meera Joshi",
    role: "Customer Care Manager",
    initials: "MJ",
    bio: "Directs client communication and customized booking requests. Committed to delivering effortless, stress-free travel support.",
  },
];

export default function AboutPage() {
  const stats = [
    { value: "12,000+", label: "Happy Customers" },
    { value: "4,500+", label: "Trips Completed" },
    { value: "80+", label: "Premium Vehicles" },
    { value: "120+", label: "Destinations Covered" },
  ];

  return (
    <div className="bg-bg-cream min-h-screen pb-24 text-left">
      {/* Editorial Header Strip */}
      <div
        className="relative bg-primary-teal text-white py-16 md:py-20 text-center overflow-hidden border-b border-primary-teal-dk"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27, 77, 90, 0.9), rgba(19, 56, 66, 0.95)), url('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="small-caps-label mb-2 inline-block" style={{ color: "#E6C75A" }}>
            WHO WE ARE
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Our Story & Values
          </h1>
          <p className="text-xs md:text-sm max-w-lg mx-auto mt-3 font-light leading-relaxed" style={{ color: "#E2E8F0" }}>
            Crafting unforgettable, luxury-guided journeys across India & Nepal
            since 2018.
          </p>
        </div>
      </div>

      {/* 1. Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Story details */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="small-caps-label">OUR STORY</span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary-teal leading-tight">
            Crafting unforgettable journeys
          </h2>

          <div className="text-sm text-text-muted flex flex-col gap-4 leading-relaxed font-light">
            <p>
              Founded in 2018, Starline Travel began with a single Toyota Innova
              and a passion for showing the authentic beauty of northern India.
              We realized that travelers wanted more than just taxi rides — they
              sought curated, localized experiences, seamless route
              coordination, and premium vehicle quality.
            </p>
            <p>
              By aligning client safety, luxury amenities, and vetted local
              guides, we expanded rapidly. Today, our fleet boasts over 80
              premium vehicles (ranging from economy sedans to luxury Audis,
              vintage cars, and spacious group vans) and we have hosted over
              12,000 happy customers across spectacular high mountain passes,
              sandy beach coasts, and heritage sites.
            </p>
          </div>
        </div>

        {/* Story Image Panel */}
        <div className="lg:col-span-5 relative h-80 rounded-card overflow-hidden border border-border-soft shadow-md group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800"
            alt="Starline travel caravan mountain view"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary-teal/40 to-transparent" />
        </div>
      </section>

      {/* 2. Stats Grid Banner */}
      <section className="bg-white border-y border-border-soft py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-border-soft">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-1.5 py-4 lg:py-0"
            >
              <span className="font-serif text-3xl md:text-4xl font-bold text-primary-teal">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission card */}
        <div className="bg-white border border-border-soft p-8 rounded-card shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
          <div className="p-3 bg-emerald-50 rounded-full w-fit">
            <Sparkles className="h-6 w-6 text-success-green" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary-teal">
            OUR MISSION
          </h3>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed font-light">
            To provide travel that feels effortless. We remove the stress of
            scheduling logistics, car rentals, and itinerary permits, enabling
            you to immerse yourself in the culture, sights, and magic of India &
            Nepal.
          </p>
        </div>

        {/* Vision card */}
        <div className="bg-white border border-border-soft p-8 rounded-card shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
          <div className="p-3 bg-amber-50 rounded-full w-fit">
            <Heart className="h-6 w-6 text-accent-gold" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary-teal">
            OUR VISION
          </h3>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed font-light">
            To be the most loved travel brand in the subcontinent. We aim to
            inspire travelers to explore deeper, travel differently, and expect
            a premium standard of hospitality in every journey.
          </p>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        {/* Section Heading */}
        <div className="flex flex-col items-start gap-2 mb-12 border-b border-border-soft pb-6">
          <span className="small-caps-label">MEET OUR LEADER TEAM</span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary-teal">
            The Minds Behind Starline
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-border-soft rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-6 gap-4"
            >
              {/* Initials Avatar */}
              <div className="w-20 h-20 bg-primary-teal/10 border-2 border-accent-gold/40 text-primary-teal text-2xl font-serif font-bold rounded-full flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-200">
                {member.initials}
              </div>

              {/* Detail Profile info */}
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-base font-bold text-primary-teal">
                  {member.name}
                </h3>
                <span className="text-[10px] uppercase font-bold text-accent-gold tracking-wider">
                  {member.role}
                </span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed font-light px-2 mt-2">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
