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

const loginCaptain = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const captain = await Captain.findOne({ email })
    if (!captain) {
        throw new ApiError(404, "Captain not found with this email");
    }

    const isMatch = await captain.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(captain._id);

    // Cookie-options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(200, {
                accessToken,
                _id: captain._id,
                firstName: captain.firstName,
                lastName: captain.lastName,
                email: captain.email,
                vehicle: captain.vehicle
            }, "Captain logged in successfully")
        );
})

export { registerCaptain, loginCaptain }