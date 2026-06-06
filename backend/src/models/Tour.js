import mongoose, { Schema } from "mongoose";

const DayPlanSchema = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: { type: [String], default: [] },
  meals: { type: String, required: true },
  image: { type: String, default: null }
}, { _id: false });

const TourSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    badge: { type: String, default: null },
    discount: { type: String, default: null },
    rating: { type: Number, default: 5.0 },
    ratingCount: { type: Number, default: 0 },
    originalPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    groupSize: { type: String, required: true },
    tags: { type: [String], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    image: { type: String, required: true },
    dayWisePlan: { type: [DayPlanSchema], default: [] },
    gallery: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);
