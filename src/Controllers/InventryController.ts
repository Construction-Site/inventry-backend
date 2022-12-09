import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Inventry from "../Models/Inventry";
import { IInventry } from "../Types/IInventry";
import {
  InventryValidation,
} from "../Validations/InventryValidation";

const addItem = async (userModelValidation: IInventry) => {
  try {
    const user = new Inventry(userModelValidation);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    console.error(error);
    throw new createError.BadRequest("Bad request.");
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventryModelValidation: IInventry = await InventryValidation.validateAsync(
      req.body
    );

    if (!inventryModelValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else { 
      const newItem = await addItem(inventryModelValidation);
      if (newItem) {
          res.status(201).json({
            newItem,
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

export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const inventryList = await Inventry.find({});
    if (!inventryList) {
        res.status(404).json({
          message: `Inventry not available`,
        });
      } else {
        res.status(200).json({
          ...inventryList,
        });
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

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventryUpdateResponse = await Inventry.findByIdAndUpdate(req.params.id,{...req.body});
      res.status(200).json({
        ...inventryUpdateResponse,
      });
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

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventryDelelteResponse = await Inventry.findByIdAndDelete( req.params.id);
    res.status(200).json({
      ...inventryDelelteResponse,
    });
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