import mongoose from "mongoose";

let isDbConnected = false;

export async function connectDB() {
  if (isDbConnected) return true;

  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/starline_travel";
  
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000
    });
    isDbConnected = true;
    console.log("SUCCESS: Connected to MongoDB.");
    return true;
  } catch {
    console.warn("WARNING: MongoDB connection failed. Falling back to local in-memory mock datasets.");
    isDbConnected = false;
    return false;
  }
}

export function isDbOffline() {
  return !isDbConnected;
}
