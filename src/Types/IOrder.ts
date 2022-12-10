import { Document } from "mongoose";

export interface IOrders extends Document {
    orderId: number,
    userId: number,
    itemId: number,
    orderUnits: number,
    orderStatus: string,
    transactionId: number,
}
