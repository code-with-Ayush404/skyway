// import { Vehicle } from "../models/Vehicle.js";
// import { connectDB, isDbOffline } from "./db.js";

// export async function createVehicle(data) {
//   await connectDB();
//   if (isDbOffline()) {
//     return {
//       id: `vehicle-mock-${Date.now()}`,
//       ...data,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };
//   }

//   try {
//     const vehicle = new Vehicle(data);
//     return await vehicle.save();
//   } catch (err) {
//     console.error("Error creating vehicle:", err);
//     throw err;
//   }
// }

// export async function updateVehicle(id, data) {
//   await connectDB();
//   if (isDbOffline()) {
//     return { id, ...data, updatedAt: new Date() };
//   }

//   try {
//     const vehicle = await Vehicle.findOneAndUpdate(
//       { id },
//       data,
//       { new: true, runValidators: true }
//     );
//     return vehicle;
//   } catch (err) {
//     console.error("Error updating vehicle:", err);
//     throw err;
//   }
// }

// export async function deleteVehicle(id) {
//   await connectDB();
//   if (isDbOffline()) {
//     return { id, deleted: true };
//   }

//   try {
//     const result = await Vehicle.findOneAndDelete({ id });
//     return result;
//   } catch (err) {
//     console.error("Error deleting vehicle:", err);
//     throw err;
//   }
// }

// export async function getVehicleById(id) {
//   await connectDB();
//   if (isDbOffline()) {
//     return null;
//   }

//   try {
//     const vehicle = await Vehicle.findOne({ id });
//     return vehicle;
//   } catch (err) {
//     console.error("Error fetching vehicle:", err);
//     throw err;
//   }
// }

// export async function getVehiclesByType(vehicleType) {
//   await connectDB();
//   if (isDbOffline()) {
//     return [];
//   }

//   try {
//     const vehicles = await Vehicle.find({ vehicleType }).sort({ name: 1 });
//     return vehicles;
//   } catch (err) {
//     console.error("Error fetching vehicles by type:", err);
//     throw err;
//   }
// }
// export async function getAllVehicles() {
//   await connectDB();

//   if (isDbOffline()) {
//     return [];
//   }

//   try {
//     return await Vehicle.find({}).sort({ createdAt: -1 });
//   } catch (err) {
//     console.error("Error fetching vehicles:", err);
//     throw err;
//   }
// }


import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (data) => {
  const vehicle = await Vehicle.create({
    vehicleType: data.vehicleType,
    name: data.name,
    image: data.image,
    pricePerKm: data.pricePerKm,
    extraKmPrice: data.extraKmPrice,
    extraHours: data.extraHours,
    nightCharge: data.nightCharge,
    outStation: data.outStation,
  });

  return vehicle;
};

export const getAllVehicles = async () => {
  return await Vehicle.find().sort({ createdAt: -1 });
};

export const getVehicleById = async (id) => {
  return await Vehicle.findOne({
    $or: [{ _id: id }, { id: id }],
  });
};

export const updateVehicle = async (id, data) => {
  return await Vehicle.findOneAndUpdate(
    {
      $or: [{ _id: id }, { id: id }],
    },
    data,
    { new: true }
  );
};

export const deleteVehicle = async (id) => {
  return await Vehicle.findOneAndDelete({
    $or: [{ _id: id }, { id: id }],
  });
};