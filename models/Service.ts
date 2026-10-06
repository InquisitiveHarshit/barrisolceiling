import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  content: string;
  author?: string;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  tags?: string[];
  faqs?: IFaqItem[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the service."],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category."],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description."],
    },
    author: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
    },
    content: {
      type: String,
      default: "",
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ServiceSchema.pre("save", function () {
  if (this.isModified("title") && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;
