import { Router } from "express";
import { JWTverify } from "../middlewares/auth.middleware.js";
import { addContent, getAllContent } from "../controller/content.controller.js";

const router = Router()

router.route("/upload").post(JWTverify ,addContent)
router.route("/get-all").get(JWTverify ,getAllContent)

export default router