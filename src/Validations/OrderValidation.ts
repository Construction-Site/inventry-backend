import Joi from "joi";

export const OrderValidation = Joi.object({
    orderId: Joi.number().required(),
    userId: Joi.number().required(),
    itemId: Joi.number().required(),
    orderUnits: Joi.number().required(),
    orderStatus: Joi.string().required(),
    transactionId: Joi.number().required(),
});

