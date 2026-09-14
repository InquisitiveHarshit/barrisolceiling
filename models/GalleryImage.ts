import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  title?: string;
  location?: string;
  showInHero: boolean;
  // Spec row metadata
  material?: string;
  materialSpec?: string;
  lightingCCT?: string;
  lightingDimming?: string;
  photometrics?: string;
  warranty?: string;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url:       { type: String, required: true },
    publicId:  { type: String, required: true },
    title:     { type: String, default: "" },
    location:  { type: String, default: "" },
    showInHero:{ type: Boolean, default: false },
    material:      { type: String, default: "" },
    materialSpec:  { type: String, default: "" },
    lightingCCT:   { type: String, default: "" },
    lightingDimming: { type: String, default: "" },
    photometrics:  { type: String, default: "" },
    warranty:      { type: String, default: "" },
  },
  { timestamps: true }
);

export const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
