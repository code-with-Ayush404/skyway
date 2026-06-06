import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    text: { type: String, required: true },
    tourName: { type: String, required: true }
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

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
