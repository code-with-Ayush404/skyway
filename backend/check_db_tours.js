import mongoose from "mongoose";
import { Tour } from "./src/models/Tour.js";
import * as dotenv from "dotenv";

dotenv.config();

async function checkTours() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/starline_travel";
  console.log("Connecting to", mongoUri);
  try {
    await mongoose.connect(mongoUri);
    const tours = await Tour.find({});
    console.log(`Found ${tours.length} tours:`);
    tours.forEach(t => {
      console.log(`ID: ${t.id}, Slug: ${t.slug}, Title: ${t.title}`);
      console.log(`Image: ${t.image}`);
      console.log(`DayWisePlan count: ${t.dayWisePlan.length}`);
      console.log("---");
    });
    process.exit(0);
  } catch (err) {
    console.error("Error connecting or querying:", err);
    process.exit(1);
  }
}

checkTours();
