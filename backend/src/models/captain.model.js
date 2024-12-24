import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long']
    },
    lastName: {
        type: String,
        minlength: [3, 'Last name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: ['Password is required', true],
        select: false
    },
    socketId: {
        type: String
    },
    refreshToken: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        type: {
            type: String,
            enum: ['car', 'auto', 'motorcycle'],
            required: true
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
}, { timestamps: true })

captainSchema.generateAccessToken = async function () {
    return jwt.sign(
        // Create a payload
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

captainSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        // Create a payload
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Pre hook
captainSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export const Captain = mongoose.model('Captain', captainSchema)