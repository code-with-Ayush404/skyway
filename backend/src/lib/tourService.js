import { Tour } from "../models/Tour.js";
import { connectDB, isDbOffline } from "./db.js";

export async function createTour(data) {
  await connectDB();
  if (isDbOffline()) {
    return {
      id: `tour-mock-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  try {
    const tour = new Tour(data);
    return await tour.save();
  } catch (err) {
    console.error("Error creating tour:", err);
    throw err;
  }
}

export async function updateTour(id, data) {
  await connectDB();
  if (isDbOffline()) {
    return { id, ...data, updatedAt: new Date() };
  }

  try {
    const tour = await Tour.findOneAndUpdate(
      { id },
      data,
      { new: true, runValidators: true }
    );
    return tour;
  } catch (err) {
    console.error("Error updating tour:", err);
    throw err;
  }
}

export async function deleteTour(id) {
  await connectDB();
  if (isDbOffline()) {
    return { id, deleted: true };
  }

  try {
    const result = await Tour.findOneAndDelete({ id });
    return result;
  } catch (err) {
    console.error("Error deleting tour:", err);
    throw err;
  }
}

export async function getTourById(id) {
  await connectDB();
  if (isDbOffline()) {
    return null;
  }

  try {
    const tour = await Tour.findOne({ id });
    return tour;
  } catch (err) {
    console.error("Error fetching tour:", err);
    throw err;
  }
}
export async function getAllTours() {
  await connectDB();

  if (isDbOffline()) {
    return [];
  }

  try {
    return await Tour.find({});
  } catch (err) {
    console.error("Error fetching tours:", err);
    throw err;
  }
}
