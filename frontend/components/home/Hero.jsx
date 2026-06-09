// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   Autoplay,
//   EffectFade,
//   Pagination,
//   Navigation as SwiperNavigation,
// } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";

// const heroSlides = [
//   {
//     id: 0,
//     type: "video",
//     src: "/videos/india-tourism.mp4",
//     label: "DISCOVER THE WORLD WITH US",
//     heading: "Your Dream Journey\nStarts Here",
//     description: "Handcrafted tours to 50+ destinations across India & Nepal. Premium taxi transfers and luxury wedding rentals included. Travel with confidence.",
//     showSearch: true,
//   },
//   {
//     id: 1,
//     type: "image",
//     src: "/images/pokhara.jpg",
//     label: "MOUNTAIN LAKES & VALLEYS",
//     heading: "Escape to\nMisty Heights",
//     description: "Colonial charm meets serene mountain lakes and endless views across Pokhara and the Himalayas.",
//     showSearch: false,
//   },
//   {
//     id: 2,
//     type: "image",
//     src: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1920",
//     label: "HIMALAYAN PASSES",
//     heading: "Conquer the\nHighest Roads",
//     description: "Traverse the world's most breathtaking high mountain passes and adventure trails.",
//     showSearch: false,
//   },
//   {
//     id: 3,
//     type: "image",
//     src: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1920",
//     label: "HILL STATIONS",
//     heading: "Discover Untouched\nParadise",
//     description: "Pristine alpine lakes surrounded by majestic peaks and pine forests.",
//     showSearch: false,
//   },
//   {
//     id: 4,
//     type: "image",
//     src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920",
//     label: "TROPICAL BEACHES",
//     heading: "Sun, Sand &\nCrystal Waters",
//     description: "Unwind on pristine shores with turquoise horizons and luxury retreats.",
//     showSearch: false,
//   },
// ];

// /* ─── Component ─── */
// export default function Hero() {
//   const router = useRouter();
//   const videoRef = useRef(null);
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   // Search form state
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [travelers, setTravelers] = useState("2");

//   /* ── Video / Autoplay orchestration ── */
//   const advanceFromVideo = useCallback(() => {
//     if (!swiperInstance) return;
//     swiperInstance.slideNext();
//     swiperInstance.autoplay.start();
//   }, [swiperInstance]);

//   useEffect(() => {
//     if (!swiperInstance) return;

//     let safetyTimeout;

//     const onSlideChange = () => {
//       const idx = swiperInstance.realIndex;
//       clearTimeout(safetyTimeout);

//       if (idx === 0) {
//         // Video slide — stop swiper autoplay, let video drive timing
//         swiperInstance.autoplay.stop();

//         // Play the video from start if ref exists
//         if (videoRef.current) {
//           videoRef.current.currentTime = 0;
//           videoRef.current.play().catch(() => {});
//         }

//         // Safety: if video hangs or is longer than expected, auto-advance after 15s
//         safetyTimeout = setTimeout(() => {
//           advanceFromVideo();
//         }, 15000);
//       } else {
//         // Image slides — swiper autoplay at 8s
//         swiperInstance.autoplay.start();
//       }
//     };

//     swiperInstance.on("slideChange", onSlideChange);
//     // Handle initial state
//     onSlideChange();

//     return () => {
//       clearTimeout(safetyTimeout);
//       swiperInstance.off("slideChange", onSlideChange);
//     };
//   }, [swiperInstance, advanceFromVideo]);

//   /* ── Search submit ── */
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     if (destination) params.set("search", destination);
//     if (date) params.set("date", date);
//     if (travelers) params.set("travelers", travelers);
//     router.push(`/tour-packages?${params.toString()}`);
//   };

//   /* ── Helpers ── */
//   const renderHeading = (text) =>
//     text.split("\n").map((line, i, arr) => (
//       <span key={i}>
//         {line}
//         {i < arr.length - 1 && <br />}
//       </span>
//     ));

//   return (
//     <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
//       {/* ━━ Background Slider ━━ */}
//       <Swiper
//         onSwiper={setSwiperInstance}
//         modules={[Autoplay, EffectFade, Pagination, SwiperNavigation]}
//         effect="fade"
//         loop
//         speed={1000}
//         autoplay={{
//           delay: 8000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//           el: ".hero-custom-pagination",
//           bulletClass: "hero-bullet",
//           bulletActiveClass: "hero-bullet-active",
//         }}
//         navigation={{
//           prevEl: ".hero-prev-btn",
//           nextEl: ".hero-next-btn",
//         }}
//         className="absolute inset-0 w-full h-full"
//       >
//         {heroSlides.map((slide, idx) => (
//           <SwiperSlide key={slide.id} className="relative w-full h-full">
//             {/* ── Background media ── */}
//             <div className="absolute inset-0 w-full h-full">
//               {slide.type === "video" ? (
//                 swiperInstance && swiperInstance.realIndex === 0 ? (
//                   <video
//                     ref={videoRef}
//                     src={slide.src}
//                     autoPlay
//                     muted
//                     playsInline
//                     onEnded={advanceFromVideo}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-black" />
//                 )
//               ) : (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={slide.src}
//                   alt={slide.label || "Hero slide"}
//                   className="w-full h-full object-cover"
//                   loading={idx === 0 ? "eager" : "lazy"}
//                 />
//               )}
//             </div>

//             {/* ── Per-slide dark overlay ── */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-[1]" />

//             {/* ── Slide 1 · Left-aligned hero content with video background ── */}
//             {idx === 0 && (
//               <div className="absolute inset-0 z-[2] flex flex-col items-start justify-center text-left px-8 md:px-16 lg:px-24">
//                 {/* Pill badge */}
//                 <span className="small-caps-label bg-black/40 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold tracking-[0.2em] inline-flex items-center gap-1.5 shadow-sm mb-6 animate-pulse select-none">
//                   📍 DISCOVER THE WORLD WITH US
//                 </span>

//                 {/* Headline */}
//                 <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight max-w-4xl tracking-tight" style={{ color: "#FFFFFF" }}>
//                   Your Dream Journey <br />
//                   <span className="italic-accent text-accent-gold">
//                     Starts Here
//                   </span>
//                 </h1>

//                 {/* Subtext */}
//                 <p className="text-gray-200 text-sm md:text-lg max-w-2xl mt-4 leading-relaxed font-light">
//                   Handcrafted tours to 50+ destinations across India &amp;
//                   Nepal. Premium taxi transfers and luxury wedding rentals
//                   included. Travel with confidence.
//                 </p>

//                 {/* ── Search Card ── */}
//                 <div className="w-full max-w-4xl bg-white border border-border-soft rounded-card shadow-2xl p-6 mt-10 transition-all duration-300 hover:shadow-accent-gold/10">
//                   <form
//                     onSubmit={handleSearchSubmit}
//                     className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-left"
//                   >
//                     {/* Destination */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1.5">
//                         <MapPin className="h-3.5 w-3.5 text-accent-gold" />
//                         Destination
//                       </label>
//                       <input
//                         type="text"
//                         value={destination}
//                         onChange={(e) => setDestination(e.target.value)}
//                         placeholder="Where to? (e.g. Ladakh, Goa)"
//                         className="w-full py-2 bg-transparent border-b border-border-soft text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-colors"
//                       />
//                     </div>

//                     {/* Date */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1.5">
//                         <Calendar className="h-3.5 w-3.5 text-accent-gold" />
//                         Departure Date
//                       </label>
//                       <input
//                         type="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                         className="w-full py-2 bg-transparent border-b border-border-soft text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-colors"
//                       />
//                     </div>

//                     {/* Travelers */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs uppercase tracking-widest font-semibold text-text-muted flex items-center gap-1.5">
//                         <Users className="h-3.5 w-3.5 text-accent-gold" />
//                         Travelers
//                       </label>
//                       <select
//                         value={travelers}
//                         onChange={(e) => setTravelers(e.target.value)}
//                         className="w-full py-2.5 bg-transparent border-b border-border-soft text-sm text-text-dark focus:outline-none focus:border-primary-teal transition-colors"
//                       >
//                         <option value="1">1 Traveler</option>
//                         <option value="2">2 Travelers</option>
//                         <option value="4">4 Travelers</option>
//                         <option value="6">6+ Travelers</option>
//                       </select>
//                     </div>

//                     {/* Submit */}
//                     <div className="md:col-span-3 mt-4">
//                       <button
//                         type="submit"
//                         className="w-full bg-primary-teal hover:bg-primary-teal-dk text-white font-semibold py-3.5 rounded-btn flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
//                       >
//                         <Search className="h-4 w-4" />
//                         Search Packages
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* ── Slides 2-5 · Left-aligned minimal overlay ── */}
//             {idx > 0 && (
//               <div className="absolute inset-0 z-[2] flex items-center justify-start px-8 md:px-16 lg:px-24">
//                 <div className="max-w-2xl text-left">
//                   {/* Category label */}
//                   <span className="inline-block text-accent-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
//                     {slide.label}
//                   </span>

//                   {/* Heading */}
//                   <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4" style={{ color: "#FFFFFF" }}>
//                     {renderHeading(slide.heading)}
//                   </h2>

//                   {/* Description */}
//                   <p className="text-gray-200 text-sm md:text-lg font-light leading-relaxed mb-8 max-w-xl">
//                     {slide.description}
//                   </p>

//                   {/* CTA link */}
//                   <Link
//                     href="/tour-packages"
//                     className="inline-flex items-center gap-2 text-white text-sm font-medium border border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-6 py-3 rounded-btn transition-all duration-300"
//                   >
//                     Explore Tours
//                     <span className="text-accent-gold">→</span>
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ━━ Navigation Arrows ━━ */}
//       <button
//         className="hero-prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all duration-200 focus:outline-none hidden md:flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="h-5 w-5" />
//       </button>
//       <button
//         className="hero-next-btn absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all duration-200 focus:outline-none hidden md:flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="h-5 w-5" />
//       </button>

//       {/* ━━ Pagination Dots ━━ */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 hero-custom-pagination" />
//     </section>
//   );
// }




"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Pagination,
  Navigation as SwiperNavigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
const heroSlides = [
  {
    id: 0,
    type: "video",
    src: "/videos/india-tourism.mp4",
    label: "SKYWAY TRAVEL GORAKHPUR",
    heading: "Skyway Travel Best\nTravel Agency In\nGorakhpur",
    description:
      "Skyway Travel is your trusted travel agency in Gorakhpur for tour packages, taxi booking, hotel stays, and comfortable journeys across India & Nepal.",
    showSearch: true,
  },

  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1920",
    label: "LOCAL TAXI SERVICE",
    heading: "Best Local Taxi In\nGorakhpur",
    description:
      "Skyway Travel offers reliable local taxi services in Gorakhpur, ensuring comfortable and hassle-free transportation.",
    showSearch: false,
  },

  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920",
    label: "CAR RENTAL SERVICE",
    heading: "Your Trusted Choice\nFor Car Rent Services",
    description:
      "Book clean, comfortable, and affordable cars for local rides, outstation trips, family tours, and business travel.",
    showSearch: false,
  },

  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920",
    label: "GORAKHPUR TO KATHMANDU",
    heading: "Gorakhpur To\nRaxaul Border &\nKathmandu Trips",
    description:
      "Reliable taxi and tour services from Gorakhpur to Raxaul Border and Kathmandu with professional drivers.",
    showSearch: false,
  },

  {
    id: 4,
    type: "image",
    src: "/images/pokhara.jpg",
    label: "NEPAL TOUR PACKAGE",
    heading: "Gorakhpur To Nepal\nTour Package\nExpert",
    description:
      "Explore Nepal with customized packages, comfortable transportation, hotel bookings, and complete travel support.",
    showSearch: false,
  },
];

export default function Hero() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");

  const advanceFromVideo = useCallback(() => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
    swiperInstance.autoplay.start();
  }, [swiperInstance]);

  useEffect(() => {
    if (!swiperInstance) return;

    let safetyTimeout;

    const onSlideChange = () => {
      const idx = swiperInstance.realIndex;
      clearTimeout(safetyTimeout);

      if (idx === 0) {
        swiperInstance.autoplay.stop();

        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }

        safetyTimeout = setTimeout(() => {
          advanceFromVideo();
        }, 15000);
      } else {
        swiperInstance.autoplay.start();
      }
    };

    swiperInstance.on("slideChange", onSlideChange);
    onSlideChange();

    return () => {
      clearTimeout(safetyTimeout);
      swiperInstance.off("slideChange", onSlideChange);
    };
  }, [swiperInstance, advanceFromVideo]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (destination) params.set("search", destination);
    if (date) params.set("date", date);
    if (travelers) params.set("travelers", travelers);

    router.push(`/tour-packages?${params.toString()}`);
  };

  const renderHeading = (text) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Autoplay, EffectFade, Pagination, SwiperNavigation]}
        effect="fade"
        loop={true}
        speed={1000}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".hero-custom-pagination",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        navigation={{
          prevEl: ".hero-prev-btn",
          nextEl: ".hero-next-btn",
        }}
        className="absolute inset-0 w-full h-full"
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="absolute inset-0 w-full h-full">
              {slide.type === "video" ? (
                <video
                  ref={videoRef}
                  src={slide.src}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={advanceFromVideo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 z-[1]" />

            <div className="absolute inset-0 z-[2] flex flex-col items-start justify-center text-left px-8 md:px-16 lg:px-24">
              <span className="bg-black/40 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold tracking-[0.2em] inline-flex items-center gap-1.5 shadow-sm mb-6 select-none">
                ✈️ {slide.label}
              </span>

              <h1
                className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight max-w-5xl tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                {renderHeading(slide.heading)}
              </h1>

              <p className="text-gray-100 text-sm md:text-lg max-w-2xl mt-4 leading-relaxed font-semibold">
                {slide.description}
              </p>

              {slide.showSearch ? (
                <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 mt-10">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-left"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-teal-600" />
                        Destination
                      </label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Where to? Nepal, Kathmandu..."
                        className="w-full py-2 bg-transparent border-b border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-teal-600 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-teal-600" />
                        Departure Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full py-2 bg-transparent border-b border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-teal-600 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-teal-600" />
                        Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full py-2.5 bg-transparent border-b border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-teal-600 transition-colors"
                      >
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="4">4 Travelers</option>
                        <option value="6">6+ Travelers</option>
                      </select>
                    </div>

                    <div className="md:col-span-3 mt-4">
                      <button
                        type="submit"
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
                      >
                        <Search className="h-4 w-4" />
                        Search Tour Packages
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <Link
                  href="/tour-packages"
                  className="mt-10 inline-flex items-center gap-3 text-white text-base font-semibold border border-white/60 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full transition-all duration-300"
                >
                  Explore Tours
                  <span className="text-2xl">→</span>
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="hero-prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all duration-200 focus:outline-none hidden md:flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        className="hero-next-btn absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all duration-200 focus:outline-none hidden md:flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 hero-custom-pagination" />
    </section>
  );
}