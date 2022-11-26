import { Router } from "express";
const router: Router = Router();
import * as UserController from "../Controllers/UserController";

//create user
router.post("/", UserController.createUser);

router.get("/", UserController.getUser);

//update user
// router.patch("/", UserController.updateUser);

export default router;
