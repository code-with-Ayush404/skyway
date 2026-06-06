import mongoose, { Schema } from "mongoose";

const NewsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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

export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
