import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    travelers: { type: Number, required: true },
    specialRequests: { type: String },
    packageId: { type: String, default: null },
    status: { type: String, enum: ["PENDING", "APPROVED", "CANCELLED"], default: "PENDING" }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
