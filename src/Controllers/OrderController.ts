import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Orders from "../Models/Orders";
import { IOrders } from "../Types/IOrder";
import {
    OrderValidation,
} from "../Validations/OrderValidation";

/**
 * add new order
 * @param orderValidation
 */
const addOrder = async (orderValidation: IOrders) => {
    try {
        const order = new Orders(orderValidation);
        return order.save();
    } catch (error) {
        console.error(error);
        throw new createError.BadRequest("Bad request.");
    }
};

/**
 * Create new order
 * @param req
 * @param res
 * @param next
 */
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newOrder = await addOrder(req.body);
    return next(newOrder);
};

export const getOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {   
    const {id} = req.params;
    const orderDetails = await Orders.findById(id);
    return next(orderDetails);
};

export const getCartDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const orderDetails = await Orders.find({ userId, orderStatus: "inCart" });
    return next(orderDetails);
};
