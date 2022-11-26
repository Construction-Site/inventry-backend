import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Inventry from "../Models/Inventry";
import { IInventry } from "../Types/IInventry";
import {
  InventryValidation,
} from "../Validations/UserValidation";

/**
 * Update user
 * @param userId
 * @param userModelValidation
 */
// const processUpdateUser = async (
//   userId: String,
//   userModelValidation: IInventry
// ) => {
//   try {
//     const updateUser = await Inventry.updateOne(
//       {
//         _id: userId,
//       },
//       {
//         $set: {
//           name: userModelValidation.name,
//           surname: userModelValidation.surname,
//         },
//       }
//     );
//     return updateUser;
//   } catch (error) {
//     console.log(error);
//   }
// };
/**
 * add new user
 * @param userModelValidation
 */
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

/**
 * Create new user
 * @param req
 * @param res
 * @param next
 */
export const createUser = async (
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

// /**
//  * Upadet user
//  * @param req
//  * @param res
//  * @param next
//  */
// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userModelValidation: IInventry = await InventryValidation.validateAsync(
//       req.body
//     );

//     if (!userModelValidation) {
//       return next(
//         new createError.BadRequest(
//           "Operation failed, invalid details provided."
//         )
//       );
//     } else {
//       const isUsernameValid = await User.findOne({
//         username: userModelValidation.username,
//       });
//       if (!isUsernameValid) {
//         res.status(404).json({
//           message: `Username ${userModelValidation.username} not valid`,
//         });
//       } else {
//         const updatedUser = await processUpdateUser(
//           isUsernameValid._id,
//           userModelValidation
//         );
//         if (updatedUser) {
//           res.status(201).json({
//             updatedUser,
//           });
//         } else {
//           return next(
//             res.status(400).json({
//               message: "Invalid details provided.",
//             })
//           );
//         }
//       }
//     }
//   } catch (error: any) {
//     if (error.isJoi === true) {
//       return next(
//         res.status(400).json({
//           message: "Invalid details provided.",
//         })
//       );
//     }
//     next(error);
//   }
// };

export const getUser = async (
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

export const updateInventry = async (
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