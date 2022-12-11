import Joi from "joi";

export const InventryValidation = Joi.object({
  displayName: Joi.string().required(),
  uploaderId: Joi.string().required(),
  price: Joi.number().required(),
  unit: Joi.string().required(),
  categoryId: Joi.string().required(),
  displayImage: Joi.string().required(),
  description: Joi.string().required(),
}).options({ stripUnknown: false, convert: true, abortEarly: false });

