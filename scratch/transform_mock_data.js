import fs from "fs";
import path from "path";

const projectRoot = "c:/Users/singh/Desktop/Travel Website";
const backendMockPath = path.join(projectRoot, "backend/src/lib/mockData.js");
const frontendMockPath = path.join(projectRoot, "frontend/lib/mockData.js");

// List of premium, working travel images from Unsplash
const travelImages = [
  "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800", // Ladakh valley
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800", // Sikkim mountains
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800", // Palm tropical beach
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", // Ocean beach
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800", // Mountains lake
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800", // Mountain peak
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800", // Green mountain path
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", // Valley forest
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800", // Forest stream
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800", // Wooden bridge forest
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800", // Misty mountains
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800", // Beach sunset
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800", // Tropical lagoon
  "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=800", // Varanasi ganges
  "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=800", // Udaipur palace
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=800", // Jaisalmer desert
  "https://images.unsplash.com/photo-1602491453979-02654b35c243?q=80&w=800", // Wild tiger forest
  "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=800", // Kashmir lake
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800", // Taj Mahal
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800", // Indian temple
  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800", // Monastery
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800", // Red Fort
];

// Helper to get day-wise images based on ID and day index to ensure variety
function getDayWiseImage(pkgId, dayIndex) {
  const hash = (pkgId.charCodeAt(pkgId.length - 1) + dayIndex) % travelImages.length;
  return travelImages[hash];
}

function updateMockPackages(content) {
  // We need to parse or define mockPackages in JavaScript
  // But wait! We can just define the entire updated array of mockPackages as a string!
  // Let's write a structured list of packages.
  
  const updatedPackages = [
    {
      id: "pkg-1",
      slug: "ladakh-heights",
      title: "Leh Ladakh Wonders & Nubra Valley Caravan",
      location: "Ladakh, India",
      category: "Adventure",
      badge: "Best Seller",
      discount: "15% OFF",
      rating: 4.9,
      ratingCount: 340,
      originalPrice: 1299,
      currentPrice: 1099,
      days: 7,
      nights: 6,
      groupSize: "6-12 people",
      tags: ["High Passes", "Camping", "Biking", "Monasteries"],
      inclusions: ["Premium hotel stays", "Airport transfers", "Dual-sport bikes rental", "All permits & fees", "Daily breakfast & dinner"],
      exclusions: ["Flights to Leh", "Personal riding gear", "Lunch & snacks", "Travel Insurance"],
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600",
        "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600",
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600"
      ],
      dayWisePlan: [
        {
          day: 1,
          title: "Acclimatization in Leh",
          description: "Arrive in Leh airport and transfer to hotel. Rest is mandatory for proper altitude acclimatization.",
          activities: ["Rest in hotel room", "Short evening walk in Leh Market", "Briefing by tour guide"],
          meals: "Dinner Included",
          image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600"
        },
        {
          day: 2,
          title: "Leh Local Sightseeing",
          description: "Explore the ancient monasteries and historical landmarks of Leh city.",
          activities: ["Visit Hall of Fame Museum", "Explore Shanti Stupa & Leh Palace", "Visit Spituk Monastery"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600"
        },
        {
          day: 3,
          title: "Leh to Nubra Valley via Khardung La",
          description: "Drive over the legendary Khardung La pass, one of the highest motorable roads in the world, to reach Nubra Valley.",
          activities: ["Cross Khardung La (17,582 ft)", "Double-humped Camel Ride at Hunder Dunes", "Stay in luxury camp in Hunder"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600"
        },
        {
          day: 4,
          title: "Nubra Valley to Turtuk & Back",
          description: "Visit the border village of Turtuk, opened to tourists recently, showcasing unique Balti culture.",
          activities: ["Drive along Shyok River", "Explore Turtuk village apricot orchards", "Interact with Balti locals"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600"
        },
        {
          day: 5,
          title: "Nubra Valley to Pangong Lake",
          description: "Drive directly to Pangong Lake via Shyok. Witness the changing colors of the high-altitude lake.",
          activities: ["Drive along Shyok gorge", "Scenic photography at Pangong Lake", "Bonfire evening near the lake"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600"
        },
        {
          day: 6,
          title: "Pangong Lake back to Leh via Chang La",
          description: "Start early and return to Leh crossing the mighty Chang La pass.",
          activities: ["Cross Chang La pass (17,590 ft)", "Visit Thiksey Monastery on the way", "Shopping in Leh market"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600"
        },
        {
          day: 7,
          title: "Departure from Leh",
          description: "Check out from hotel and transfer to airport for your flight back home.",
          activities: ["Airport drop"],
          meals: "Breakfast Included",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600"
        }
      ],
      isFeatured: true
    },
    {
      id: "pkg-2",
      slug: "nepal-annapurna-trek",
      title: "Annapurna Base Camp Expedition",
      location: "Pokhara, Nepal",
      category: "Adventure",
      badge: "Popular",
      discount: "20% OFF",
      rating: 4.8,
      ratingCount: 198,
      originalPrice: 1499,
      currentPrice: 1199,
      days: 10,
      nights: 9,
      groupSize: "4-10 people",
      tags: ["Trekking", "Mountain Views", "Teahouse Stay", "Sherpa Guide"],
      inclusions: ["TIMS card & ACAP permits", "Licensed trekking guide", "Porters for luggage", "Teahouse lodging", "Kathmandu-Pokhara flights"],
      exclusions: ["Trekking gear", "Hot showers at high altitudes", "Bottled water & Wi-Fi", "Tips for guide/porter"],
      image: "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?q=80&w=600",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 10 }).map((_, i) => ({
        day: i + 1,
        title: `Annapurna Trek Day ${i + 1}`,
        description: `Experience the breathtaking view of the mountains on Day ${i + 1} of the trek. Hike through rhododendron forests and Sherpa villages.`,
        activities: ["Morning trek", "Teahouse rest", "Local guide talk"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-2", i + 1)
      })),
      isFeatured: true
    },
    {
      id: "pkg-3",
      slug: "goa-beach-honeymoon",
      title: "Romantic Escape to South Goa & Private Yacht",
      location: "Goa, India",
      category: "Honeymoon",
      badge: "Luxury",
      discount: "10% OFF",
      rating: 4.9,
      ratingCount: 156,
      originalPrice: 999,
      currentPrice: 899,
      days: 5,
      nights: 4,
      groupSize: "2 people (Couple)",
      tags: ["Private Yacht", "Luxury Resort", "Candlelight Dinner", "Spa Treatment"],
      inclusions: ["Heritage resort beachfront stay", "Sunset private yacht rental (2 hrs)", "Couple spa treatment", "Airport transfers in luxury sedan"],
      exclusions: ["Water sports activities", "Lunch on yacht", "Alcoholic drinks"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 5 }).map((_, i) => ({
        day: i + 1,
        title: `Goa Honeymoon Day ${i + 1}`,
        description: `Relax on the pristine beaches of South Goa on Day ${i + 1}. Enjoy local seafood, sunset strolls, and private resort luxury.`,
        activities: ["Beach walk", "Relax by the pool", "Candlelight dinner"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-3", i + 1)
      })),
      isFeatured: true
    },
    {
      id: "pkg-4",
      slug: "kerala-backwaters",
      title: "Kerala Backwaters & Munnar Hills Sanctuary",
      location: "Kerala, India",
      category: "Luxury",
      badge: "Best Seller",
      discount: "22% OFF",
      rating: 4.7,
      ratingCount: 254,
      originalPrice: 1299,
      currentPrice: 1013,
      days: 6,
      nights: 5,
      groupSize: "2-8 people",
      tags: ["Houseboat Stay", "Tea Gardens", "Spices Tour", "Ayurvedic Spa"],
      inclusions: ["Private houseboat cruise", "Boutique tea estate cottage", "Spice plantation guided tour", "Airport transfer & local driver"],
      exclusions: ["Flight tickets to Cochin", "Personal shopping", "Tips & portages"],
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 6 }).map((_, i) => ({
        day: i + 1,
        title: `Kerala Backwaters Day ${i + 1}`,
        description: `Explore the tea plantations of Munnar and glide along the palm-fringed backwaters of Alleppey on Day ${i + 1}.`,
        activities: ["Houseboat ride", "Tea garden walk", "Spices shopping"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-4", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-5",
      slug: "everest-panorama",
      title: "Everest Scenic Heli Tour & Kathmandu Heritage",
      location: "Kathmandu, Nepal",
      category: "Luxury",
      badge: "Popular",
      discount: "12% OFF",
      rating: 4.9,
      ratingCount: 88,
      originalPrice: 2499,
      currentPrice: 2199,
      days: 4,
      nights: 3,
      groupSize: "2-5 people",
      tags: ["Helicopter Tour", "Everest View", "UNESCO Heritage", "Fine Dining"],
      inclusions: ["Private Everest Helicopter flight", "Breakfast at Everest View Hotel", "5-star luxury stay in Kathmandu", "All heritage entry fees"],
      exclusions: ["International flights", "Nepal visa fee", "Personal expenses"],
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200", // Replaced lady photo with Everest
      gallery: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 4 }).map((_, i) => ({
        day: i + 1,
        title: `Everest Heli Tour Day ${i + 1}`,
        description: `Fly close to Mount Everest and explore Kathmandu's ancient durbar squares on Day ${i + 1} of your luxury trip.`,
        activities: ["Heli tour briefing", "Heritage walk", "Everest view breakfast"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-5", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-6",
      slug: "udaipur-palace-romance",
      title: "Udaipur Lakes & Heritage Fort Experience",
      location: "Udaipur, India",
      category: "Cultural",
      badge: "New",
      discount: "18% OFF",
      rating: 4.8,
      ratingCount: 72,
      originalPrice: 899,
      currentPrice: 737,
      days: 4,
      nights: 3,
      groupSize: "2-6 people",
      tags: ["Lake Boat Ride", "Palace Stay", "Rajasthan Arts", "Heritage Walks"],
      inclusions: ["Palace suite hotel stay", "Private boat tour in Lake Pichola", "Exclusive cooking masterclass", "Airport pick & drop"],
      exclusions: ["Monuments entry tickets", "Camera charges", "Personal guides"],
      image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=1200", // Replaced food photo with Udaipur Palace
      gallery: [
        "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 4 }).map((_, i) => ({
        day: i + 1,
        title: `Udaipur Palace Day ${i + 1}`,
        description: `Explore the royal palaces and serene lakes of Udaipur on Day ${i + 1}. Enjoy local Rajasthani architecture and hospitality.`,
        activities: ["Lake boat cruise", "Palace visit", "Local shopping"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-6", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-7",
      slug: "kashmir-paradise",
      title: "Srinagar Shikara Serenade & Gulmarg Peaks",
      location: "Kashmir, India",
      category: "Honeymoon",
      badge: "Best Seller",
      discount: "25% OFF",
      rating: 4.8,
      ratingCount: 312,
      originalPrice: 1199,
      currentPrice: 899,
      days: 6,
      nights: 5,
      groupSize: "2-10 people",
      tags: ["Houseboat Stay", "Gondola Ride", "Tulip Gardens", "Snow Valley"],
      inclusions: ["Luxury Dal Lake Houseboat stay", "Gulmarg ski resort stay", "Gondola phase-1 tickets", "Shikara sunset ride"],
      exclusions: ["Pony rides in Sonamarg", "Ski rentals/instructor", "Lunch & drinks"],
      image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 6 }).map((_, i) => ({
        day: i + 1,
        title: `Kashmir Paradise Day ${i + 1}`,
        description: `Stay in a cedarwood houseboat on Dal Lake and experience the Gulmarg gondola ride on Day ${i + 1} of your trip.`,
        activities: ["Shikara ride", "Gondola skiing", "Mughal garden walk"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-7", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-8",
      slug: "cultural-golden-triangle",
      title: "Golden Triangle Heritage (Agra, Jaipur, Delhi)",
      location: "Agra, India",
      category: "Cultural",
      badge: "Popular",
      discount: "15% OFF",
      rating: 4.6,
      ratingCount: 420,
      originalPrice: 799,
      currentPrice: 679,
      days: 5,
      nights: 4,
      groupSize: "2-15 people",
      tags: ["Taj Mahal", "Amber Fort", "Heritage Expert", "Local Crafts"],
      inclusions: ["AC private vehicle transport", "5-star hotels in Jaipur & Agra", "Taj Mahal sunrise ticket", "Local registered guides"],
      exclusions: ["Lunches", "Camera fees", "Tips"],
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 5 }).map((_, i) => ({
        day: i + 1,
        title: `Golden Triangle Day ${i + 1}`,
        description: `Visit the monumental landmarks of Delhi, Jaipur, and the iconic Taj Mahal in Agra on Day ${i + 1} of your tour.`,
        activities: ["Fort walk", "Monument photo", "Bazaar trail"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-8", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-9",
      slug: "spiritual-varanasi-nepal",
      title: "Spiritual Holy Tour: Varanasi to Kathmandu",
      location: "Varanasi, India",
      category: "Cultural",
      badge: "Popular",
      discount: "20% OFF",
      rating: 4.7,
      ratingCount: 180,
      originalPrice: 1299,
      currentPrice: 1039,
      days: 8,
      nights: 7,
      groupSize: "4-15 people",
      tags: ["Ganga Aarti", "Pashupatinath", "Pilgrimage", "Sarnath Tour"],
      inclusions: ["Varanasi-Kathmandu flight", "Morning boat cruise on Ganges", "UNESCO sites entrance fees", "Spiritual group coordinator"],
      exclusions: ["Personal pooja rituals charges", "Lunches", "Tips"],
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200", // Replaced broken Varanasi image
      gallery: [
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 8 }).map((_, i) => ({
        day: i + 1,
        title: `Spiritual Journey Day ${i + 1}`,
        description: `Witness the sacred Ganga Aarti in Varanasi and fly to Kathmandu to visit the Pashupatinath temple on Day ${i + 1}.`,
        activities: ["Morning boat cruise", "Ganga Aarti", "Temple visits"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-9", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-10",
      slug: "pokhara-lakes-nepal",
      title: "Pokhara Valley Lakes & Paragliding Honeymoon",
      location: "Pokhara, Nepal",
      category: "Honeymoon",
      badge: "Best Seller",
      discount: "10% OFF",
      rating: 4.8,
      ratingCount: 110,
      originalPrice: 899,
      currentPrice: 809,
      days: 5,
      nights: 4,
      groupSize: "2 people",
      tags: ["Boating", "Paragliding", "Fishtail View", "Resort Stay"],
      inclusions: ["Lakeside luxury resort stay", "Fewa Lake boating charter", "Tandem paragliding flight", "Kathmandu airport luxury car transfers"],
      exclusions: ["Adventure video/photo", "Lunches & beverages", "Travel insurance"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200", // Replaced lady photo with Pokhara/mountain lake
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 5 }).map((_, i) => ({
        day: i + 1,
        title: `Pokhara Lakes Day ${i + 1}`,
        description: `Sail across Fewa Lake and enjoy tandem paragliding overlooking the snow-capped Annapurna peaks on Day ${i + 1}.`,
        activities: ["Boating charter", "Paragliding flight", "Resort relaxing"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-10", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-11",
      slug: "sikkim-monastery-tour",
      title: "Sikkim Peaks, Gurudongmar & Gangtok Monasteries",
      location: "Sikkim, India",
      category: "Adventure",
      badge: "New",
      discount: "21% OFF",
      rating: 4.9,
      ratingCount: 96,
      originalPrice: 999,
      currentPrice: 789,
      days: 6,
      nights: 5,
      groupSize: "4-8 people",
      tags: ["High Lakes", "Snow Mountain", "Tibetan Culture", "Jeep Safari"],
      inclusions: ["SUV private transportation", "Monastery permit passes", "Special border area permits", "Warm clothing kit rental"],
      exclusions: ["Tips for drivers", "Heavy winter wear purchase", "Insurance"],
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 6 }).map((_, i) => ({
        day: i + 1,
        title: `Sikkim Peaks Day ${i + 1}`,
        description: `Explore ancient Tibetan monasteries and Gurudongmar Lake, one of the highest in the world, on Day ${i + 1}.`,
        activities: ["Monastery tour", "Jeep safari ride", "Local cuisine trial"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-11", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-12",
      slug: "andaman-exotic-beach",
      title: "Exotic Havelock Island & Scuba Experience",
      location: "Andaman Islands, India",
      category: "Beach",
      badge: "Luxury",
      discount: "15% OFF",
      rating: 4.8,
      ratingCount: 174,
      originalPrice: 1399,
      currentPrice: 1189,
      days: 6,
      nights: 5,
      groupSize: "2-6 people",
      tags: ["Scuba Diving", "Radhanagar Beach", "Ferry Cruise", "Ocean Villa"],
      inclusions: ["Ferry cruise tickets", "Scuba diving session with PADI trainer", "Beachfront private villa", "Kayaking tour through mangroves"],
      exclusions: ["Scuba certificate course", "Alcoholic beverages", "Lunches"],
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200", // Replaced Goa photo with Havelock beach
      gallery: [
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 6 }).map((_, i) => ({
        day: i + 1,
        title: `Havelock Island Day ${i + 1}`,
        description: `Experience private scuba diving sessions and kayak through the serene mangrove forests of Havelock on Day ${i + 1}.`,
        activities: ["Scuba diving", "Beach resort relaxation", "Kayaking tour"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-12", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-13",
      slug: "nepal-royal-chitwan",
      title: "Royal Chitwan Jungle Safari & Wildlife Adventure",
      location: "Chitwan, Nepal",
      category: "Adventure",
      badge: "New",
      discount: "18% OFF",
      rating: 4.7,
      ratingCount: 65,
      originalPrice: 799,
      currentPrice: 655,
      days: 4,
      nights: 3,
      groupSize: "2-12 people",
      tags: ["Jungle Safari", "One-Horned Rhino", "Tharu Culture", "Bird Watching"],
      inclusions: ["Jungle lodge accommodation", "Elephant/Jeep safari in national park", "Canoeing down Rapti river", "Tharu tribal dance tickets"],
      exclusions: ["National park video camera fee", "Beverages", "Souvenir shopping"],
      image: "https://images.unsplash.com/photo-1602491453979-02654b35c243?q=80&w=1200", // Replaced lady/dog photo with tiger jungle
      gallery: [
        "https://images.unsplash.com/photo-1602491453979-02654b35c243?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 4 }).map((_, i) => ({
        day: i + 1,
        title: `Chitwan Safari Day ${i + 1}`,
        description: `Embark on a jeep safari to spot the rare one-horned rhino and attend the Tharu cultural stick dance on Day ${i + 1}.`,
        activities: ["Jungle safari jeep", "Elephant spotting", "Tharu dance show"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-13", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-14",
      slug: "rajasthan-royal-desert",
      title: "Jaisalmer Royal Sand Dunes & Desert Camping",
      location: "Jaisalmer, India",
      category: "Cultural",
      badge: "Popular",
      discount: "20% OFF",
      rating: 4.7,
      ratingCount: 145,
      originalPrice: 699,
      currentPrice: 559,
      days: 4,
      nights: 3,
      groupSize: "2-10 people",
      tags: ["Desert Camp", "Camel Safari", "Folk Dance", "Fort Tour"],
      inclusions: ["Luxury Swiss Tent stay", "Sunset camel safari in Sam dunes", "Rajasthani thali dinner & folk program", "Guided tour of Golden Fort"],
      exclusions: ["Parasailing on dunes", "Jeep dune bashing (optional)", "Personal tips"],
      image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200", // Replaced Goa beach photo with Jaisalmer desert
      gallery: [
        "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 4 }).map((_, i) => ({
        day: i + 1,
        title: `Desert Camping Day ${i + 1}`,
        description: `Explore the golden lanes of Jaisalmer Fort and sleep in luxury Swiss tents after a camel safari ride on Day ${i + 1}.`,
        activities: ["Camel safari ride", "Folk dance show", "Fort guided tour"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-14", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-15",
      slug: "mustang-overland-nepal",
      title: "Mustang Border Overland 4x4 Jeep Expedition",
      location: "Mustang, Nepal",
      category: "Adventure",
      badge: "Luxury",
      discount: "10% OFF",
      rating: 4.9,
      ratingCount: 82,
      originalPrice: 1999,
      currentPrice: 1799,
      days: 8,
      nights: 7,
      groupSize: "4-8 people",
      tags: ["4x4 Overland", "Forbidden Kingdom", "Caves & Cliffs", "Tibetan Border"],
      inclusions: ["Premium 4x4 Jeep transport", "Lo Manthang special area permit", "Local Mustang heritage guide", "Guest house & lodge stays"],
      exclusions: ["Personal winter gear", "Tips for drivers", "Lunch & drinks"],
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200", // Replaced fried chicken photo with offroad jeep
      gallery: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600"
      ],
      dayWisePlan: Array.from({ length: 8 }).map((_, i) => ({
        day: i + 1,
        title: `Mustang Expedition Day ${i + 1}`,
        description: `Drive in a rugged 4x4 jeep along the deep Kali Gandaki river gorge and explore forbidden caves on Day ${i + 1}.`,
        activities: ["4x4 overland driving", "Cave explorations", "Monastery visit"],
        meals: "Breakfast & Dinner",
        image: getDayWiseImage("pkg-15", i + 1)
      })),
      isFeatured: false
    },
    {
      id: "pkg-16",
      slug: "bali-island-escape",
      title: "Bali Island Escape",
      location: "Bali, Indonesia",
      category: "Honeymoon",
      badge: "Best Seller",
      discount: "24% OFF",
      rating: 4.9,
      ratingCount: 428,
      originalPrice: 1699,
      currentPrice: 1299,
      days: 8,
      nights: 7,
      groupSize: "2-12 people",
      tags: ["Tropical Beach", "Private Villa", "Island Cruise", "Volcano Trek"],
      inclusions: ["Luxury resort stays", "Airport transfers", "Fast boat tickets", "Daily breakfast & dinner", "Traditional spa treatment"],
      exclusions: ["International flights", "Personal expenses", "Visa fees", "Lunch & drinks"],
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600",
        "https://images.unsplash.com/photo-1537953773315-224a9e4b76c5?q=80&w=600",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
        "https://images.unsplash.com/photo-1517088455889-bfa75135412c?q=80&w=600",
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600"
      ],
      dayWisePlan: [
        {
          day: 1,
          title: "Arrival in Bali — Welcome to Paradise",
          description: "Touch down at Ngurah Rai International Airport where our team will welcome you. Transfer to your private villa in Ubud. Evening free to relax by the infinity pool.",
          activities: ["Airport pickup", "Villa check-in", "Welcome dinner", "Evening pool time"],
          meals: "Dinner Included",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600"
        },
        {
          day: 2,
          title: "Ubud — The Cultural Heart of Bali",
          description: "Explore the lush green rice paddies and historical forests of Ubud. Visit the famous monkey sanctuary and local art markets.",
          activities: ["Tegallalang Rice Terraces", "Ubud Monkey Forest", "Art Market shopping", "Tegenungan Waterfall"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600"
        },
        {
          day: 3,
          title: "Sacred Temples & Waterfall Hike",
          description: "Begin the morning with a sunrise trek to Campuhan Ridge. After breakfast, visit the sacred Tirta Empul water temple and Pura Besakih — the 'Mother Temple' of Bali.",
          activities: ["Campuhan Ridge Walk", "Tirta Empul Temple", "Pura Besakih visit", "Local lunch at warung"],
          meals: "Breakfast, Dinner",
          image: "https://images.unsplash.com/photo-1537953773315-224a9e4b76c5?q=80&w=600"
        },
        {
          day: 4,
          title: "Seminyak Beach Day & Spa Retreat",
          description: "Transfer to the coastal vibe of Seminyak. Spend the day sunbathing on the beach and indulge in a traditional 2-hour Balinese massage.",
          activities: ["Seminyak Beach", "Full-body Balinese massage", "Beach club sunset", "Seafood dinner"],
          meals: "Breakfast",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600"
        },
        {
          day: 5,
          title: "Mount Batur Sunrise Volcano Trek",
          description: "Wake before dawn for a guided trek up the active Mount Batur volcano. Reach the summit just as the sun rises over the lake. A once-in-a-lifetime experience.",
          activities: ["3AM departure for trek", "Mount Batur sunrise summit", "Breakfast at the crater", "Village cycling tour"],
          meals: "Breakfast, Dinner",
          image: "https://images.unsplash.com/photo-1517088455889-bfa75135412c?q=80&w=600"
        },
        {
          day: 6,
          title: "Nusa Penida Island Day Trip",
          description: "Take a fast boat to the rugged Nusa Penida island. Walk along the iconic T-Rex shaped Kelingking Beach cliff and swim in the crystal clear water of Crystal Bay.",
          activities: ["Speed boat to Nusa Penida", "Kelingking Beach viewpoint", "Broken Beach & Angel's Billabong", "Snorkeling at Crystal Bay"],
          meals: "Breakfast & Lunch",
          image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600"
        },
        {
          day: 7,
          title: "Cooking Class & Free Exploration",
          description: "Join an organic Balinese cooking class in a local village farm. Spend the afternoon exploring local boutiques or relaxing at your leisure.",
          activities: ["Balinese cooking class", "Kuta shopping district", "Leisure time", "Farewell dinner"],
          meals: "Breakfast & Dinner",
          image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600"
        },
        {
          day: 8,
          title: "Departure Day",
          description: "Enjoy your final tropical breakfast at the resort. Spend your last hours shopping for souvenirs before checking out and transferring to the airport for your flight home.",
          activities: ["Farewell breakfast", "Check-out & packing", "Souvenir shopping", "Airport transfer"],
          meals: "Breakfast",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600"
        }
      ],
      isFeatured: true
    }
  ];

  // Let's locate the 'export const mockTaxis = [' part
  const taxiIndex = content.indexOf("export const mockTaxis = [");
  if (taxiIndex === -1) {
    throw new Error("Could not locate mockTaxis in mockData file!");
  }

  const header = `// Auto-generated mockData with dynamic daily images, tourism replacements, and Bali Island Escape package.
export const mockPackages = ${JSON.stringify(updatedPackages, null, 2)};\n\n`;

  const restOfFile = content.substring(taxiIndex);
  return header + restOfFile;
}

try {
  // 1. Process backend mockData.js
  const backendContent = fs.readFileSync(backendMockPath, "utf-8");
  const updatedBackend = updateMockPackages(backendContent);
  fs.writeFileSync(backendMockPath, updatedBackend, "utf-8");
  console.log("SUCCESS: Updated backend mockData.js");

  // 2. Process frontend mockData.js
  const frontendContent = fs.readFileSync(frontendMockPath, "utf-8");
  const updatedFrontend = updateMockPackages(frontendContent);
  fs.writeFileSync(frontendMockPath, updatedFrontend, "utf-8");
  console.log("SUCCESS: Updated frontend mockData.js");
} catch (err) {
  console.error("Failed to run transformation:", err);
}
