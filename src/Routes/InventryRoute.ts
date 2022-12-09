import { Router } from "express";
const router: Router = Router();
import * as InventryController from "../Controllers/InventryController";

router.post("/", InventryController.createItem);

router.get("/", InventryController.getItem);

router.put("/:id", InventryController.updateItem);

router.delete("/:id", InventryController.deleteItem);


export default router;
