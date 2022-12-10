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
        const order = new Orders(OrderValidation);
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
    try {
        const orderModelValidation: IOrders = await OrderValidation.validateAsync(
            req.body
        );

        if (!orderModelValidation) {
            return next(
                new createError.BadRequest(
                    "Operation failed, invalid details provided."
                )
            );
        } else {
            const newOrder = await addOrder(orderModelValidation);
            if (newOrder) {
                res.status(201).json({
                    newOrder,
                });
            } else {
                return next(
                    res.status(400).json({
                        message: "Invalid details provided.",
                    })
                );
            }
        }
    } catch (error: any) {
        if (error.isJoi === true) {
            return next(
                res.status(400).json({
                    message: "Invalid details provided.",
                })
            );
        }
        next(error);
    }
};
