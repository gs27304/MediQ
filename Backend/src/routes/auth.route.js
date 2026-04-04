import express from "express"
import {login , signUp} from "../controllers/auth.controller.js"
import {upload} from "../middlewares/multer.js"
const router=express.Router();

router.route("/register")
    .post(
        upload.single("photo"),
        signUp
    )

router.route("/login")
    .post(login)


export default router