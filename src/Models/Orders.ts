import mongoose, { Schema } from "mongoose";
import { IOrders } from "../Types/IOrder";
const OrderSchema: Schema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        orderUnits: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        }
    },

    { timestamps: true }
);
const Orders = mongoose.model<IOrders>("Orders", OrderSchema);
export default Orders;
