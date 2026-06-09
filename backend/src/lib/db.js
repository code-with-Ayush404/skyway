import mongoose from "mongoose";

let isDbConnected = false;

export async function connectDB() {
  if (isDbConnected) return true;

  const mongoUri = process.env.MONGODB_URI || "mongodb://divi_1026:Divya@ac-v5ahkso-shard-00-00.ghy23v9.mongodb.net:27017,ac-v5ahkso-shard-00-01.ghy23v9.mongodb.net:27017,ac-v5ahkso-shard-00-02.ghy23v9.mongodb.net:27017/TRAVEL_AYUSH?ssl=true&replicaSet=atlas-11dxho-shard-0&authSource=admin&retryWrites=true&w=majority&appName=CodingAdda/";
  console.log(mongoUri);
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
