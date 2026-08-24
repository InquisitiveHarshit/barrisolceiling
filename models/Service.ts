import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  content: string;
  coverImage?: string;
  tags?: string[];
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
    content: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
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
