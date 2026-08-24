import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the blog post."],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Please provide the content of the blog post."],
    },
    excerpt: {
      type: String,
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
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
BlogSchema.pre("save", function () {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
