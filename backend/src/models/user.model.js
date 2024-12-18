import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
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
    },
    password: {
        type: String,
        required: ['Password is required', true],
        select: false
    },
    socketId: {
        type: String
    }
}, {
    timestamps: true
})

// Define some methods
userSchema.methods.generateAuthToken = async function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Pre hook
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export const User = mongoose.model("User", userSchema)