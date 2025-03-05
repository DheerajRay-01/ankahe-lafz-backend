import { Router } from "express";
import { registerUser ,loginUser, userLogout, getCurrentUser} from "../controller/user.controller.js";
import { JWTverify } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(JWTverify, userLogout)
router.route("/user-now").get(JWTverify, getCurrentUser)

export default router