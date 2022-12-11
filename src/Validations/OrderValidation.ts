import Joi from "joi";

export const OrderValidation = Joi.object({
    orderId: Joi.string().required(),
    userId: Joi.string().required(),
    itemId: Joi.string().required(),
    orderUnits: Joi.number().required(),
    orderStatus: Joi.string().required(),
    transactionId: Joi.string().required(),
});

