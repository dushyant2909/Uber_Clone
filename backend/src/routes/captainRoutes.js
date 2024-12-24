import { Router } from "express";
import { captainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { verifyCaptain } from "../middlewares/authMiddleware.js";

const captainRoute = Router()

captainRoute.route('/register').post(registerCaptain)
captainRoute.route('/login').post(loginCaptain)

captainRoute.use(verifyCaptain)
captainRoute.route('/profile').get(captainProfile)
captainRoute.route('/logout').get(logoutCaptain)

export default captainRoute