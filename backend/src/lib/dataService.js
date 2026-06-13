import { Tour } from "../models/Tour.js";
import Vehicle  from "../models/Vehicle.js";
import { Testimonial } from "../models/Testimonial.js";
import { Booking } from "../models/Booking.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Newsletter } from "../models/Newsletter.js";
import { connectDB, isDbOffline } from "./db.js";
import { mockPackages, mockTaxis, mockWeddingCars, mockTestimonials } from "./mockData.js";

export async function getTours() {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const tours = await Tour.find().sort({ createdAt: -1 });
      if (tours.length > 0) return tours;
    } catch (err) {
      console.error("Error fetching tours from DB:", err);
    }
  }
  return mockPackages;
}

export async function getTourBySlug(slug) {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const tour = await Tour.findOne({ slug });
      if (tour) return tour;
    } catch (err) {
      console.error("Error fetching tour by slug from DB:", err);
    }
  }
  return mockPackages.find(p => p.slug === slug) || null;
}

export async function getTaxiCars() {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const taxis = await Vehicle.find({ vehicleType: "TAXI" }).sort({ name: 1 });
      if (taxis.length > 0) return taxis;
    } catch (err) {
      console.error("Error fetching taxi cars from DB:", err);
    }
  }
  return mockTaxis;
}

export async function getWeddingCars() {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const weddings = await Vehicle.find({ vehicleType: "WEDDING" }).sort({ name: 1 });
      if (weddings.length > 0) return weddings;
    } catch (err) {
      console.error("Error fetching wedding cars from DB:", err);
    }
  }
  return mockWeddingCars;
}

export async function getTestimonials() {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const items = await Testimonial.find().sort({ createdAt: -1 });
      if (items.length > 0) return items;
    } catch (err) {
      console.error("Error fetching testimonials from DB:", err);
    }
  }
  return mockTestimonials;
}

export async function createBooking(data) {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const booking = new Booking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        travelDate: new Date(data.travelDate),
        travelers: Number(data.travelers),
        specialRequests: data.specialRequests,
        packageId: data.packageId || null,
        status: "PENDING"
      });
      return await booking.save();
    } catch (err) {
      console.error("Error creating booking in DB:", err);
    }
  }
  return {
    id: `booking-mock-${Date.now()}`,
    ...data,
    travelDate: new Date(data.travelDate),
    status: "PENDING",
    createdAt: new Date()
  };
}

export async function createContactMessage(data) {
  await connectDB();
  if (!isDbOffline()) {
    try {
      const message = new ContactMessage({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: "PENDING"
      });
      return await message.save();
    } catch (err) {
      console.error("Error creating contact message in DB:", err);
    }
  }
  return {
    id: `enquiry-mock-${Date.now()}`,
    ...data,
    status: "PENDING",
    createdAt: new Date()
  };
}

export async function subscribeNewsletter(email) {
  await connectDB();
  if (!isDbOffline()) {
    try {
      let sub = await Newsletter.findOne({ email });
      if (!sub) {
        sub = new Newsletter({ email });
        await sub.save();
      }
      return sub;
    } catch (err) {
      console.error("Error subscribing newsletter in DB:", err);
    }
  }
  return {
    id: `news-mock-${Date.now()}`,
    email,
    createdAt: new Date()
  };
}
