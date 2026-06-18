// this is travel website
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { connectDB, isDbOffline } from "./lib/db.js";
import { User } from "./models/User.js";
import { 
  getTours, 
  getTourBySlug, 
  getTaxiCars, 
  getWeddingCars, 
  getTestimonials, 
  createBooking, 
  createContactMessage, 
  subscribeNewsletter 
} from "./lib/dataService.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-skyway-jwt-key";

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Database connection on start
connectDB();

// Test root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Skyway Travel API Server is running." });
});

// Authentication: Login endpoint (returns user + JWT token)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
   // console.log("LOGIN BODY:", req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

//  console.log("EMAIL:", email);
//  console.log("PASSWORD:", password);

  await connectDB();
  let user = null;

  if (!isDbOffline()) {
    try {
      user = await User.findOne({ email });
      if (user && user.password) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
          );
          return res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token
          });
        }
      }
    } catch (err) {
      console.error("Login database error:", err);
    }
  }

  // Fallback demo credentials
  if (email === "admin@skywaytravel.in" && password === "admin123") {
    const token = jwt.sign({ id: "admin-mock-id", email, role: "ADMIN" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      user: { id: "admin-mock-id", email, name: "Skyway Admin", role: "ADMIN" },
      token
    });
  }

  if (email === "traveler@skywaytravel.in" && password === "user123") {
    const token = jwt.sign({ id: "user-mock-id", email, role: "USER" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      user: { id: "user-mock-id", email, name: "Happy Traveler", role: "USER" },
      token
    });
  }

  return res.status(401).json({ error: "Invalid email or password combination." });
});

// Authentication: Register endpoint
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  await connectDB();
  if (isDbOffline()) {
    return res.status(503).json({ error: "Database is offline. Registration is unavailable. Please use demo credentials." });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email address already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "USER"
    });
    await user.save();
    return res.json({ message: "Registration successful! You can now log in." });
  } catch (err) {
    console.error("Registration database error:", err);
    return res.status(500).json({ error: "An error occurred during registration." });
  }
});

// Tours: Fetch and filter
app.get("/api/packages", async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const category = req.query.category || "All";
    const minPrice = parseFloat(req.query.minPrice || "0");
    const maxPrice = parseFloat(req.query.maxPrice || "5000");
    const sort = req.query.sort || "Recommended";

    let packages = await getTours();

    // 1. Search Query filter
    if (search) {
      packages = packages.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search) ||
          p.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    // 2. Category filter
    if (category !== "All") {
      packages = packages.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 3. Price Range filter
    packages = packages.filter(
      (p) => p.currentPrice >= minPrice && p.currentPrice <= maxPrice
    );

    // 4. Sorting
    if (sort === "Price Low-High") {
      packages.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sort === "Price High-Low") {
      packages.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (sort === "Rating") {
      packages.sort((a, b) => b.rating - a.rating);
    }

    return res.json(packages);
  } catch (error) {
    console.error("GET /api/packages error:", error);
    return res.status(500).json({ error: "Failed to fetch packages" });
  }
});

// Tours: Fetch single by slug
app.get("/api/packages/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const tour = await getTourBySlug(slug);
    if (!tour) {
      return res.status(404).json({ error: "Tour package not found" });
    }
    return res.json(tour);
  } catch (error) {
    console.error("GET /api/packages/:slug error:", error);
    return res.status(500).json({ error: "Failed to fetch package details" });
  }
});

// Taxi Cars: Fetch and filter
app.get("/api/taxi-cars", async (req, res) => {
  try {
    const category = req.query.category;
    let cars = await getTaxiCars();

    if (category && category !== "All") {
      cars = cars.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }
    return res.json(cars);
  } catch (error) {
    console.error("GET /api/taxi-cars error:", error);
    return res.status(500).json({ error: "Failed to fetch taxi fleet" });
  }
});

// Wedding Cars: Fetch and filter
app.get("/api/wedding-cars", async (req, res) => {
  try {
    const category = req.query.category;
    let cars = await getWeddingCars();

    if (category && category !== "All") {
      cars = cars.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }
    return res.json(cars);
  } catch (error) {
    console.error("GET /api/wedding-cars error:", error);
    return res.status(500).json({ error: "Failed to fetch wedding cars" });
  }
});

// Bookings: Submit request
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    
    // Simulate Nodemailer email console alert
    console.log(`\n======================================================
[EMAIL NOTIFICATION] - NEW BOOKING CONFIRMED
To: admin@skywaytravel.in, ${booking.email}
Subject: Skyway Travel Booking Request Receipt - #${booking.id}
Dear ${booking.name},
Your request for tour package booking has been logged successfully.
Booking Details:
- Travelers: ${booking.travelers}
- Travel Date: ${new Date(booking.travelDate).toLocaleDateString()}
- Status: PENDING
======================================================\n`);

    return res.status(201).json(booking);
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return res.status(500).json({ error: "Failed to submit booking request" });
  }
});

// Enquiries: Submit contact message
app.post("/api/enquiries", async (req, res) => {
  try {
    const msg = await createContactMessage(req.body);
    
    // Simulate Nodemailer email console alert
    console.log(`\n======================================================
[EMAIL NOTIFICATION] - NEW CONTACT ENQUIRY RECEIVED
To: enquiries@skywaytravel.in
Subject: Contact Enquiry from ${msg.fullName}
Details:
- Phone: ${msg.phone}
- Email: ${msg.email}
- Message: ${msg.message}
======================================================\n`);

    return res.status(201).json(msg);
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return res.status(500).json({ error: "Failed to log enquiry message" });
  }
});

// Newsletter: Subscribe
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const sub = await subscribeNewsletter(email);
    return res.status(200).json(sub);
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return res.status(500).json({ error: "Failed to register newsletter subscription" });
  }
});

// Testimonials: Fetch
app.get("/api/testimonials", async (req, res) => {
  try {
    const list = await getTestimonials();
    return res.json(list);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// Admin Routes - Tour & Vehicle Management
app.use("/api/admin", adminRoutes);

// Start Express Server
app.listen(PORT, () => {
  console.log(`SUCCESS: Backend server is running on http://localhost:${PORT}`);
});
