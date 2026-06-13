// import mongoose, { Schema } from "mongoose";

// const VehicleSchema = new Schema(
//   {
//     id: { type: String, required: true, unique: true, index: true },
//     name: { type: String, required: true },
//     vehicleType: { type: String, enum: ["TAXI", "WEDDING"], required: true, index: true },
//     category: { type: String, required: true },
//     image: { type: String, required: true },
//     capacity: { type: Number, required: true },
//     transmission: { type: String, required: true },
//     isFeatured: { type: Boolean, default: false },

//     // Taxi specific
//     pricePerKm: { type: Number },
//     extraHoursRate: { type: Number },
//     nightCharge: { type: Number },
//     dailyLimitKm: { type: Number, default: 250 },
//     luggage: { type: Number },
//     fuelType: { type: String },

//     // Wedding specific
//     price: { type: Number },
//     originalPrice: { type: Number },
//     isDecorated: { type: Boolean, default: false },
//     floralPackagePrice: { type: Number, default: 0 },
//     features: { type: [String], default: [] }
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//       transform: (doc, ret) => {
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//       }
//     }
//   }
// );

// export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);


import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    id: {
  type: String,
  unique: true,
  default: () => `vehicle-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
},
    vehicleType: {
      type: String,
      enum: ["TAXI", "WEDDING"],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    pricePerKm: {
      type: String,
      required: true,
    },

    extraKmPrice: {
      type: String,
      required: true,
    },

    extraHours: {
      type: String,
      required: true,
    },

    nightCharge: {
      type: String,
      required: true,
    },

    outStation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;