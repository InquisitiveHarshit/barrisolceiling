import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactLead extends Document {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  createdAt: Date;
}

const ContactLeadSchema = new Schema<IContactLead>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// If the model exists, use it; otherwise, create a new one.
export const ContactLead: Model<IContactLead> =
  mongoose.models.ContactLead ||
  mongoose.model<IContactLead>("ContactLead", ContactLeadSchema);
