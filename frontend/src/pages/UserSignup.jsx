import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UserSignup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const [errors, setErrors] = useState({});

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form Validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName || formData.firstName.length < 3) {
            newErrors.firstName = "First name must be at least 3 characters long";
        }
        if (formData.lastName && formData.lastName.length < 3) {
            newErrors.lastName = "Last name must be at least 3 characters long";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Data Submitted:", formData);
            // Add API call logic here
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });
            setErrors({});
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            {/* Uber Logo */}
            <Link to="/" className="absolute top-8 left-8">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                    alt="Uber logo"
                    className="w-20 drop-shadow-lg transition-transform duration-300 hover:scale-110"
                />
            </Link>

            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 pt-4 my-8 md:mt-8 mt-20 mx-4">
                {/* Heading */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    User Registration
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    Please fill out the form to create an account.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your first name"
                        required
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

                    {/* Last Name */}
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

                    {/* Email */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. john.doe@example.com"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    {/* Password */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? (
                                <FaRegEye className="h-5 w-5 hover:text-indigo-600" />
                            ) : (
                                <FaRegEyeSlash className="h-5 w-5 hover:text-indigo-600" />
                            )}
                        </span>
                    </div>

                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-300 mt-4"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/user/login" className="text-indigo-600 hover:underline">
                        Log In as User
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
