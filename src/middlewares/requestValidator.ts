import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function validateBody(schema: Joi.ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
        } catch (error: any) {
            return res.status(400).json(error.details.map((errorInstances: any) => errorInstances.message));
        }
        next();
    }
}

export default validateBody;