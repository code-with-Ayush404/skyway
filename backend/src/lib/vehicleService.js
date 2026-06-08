import { Vehicle } from "../models/Vehicle.js";
import { connectDB, isDbOffline } from "./db.js";

export async function createVehicle(data) {
  await connectDB();
  if (isDbOffline()) {
    return {
      id: `vehicle-mock-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  try {
    const vehicle = new Vehicle(data);
    return await vehicle.save();
  } catch (err) {
    console.error("Error creating vehicle:", err);
    throw err;
  }
}

export async function updateVehicle(id, data) {
  await connectDB();
  if (isDbOffline()) {
    return { id, ...data, updatedAt: new Date() };
  }

  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      { id },
      data,
      { new: true, runValidators: true }
    );
    return vehicle;
  } catch (err) {
    console.error("Error updating vehicle:", err);
    throw err;
  }
}

export async function deleteVehicle(id) {
  await connectDB();
  if (isDbOffline()) {
    return { id, deleted: true };
  }

  try {
    const result = await Vehicle.findOneAndDelete({ id });
    return result;
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    throw err;
  }
}

export async function getVehicleById(id) {
  await connectDB();
  if (isDbOffline()) {
    return null;
  }

  try {
    const vehicle = await Vehicle.findOne({ id });
    return vehicle;
  } catch (err) {
    console.error("Error fetching vehicle:", err);
    throw err;
  }
}

export async function getVehiclesByType(vehicleType) {
  await connectDB();
  if (isDbOffline()) {
    return [];
  }

  try {
    const vehicles = await Vehicle.find({ vehicleType }).sort({ name: 1 });
    return vehicles;
  } catch (err) {
    console.error("Error fetching vehicles by type:", err);
    throw err;
  }
}
