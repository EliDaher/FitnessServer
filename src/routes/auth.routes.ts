import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { addWeight, addheight, addage, addgender } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/addWeight", addWeight);

router.post("/addHeight", addheight);

router.post("/addAge", addage);

router.post("/addGender", addgender);

export default router;
