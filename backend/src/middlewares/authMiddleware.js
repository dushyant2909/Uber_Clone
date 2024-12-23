import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import ApiError from '../utils/ApiError'
import { asyncHandler } from '../utils/asyncHandler'

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) throw new ApiError(401, "Unauthorized");

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) throw new ApiError(401, "Invalid token");

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authMiddleware::", error.message || error);
        throw new ApiError(401, error?.message || "Error in verifying token");
    }
})

export { verifyUser }