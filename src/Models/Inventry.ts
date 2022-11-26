import mongoose, { Schema } from "mongoose";
import { IInventry } from "../Types/IInventry";
const InventrySchema: Schema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    uploaderId: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    displayImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Inventry = mongoose.model<IInventry>("Inventry", InventrySchema);
export default Inventry;
