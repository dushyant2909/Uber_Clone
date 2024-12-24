import { Router } from "express";
import { registerCaptain } from "../controllers/captain.controller.js";

const captainRoute = Router()

captainRoute.route('/register').post(registerCaptain)

export default captainRoute