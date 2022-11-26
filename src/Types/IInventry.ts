import { Document } from "mongoose";

export interface IInventry extends Document {
  displayName:  string,
  uploaderId: number,
  price: number,
  unit: string,
  categoryId: number,
  displayImage: string,
  description: string,
}
