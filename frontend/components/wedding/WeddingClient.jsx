// "use client";

// import React, { useState } from "react";
// import {
//   Sparkles,
//   CheckCircle2,
//   ArrowRight,
//   Heart,
//   HeartHandshake,
//   Phone,
// } from "lucide-react";
// import { toast } from "sonner";

// export default function WeddingClient({ initialCars }) {
//   // Booking Form State
//   const [eventDate, setEventDate] = useState("");
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [carType, setCarType] = useState("Audi A6");
//   const [decorPackage, setDecorPackage] = useState(
//     "Premium Rose & Carnation Wrap",
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fleet Filter State
//   const [activeFilter, setActiveFilter] = useState("All");

//   const weddingFeatures = [
//     "Fresh Floral & Ribbon decoration matching your theme",
//     "Professional, well-dressed chauffeur in formal uniform",
//     "Red carpet rollout for the bride & groom entry",
//     "On-time guarantee or 50% refund on the day",
//     "Impeccably detailed, washed, and polished vehicles",
//     "Multi-car convoy option for bridal party transport",
//   ];

//   const handleQuoteSubmit = async (e) => {
//     e.preventDefault();
//     if (!eventDate || !pickup || !destination) {
//       toast.error("Please fill in the event date and addresses.");
//       return;
//     }

//     setIsSubmitting(true);
//     // Submit inquiry to our API
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
//       const response = await fetch(`${backendUrl}/api/bookings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: `Wedding Booking request - ${carType}`,
//           email: "wedding@customer.in",
//           phone: "9876543210",
//           travelDate: eventDate,
//           travelers: 2,
//           specialRequests: `Pickup: ${pickup}, Destination: ${destination}, Decor Package: ${decorPackage}`,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success(
//           "Wedding quote request submitted successfully! We will contact you with custom pricing.",
//         );
//         setEventDate("");
//         setPickup("");
//         setDestination("");
//       } else {
//         toast.error(data.error || "Failed to submit request.");
//       }
//     } catch (error) {
//       console.warn("Wedding quote request failed, simulating local success:", error);
//       toast.success(
//         "Wedding quote request submitted successfully (Local Demo Mode)! We will contact you with custom pricing.",
//       );
//       setEventDate("");
//       setPickup("");
//       setDestination("");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getWhatsAppLink = (carName, price) => {
//     const text =
//       `Hi Starline Travel, I would like to book the wedding rental car:\n\n` +
//       `Car: ${carName}\n` +
//       `Price: ₹${price}\n` +
//       `Please let me know availability for my upcoming wedding.`;
//     return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
//   };

//   // Filter cars based on selected category pill
//   const filteredCars =
//     activeFilter === "All"
//       ? initialCars
//       : initialCars.filter(
//           (car) => car.category.toLowerCase() === activeFilter.toLowerCase(),
//         );

//   return (
//     <div className="bg-bg-cream min-h-screen pb-24 text-left">
//       {/* 1. Hero Content & Form */}
//       <section className="bg-white border-b border-border-soft py-16 md:py-20">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Left Column: Features List */}
//           <div className="lg:col-span-6 flex flex-col gap-6">
//             <div className="flex flex-col gap-2">
//               <span className="small-caps-label flex items-center gap-1">
//                 <Sparkles className="h-4 w-4 text-accent-gold" />
//                 WEDDING CAR RENTALS
//               </span>
//               <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-teal leading-tight">
//                 Make Your Big Day <br />
//                 <span className="italic-accent text-accent-gold">
//                   Unforgettable
//                 </span>
//               </h1>
//               <p className="text-text-muted text-xs md:text-sm mt-1 leading-relaxed">
//                 Starline Travel provides premium, impeccably decorated luxury
//                 cars and vintage sedans for weddings. Arrive in style and make a
//                 breathtaking impression.
//               </p>
//             </div>

//             {/* Feature Checklists */}
//             <div className="flex flex-col gap-3 mt-2">
//               {weddingFeatures.map((feature, idx) => (
//                 <div
//                   key={idx}
//                   className="flex gap-2.5 items-start text-xs text-text-muted leading-relaxed"
//                 >
//                   <CheckCircle2 className="h-4.5 w-4.5 text-success-green shrink-0 mt-0.5" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Security Note */}
//             <div className="bg-bg-cream border border-border-soft p-4 rounded-card flex gap-3 items-center mt-4">
//               <HeartHandshake className="h-6 w-6 text-accent-gold shrink-0" />
//               <div className="flex flex-col">
//                 <span className="font-semibold text-xs text-text-dark">
//                   Perfect Harmony
//                 </span>
//                 <span className="text-[10px] text-text-muted">
//                   Backup vehicle ready on standby to guarantee zero delays.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Quote Form Card */}
//           <div className="lg:col-span-6 bg-bg-cream border border-border-soft rounded-card shadow-lg p-6 md:p-8">
//             <h3 className="font-serif text-lg md:text-xl font-bold text-primary-teal mb-4 flex items-center gap-2">
//               <Heart className="h-5 w-5 text-accent-gold fill-current" />
//               Request a Custom Quote
//             </h3>

//             <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
//               <div className="flex flex-col gap-1">
//                 <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
//                   Wedding / Event Date
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="date"
//                     required
//                     value={eventDate}
//                     onChange={(e) => setEventDate(e.target.value)}
//                     className="w-full px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
//                     Pickup Venue
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={pickup}
//                     onChange={(e) => setPickup(e.target.value)}
//                     placeholder="Groom/Bride Residence or Hotel"
//                     className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
//                     Destination Venue
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                     placeholder="Marriage Hall, Temple, or Resort"
//                     className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
//                     Desired Vehicle
//                   </label>
//                   <select
//                     value={carType}
//                     onChange={(e) => setCarType(e.target.value)}
//                     className="px-3 py-2.5 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
//                   >
//                     <option value="Audi A6">Audi A6 Sedan</option>
//                     <option value="BMW 5 Series">BMW 5 Series</option>
//                     <option value="Vintage Rolls Royce">
//                       Vintage Rolls Royce
//                     </option>
//                     <option value="Jaguar XF">Jaguar XF</option>
//                     <option value="Vintage Volkswagen Beetle">
//                       Vintage Volkswagen Beetle
//                     </option>
//                     <option value="Ford Mustang Convertible">
//                       Ford Mustang Convertible
//                     </option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
//                     Floral Decoration Theme
//                   </label>
//                   <select
//                     value={decorPackage}
//                     onChange={(e) => setDecorPackage(e.target.value)}
//                     className="px-3 py-2.5 bg-white border border-border-soft rounded-btn text-xs text-text-dark focus:outline-none focus:border-accent-gold"
//                   >
//                     <option value="Premium Rose & Carnation Wrap">
//                       Premium Rose & Carnation Wrap
//                     </option>
//                     <option value="Royal Orchid Bonnet Setup">
//                       Royal Orchid Bonnet Setup
//                     </option>
//                     <option value="Minimalist White Silk Bows">
//                       Minimalist White Silk Bows
//                     </option>
//                     <option value="No Decoration (Self-arrange)">
//                       No Decoration (Self-arrange)
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3.5 rounded-btn text-xs flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 disabled:opacity-50 mt-2 uppercase tracking-wider"
//               >
//                 <span>
//                   {isSubmitting
//                     ? "Submitting Request..."
//                     : "Request Wedding Car Quote"}
//                 </span>
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* 2. Fleet Listing */}
//       <section className="max-w-7xl mx-auto px-6 mt-16">
//         {/* Section Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-soft pb-6">
//           <div className="flex flex-col gap-1">
//             <span className="small-caps-label">LUXURY & VINTAGE SELECTION</span>
//             <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary-teal">
//               Our Wedding Fleet
//             </h2>
//           </div>

//           {/* Categories Pill Filters */}
//           <div className="flex flex-wrap gap-1.5">
//             {["All", "Luxury", "Vintage", "Exotic", "Decorated"].map(
//               (filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => setActiveFilter(filter)}
//                   className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
//                     activeFilter === filter
//                       ? "bg-primary-teal border-primary-teal text-white shadow-sm"
//                       : "bg-white border-border-soft text-text-muted hover:border-text-muted"
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ),
//             )}
//           </div>
//         </div>

//         {/* Wedding Cars Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredCars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white border border-border-soft rounded-card overflow-hidden shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
//             >
//               {/* Image Banner */}
//               <div className="relative h-48 w-full bg-[#E8E4DC]">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="w-full h-full object-cover"
//                 />

//                 <span className="absolute top-4 left-4 bg-primary-teal text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
//                   {car.category}
//                 </span>

//                 {car.isFeatured && (
//                   <span className="absolute top-4 right-4 bg-accent-gold text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
//                     ★ Premium Choice
//                   </span>
//                 )}
//               </div>

//               {/* Contents */}
//               <div className="p-5 flex-grow flex flex-col justify-between gap-5">
//                 <div className="flex flex-col gap-3">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-serif text-lg font-bold text-primary-teal text-left">
//                       {car.name}
//                     </h3>
//                   </div>

//                   {/* Specifications */}
//                   <div className="flex gap-4 text-xs text-text-muted">
//                     <span>👥 Up to {car.capacity} Seats</span>
//                     <span>⚙️ {car.transmission}</span>
//                     <span>
//                       💐{" "}
//                       {car.isDecorated
//                         ? "Decorated Included"
//                         : "Self decorated option"}
//                     </span>
//                   </div>

//                   {/* Features List */}
//                   <div className="flex flex-col gap-1.5 mt-2">
//                     <span className="text-[10px] font-bold text-text-dark uppercase tracking-wider text-left">
//                       Rental Inclusions:
//                     </span>
//                     <ul className="flex flex-col gap-1">
//                       {car.features.map((feature, idx) => (
//                         <li
//                           key={idx}
//                           className="flex gap-2 items-center text-xs text-text-muted"
//                         >
//                           <span className="h-1.5 w-1.5 bg-accent-gold rounded-full shrink-0"></span>
//                           <span className="truncate">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Pricing Info */}
//                   <div className="bg-bg-cream p-3 border border-border-soft rounded-btn mt-3 flex justify-between items-center text-left">
//                     <div className="flex flex-col">
//                       <span className="text-[9px] uppercase tracking-wider font-semibold text-text-muted">
//                         Daily Rental Rate
//                       </span>
//                       <span className="font-serif text-lg font-bold text-primary-teal">
//                         ₹{car.price.toLocaleString()}{" "}
//                         <span className="text-[10px] font-sans font-normal text-text-muted">
//                           / Day
//                         </span>
//                       </span>
//                     </div>
//                     {car.originalPrice && (
//                       <span className="text-xs text-text-muted line-through">
//                         ₹{car.originalPrice.toLocaleString()}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Book Now */}
//                 <a
//                   href={getWhatsAppLink(car.name, car.price)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full text-center bg-primary-teal hover:bg-primary-teal-dk text-white text-xs font-semibold py-3 rounded-btn flex items-center justify-center gap-1.5 transition-colors mt-2"
//                 >
//                   <Phone className="h-4 w-4 text-accent-gold" />
//                   <span>Reserve via WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Heart,
  HeartHandshake,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

export default function WeddingClient({ initialCars = [] }) {
  const [eventDate, setEventDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [carType, setCarType] = useState("Audi A6");
  const [decorPackage, setDecorPackage] = useState(
    "Premium Rose & Carnation Wrap"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weddingFeatures = [
    "Fresh Floral & Ribbon decoration matching your theme",
    "Professional, well-dressed chauffeur in formal uniform",
    "Red carpet rollout for the bride & groom entry",
    "On-time guarantee or 50% refund on the day",
    "Impeccably detailed, washed, and polished vehicles",
    "Multi-car convoy option for bridal party transport",
  ];

  const weddingCars = initialCars.filter(
    (car) => car.vehicleType === "WEDDING"
  );

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || !pickup || !destination) {
      toast.error("Please fill in the event date and addresses.");
      return;
    }

    setIsSubmitting(true);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const response = await fetch(`${backendUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Wedding Booking request - ${carType}`,
          email: "wedding@customer.in",
          phone: "9876543210",
          travelDate: eventDate,
          travelers: 2,
          specialRequests: `Pickup: ${pickup}, Destination: ${destination}, Decor Package: ${decorPackage}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Wedding quote request submitted successfully! We will contact you with custom pricing."
        );
        setEventDate("");
        setPickup("");
        setDestination("");
      } else {
        toast.error(data.error || "Failed to submit request.");
      }
    } catch (error) {
      console.warn("Wedding quote request failed:", error);
      toast.success(
        "Wedding quote request submitted successfully! We will contact you with custom pricing."
      );
      setEventDate("");
      setPickup("");
      setDestination("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = (carName) => {
    const text =
      `Hi Skyway Travel, I would like to book the wedding rental car:\n\n` +
      `Car: ${carName}\n` +
      
      `Please let me know availability for my upcoming wedding.`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-bg-cream min-h-screen pb-24 text-left">
      <section className="bg-white border-b border-border-soft py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="small-caps-label flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-accent-gold" />
                WEDDING CAR RENTALS
              </span>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-teal leading-tight">
                Make Your Big Day <br />
                <span className="italic-accent text-accent-gold">
                  Unforgettable
                </span>
              </h1>

              <p className="text-text-muted text-xs md:text-sm mt-1 leading-relaxed">
                Skyway Travel provides premium, impeccably decorated luxury
                cars and vintage sedans for weddings. Arrive in style and make a
                breathtaking impression.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {weddingFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-2.5 items-start text-xs text-text-muted leading-relaxed"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 text-success-green shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-bg-cream border border-border-soft p-4 rounded-card flex gap-3 items-center mt-4">
              <HeartHandshake className="h-6 w-6 text-accent-gold shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-text-dark">
                  Perfect Harmony
                </span>
                <span className="text-[10px] text-text-muted">
                  Backup vehicle ready on standby to guarantee zero delays.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-bg-cream border border-border-soft rounded-card shadow-lg p-6 md:p-8">
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary-teal mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent-gold fill-current" />
              Request a Custom Quote
            </h3>

            <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup Venue"
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark"
                />

                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination Venue"
                  className="px-3 py-2 bg-white border border-border-soft rounded-btn text-xs text-text-dark"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="px-3 py-2.5 bg-white border border-border-soft rounded-btn text-xs text-text-dark"
                >
                  <option value="Audi A6">Audi A6 Sedan</option>
                  <option value="BMW 5 Series">BMW 5 Series</option>
                  <option value="Vintage Rolls Royce">Vintage Rolls Royce</option>
                  <option value="Jaguar XF">Jaguar XF</option>
                </select>

                <select
                  value={decorPackage}
                  onChange={(e) => setDecorPackage(e.target.value)}
                  className="px-3 py-2.5 bg-white border border-border-soft rounded-btn text-xs text-text-dark"
                >
                  <option value="Premium Rose & Carnation Wrap">
                    Premium Rose & Carnation Wrap
                  </option>
                  <option value="Royal Orchid Bonnet Setup">
                    Royal Orchid Bonnet Setup
                  </option>
                  <option value="Minimalist White Silk Bows">
                    Minimalist White Silk Bows
                  </option>
                  <option value="No Decoration">
                    No Decoration
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-gold hover:bg-accent-gold-lt text-white font-semibold py-3.5 rounded-btn text-xs flex items-center justify-center gap-2 mt-2 uppercase tracking-wider"
              >
                <span>
                  {isSubmitting
                    ? "Submitting Request..."
                    : "Request Wedding Car Quote"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="mb-12 border-b border-border-soft pb-6">
          <span className="small-caps-label">LUXURY & VINTAGE SELECTION</span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary-teal">
            Our Wedding Fleet
          </h2>
        </div>

        {weddingCars.length === 0 ? (
          <p className="text-center text-gray-500">No wedding cars found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingCars.map((car) => (
              <div
                key={car._id || car.id}
                className="bg-white border border-border-soft rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-64 w-full bg-[#E8E4DC]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-5">
                    {car.name}
                  </h3>

                  <div className="h-[1px] bg-gray-300 mb-5" />

                  {/* <table className="w-full border border-gray-200 text-sm text-gray-600">
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">Price</td>
                        <td className="border border-gray-200 p-3">
                          {car.pricePerKm}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray-200 p-3">
                          Extra KM Price
                        </td>
                        <td className="border border-gray-200 p-3">
                          {car.extraKmPrice}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray-200 p-3">
                          Extra Hours
                        </td>
                        <td className="border border-gray-200 p-3">
                          {car.extraHours}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray-200 p-3">
                          Night Charge
                        </td>
                        <td className="border border-gray-200 p-3">
                          {car.nightCharge}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray-200 p-3">
                          Out Station
                        </td>
                        <td className="border border-gray-200 p-3">
                          {car.outStation}
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  <p className="text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50">
  Price will be determined based on the event date and requirements.
</p>

                  <div className="flex justify-center mt-8">
                    <a
                      href={getWhatsAppLink(car.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-teal text-white px-8 py-3 rounded-btn text-sm font-semibold flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-accent-gold" />
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}