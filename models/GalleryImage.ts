import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  title?: string;
  location?: string;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// If the model exists, use it; otherwise, create a new one.
export const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
