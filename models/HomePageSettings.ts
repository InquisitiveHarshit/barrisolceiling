import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFaq {
  question: string;
  answer: string;
}

export interface IHomePageSettings extends Document {
  metaTitle?: string;
  metaDescription?: string;
  faqs: IFaq[];
  /** Raw JSON-LD string for homepage structured data (LocalBusiness, FAQPage, etc.) */
  schemaMarkup?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
});

const HomePageSettingsSchema = new Schema<IHomePageSettings>(
  {
    metaTitle:       { type: String },
    metaDescription: { type: String },
    faqs:            { type: [FaqSchema], default: [] },
    schemaMarkup:    { type: String, default: "" },
  },
  { timestamps: true }
);

const HomePageSettings: Model<IHomePageSettings> =
  mongoose.models.HomePageSettings ||
  mongoose.model<IHomePageSettings>("HomePageSettings", HomePageSettingsSchema);

export default HomePageSettings;
