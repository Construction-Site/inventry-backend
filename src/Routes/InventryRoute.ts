import { Router } from "express";
const router: Router = Router();
import * as InventryController from "../Controllers/InventryController";
import {
    InventryValidation,
} from '../Validations';
import validateBody from "../middlewares/requestValidator";

router.post("/", validateBody(InventryValidation),InventryController.createItem);

router.get("/", InventryController.getItem);

router.put("/:id", validateBody(InventryValidation),InventryController.updateItem);

router.delete("/:id", InventryController.deleteItem);

router.get("/details/:id", InventryController.getItemDeatails);
export default router;
