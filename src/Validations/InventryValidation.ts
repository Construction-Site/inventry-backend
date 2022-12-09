import Joi from "joi";

export const InventryValidation = Joi.object({
  displayName: Joi.string().required(),
  uploaderId: Joi.number().required(),
  price: Joi.number().required(),
  unit: Joi.string().required(),
  categoryId: Joi.number().required(),
  displayImage: Joi.string().required(),
  description: Joi.string().required(),
});

