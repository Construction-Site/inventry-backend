import mongoose, { Schema } from "mongoose";
import { IOrders } from "../Types/IOrder";
const OrderSchema: Schema = new Schema(
    {
        orderId: {
            type: Number,
            required: true,
        },
        userId: {
            type: Number,
            required: true,
        },
        itemId: {
            type: Number,
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
            type: Number,
            required: true,
        }
    },

    { timestamps: true }
);
const Orders = mongoose.model<IOrders>("Orders", OrderSchema);
export default Orders;
