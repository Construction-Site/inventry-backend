import { Router } from "express";
const router: Router = Router();
import * as UserController from "../Controllers/UserController";

//create user
router.post("/", UserController.createUser);

router.get("/", UserController.getUser);

router.put("/:id", UserController.updateInventry)

//update user
// router.patch("/", UserController.updateUser);

export default router;
