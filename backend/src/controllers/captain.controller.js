import { Captain } from "../models/captain.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (captainId) => {
    try {
        const captain = await Captain.findById(captainId)
        if (!captain)
            throw new ApiError(409, "Captain not found for given id while generating token")

        const accessToken = await captain.generateAccessToken();
        const refreshToken = await captain.generateRefreshToken();

        captain.refreshToken = refreshToken;
        await captain.save({ validateBeforeSave: false }); // means do not apply validation and just save

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        console.log("Error while generating token::", error)
        throw new ApiError(500, `Something went wrong while generating refresh and access token :: ${error?.message}`);
    }
}

const registerCaptain = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        vehicle,
    } = req.body;

    // Validate required fields
    if (!firstName || !email || !password || !vehicle || !vehicle.color || !vehicle.number || !vehicle.capacity || !vehicle.type) {
        throw new ApiError(400, "Missing required fields");
    }

    // Check if the captain already exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
        throw new ApiError(409, "Captain already registered with this email");
    }

    // Create the new captain
    const newCaptain = await Captain.create({ firstName, lastName, email, password, vehicle });

    // Generate access and refresh tokens
    const { accessToken } = await generateAccessAndRefreshToken(newCaptain._id);

    // Respond with captain data and tokens
    return res.status(201).json(
        new ApiResponse(201, {
            accessToken,
            _id: newCaptain._id,
            firstName: newCaptain.firstName,
            lastName: newCaptain.lastName,
            email: newCaptain.email,
            vehicle: newCaptain.vehicle
        }, "Captain registered successfully")
    );
})

export { registerCaptain }