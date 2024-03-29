import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Elastic from "../elastic/elastic";
import Inventry from "../Models/Inventry";
import { IInventry } from "../Types/IInventry";

const elasticInstance = new Elastic();
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
    console.log("CameHere");
    const [elasticInsert, newItem] = await Promise.all([elasticInstance.insertDocs({ index: 'items_v1', document: req.body}),addItem(req.body)])
    console.log(elasticInsert);
    if (newItem && elasticInsert) {
          res.status(201).json({
            response: [elasticInsert, newItem],
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
  } catch (error: any) {
    console.log(error);
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


export const getItemDeatails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventryDetails = await Inventry.findById(req.params.id);
    if (!inventryDetails) {
      res.status(404).json({
        message: `Inventry not available`,
      });
    } else {
      return next(inventryDetails);
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

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {q} = req.query;
  const query = {
    "multi_match": {
      "query" : q,
      "fields": ["description", "displayName"],
      "type": "phrase_prefix"
    }
  }

  const response = await elasticInstance.search({ index: 'items_v1', query });
  next(response.hits.hits);
};