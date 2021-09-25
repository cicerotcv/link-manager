import { Document } from "mongoose";
import mongoose from "../database";

interface IShortLink extends Document {
  user: Document["_id"];
  link: string;
  prefix: string;
  full?: string;
  shortCode: string;
}

const LinkSchema = new mongoose.Schema<IShortLink>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    link: {
      type: String,
      unique: true,
      required: true
    },
    prefix: {
      type: String,
      required: true
    },
    shortCode: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

LinkSchema.virtual("full").get(function (this: IShortLink) {
  return `/${this.prefix}/${this.shortCode}`;
});

export const ShortLink = mongoose.model<IShortLink>("ShortLink", LinkSchema);
