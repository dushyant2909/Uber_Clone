import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifyUser } from "../middlewares/authMiddleware.js";

const userRoute = Router()

userRoute.route("/register").post(registerUser)
userRoute.route("/login").post(loginUser)

userRoute.use(verifyUser)
userRoute.route("/profile").get(getUserProfile)

export default userRoute