import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate access and refresh token function
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user)
            throw new ApiError(409, "User not found for given user id while generating token")

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // means do not apply validation and just save

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        console.log("Error while generating token::", error)
        throw new ApiError(500, `Something went wrong while generating refresh and access token :: ${error?.message}`);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !email || !password) {
        throw new ApiError(400, "First name, email, and password are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already registered with this email");
    }

    // Create the new user
    const newUser = await User.create({ firstName, lastName, email, password });

    // Generate access and refresh tokens
    const { accessToken } = await generateAccessAndRefreshToken(newUser._id);

    // Respond with user data and tokens
    return res.status(201).json(
        new ApiResponse(201, {
            accessToken,
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        }, "User registered successfully")
    );
});

export { registerUser };