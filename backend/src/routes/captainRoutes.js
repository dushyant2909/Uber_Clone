import { Router } from "express";
import { loginCaptain, registerCaptain } from "../controllers/captain.controller.js";

const captainRoute = Router()

captainRoute.route('/register').post(registerCaptain)
captainRoute.route('/login').post(loginCaptain)

export default captainRoute