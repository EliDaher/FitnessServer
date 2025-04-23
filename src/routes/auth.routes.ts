import { Router } from "express";
import { signup, verifyToken, login } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);

router.post("/verify", verifyToken);

router.post("/login", login);

export default router;
