import bcrypt from "bcrypt";
import { User } from "./models/User.js";
import { Tour } from "./models/Tour.js";
import { Vehicle } from "./models/Vehicle.js";
import { Testimonial } from "./models/Testimonial.js";
import { mockPackages, mockTaxis, mockWeddingCars, mockTestimonials } from "./lib/mockData.js";
import { connectDB } from "./lib/db.js";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Seeding started...");
  
  const connected = await connectDB();
  if (!connected) {
    console.error("Could not connect to database for seeding. Exiting.");
    process.exit(1);
  }

  try {
    // Delete existing
    await User.deleteMany({});
    await Tour.deleteMany({});
    await Vehicle.deleteMany({});
    await Testimonial.deleteMany({});
    console.log("Cleared existing collections.");

    // Seed admin
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      email: "admin@starlinetravel.in",
      name: "Starline Admin",
      password: hashedAdminPassword,
      role: "ADMIN"
    });
    await admin.save();
    console.log("Seeded Admin User.");

    // Seed happy traveler
    const hashedUserPassword = await bcrypt.hash("user123", 10);
    const user = new User({
      email: "traveler@starlinetravel.in",
      name: "Happy Traveler",
      password: hashedUserPassword,
      role: "USER"
    });
    await user.save();
    console.log("Seeded Traveler User.");

    // Seed tours
    for (const pkg of mockPackages) {
      const tour = new Tour({
        id: pkg.id,
        slug: pkg.slug,
        title: pkg.title,
        location: pkg.location,
        category: pkg.category,
        badge: pkg.badge,
        discount: pkg.discount,
        rating: pkg.rating,
        ratingCount: pkg.ratingCount,
        originalPrice: pkg.originalPrice,
        currentPrice: pkg.currentPrice,
        days: pkg.days,
        nights: pkg.nights,
        groupSize: pkg.groupSize,
        tags: pkg.tags,
        inclusions: pkg.inclusions,
        exclusions: pkg.exclusions,
        image: pkg.image,
        dayWisePlan: pkg.dayWisePlan,
        gallery: pkg.gallery,
        isFeatured: pkg.isFeatured
      });
      await tour.save();
    }
    console.log(`Seeded ${mockPackages.length} tours.`);

    // Seed taxi cars
    for (const taxi of mockTaxis) {
      const car = new Vehicle({
        id: taxi.id,
        name: taxi.name,
        vehicleType: "TAXI",
        category: taxi.category,
        image: taxi.image,
        capacity: taxi.capacity,
        transmission: taxi.transmission,
        isFeatured: taxi.isFeatured,
        pricePerKm: taxi.pricePerKm,
        extraHoursRate: taxi.extraHoursRate,
        nightCharge: taxi.nightCharge,
        dailyLimitKm: taxi.dailyLimitKm,
        luggage: taxi.luggage,
        fuelType: taxi.fuelType
      });
      await car.save();
    }
    console.log(`Seeded ${mockTaxis.length} taxi cars.`);

    // Seed wedding cars
    for (const wed of mockWeddingCars) {
      const car = new Vehicle({
        id: wed.id,
        name: wed.name,
        vehicleType: "WEDDING",
        category: wed.category,
        image: wed.image,
        capacity: wed.capacity,
        transmission: wed.transmission,
        isFeatured: wed.isFeatured,
        price: wed.price,
        originalPrice: wed.originalPrice,
        isDecorated: wed.isDecorated,
        floralPackagePrice: wed.floralPackagePrice,
        features: wed.features
      });
      await car.save();
    }
    console.log(`Seeded ${mockWeddingCars.length} wedding cars.`);

    // Seed testimonials
    for (const t of mockTestimonials) {
      const item = new Testimonial({
        name: t.name,
        avatar: t.avatar,
        rating: t.rating,
        text: t.text,
        tourName: t.tourName
      });
      await item.save();
    }
    console.log(`Seeded ${mockTestimonials.length} testimonials.`);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

main();
