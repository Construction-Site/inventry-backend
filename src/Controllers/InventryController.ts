import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Inventry from "../Models/Inventry";
import { IInventry } from "../Types/IInventry";

const addItem = async (itemData: IInventry) => {
  try {
    const user = new Inventry(itemData);
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
      const newItem = await addItem(req.body);
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
  } catch (error: any) {
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
      return next(inventryList);
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