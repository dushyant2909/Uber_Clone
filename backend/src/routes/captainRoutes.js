import { Router } from "express";
import { captainProfile, loginCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { verifyCaptain } from "../middlewares/authMiddleware.js";

const captainRoute = Router()

captainRoute.route('/register').post(registerCaptain)
captainRoute.route('/login').post(loginCaptain)

captainRoute.use(verifyCaptain)
captainRoute.route('/profile').get(captainProfile)

export default captainRoute