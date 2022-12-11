import { Document } from "mongoose";

export interface IOrders extends Document {
    orderId: string,
    userId: string,
    itemId: string,
    orderUnits: number,
    orderStatus: string,
    transactionId: string,
}
