import { Router } from "express";
const router: Router = Router();
import * as InventryController from "../Controllers/InventryController";
import {
    InventryValidation,
} from '../Validations';
import validateBody from "../middlewares/requestValidator";

/**
* @swagger
* /inventry:
*  post:
*   tags: [INVENTRY API's]
*   description: Add item in inventry
*   summary: Add item in inventry
*   requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            properties:
*              displayName:
*                type: string
*                required: true
*                example: "sample-name"
*              uploaderId:
*                type: string
*                required: true
*                example: "sample-name"
*              price:
*                type: number
*                required: true
*                example: 10
*              unit:
*                type: string
*                required: true
*                example: 'g'
*              categoryId:
*                type: string
*                required: true
*                example: "sample-name"
*              displayImage:
*                type: string
*                required: true
*                example: "https://faldu.com"
*              description:
*                type: string
*                required: true
*                example: "description about the product comes here"
*   responses:
*     200:
*       description: Ok
*/ 
router.post("/", validateBody(InventryValidation),InventryController.createItem);

/**
 * @swagger
 * /inventry:
 *  get:
 *   tags: [INVENTRY API's]
 *   description: Get List of all items
 *   summary: Get List of all items
 *   responses:
 *     200:
 *       type:
 *         object
 */

router.get("/", InventryController.getItem);

router.put("/:id", validateBody(InventryValidation),InventryController.updateItem);

router.delete("/:id", InventryController.deleteItem);

router.get("/details/:id", InventryController.getItemDeatails);

router.get("/search", InventryController.search);
export default router;
