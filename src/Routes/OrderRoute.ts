import { Router } from "express";
const router: Router = Router();
import * as OrderController from "../Controllers/OrderController";
import { OrderValidation } from '../Validations';
import validateBody from "../middlewares/requestValidator";

router.post("/", validateBody(OrderValidation), OrderController.createOrder);

router.get("/:id", OrderController.getOrderDetails);

// router.put("/:id", validateBody(OrderValidation), OrderController.updateOrder);

// router.delete("/:id", OrderController.deleteOrder);


export default router;
