import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const CaptainLogin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add your form submission logic here
        setFormData({ email: "", password: "" });
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

            <div className="w-full mt-4 max-w-md bg-white shadow-lg rounded-xl p-8 pt-5">
                {/* Heading */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Captain Login</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    Please enter your credentials to log in as a Captain.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. captain@example.com"
                    />

                    {/* Password Input */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your password
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#111] hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-300 mt-6"
                    >
                        Log In as Captain
                    </button>
                    <Link to={'/user/login'}
                        className="flex justify-center w-full bg-[#10b461] hover:bg-green-800 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-300 mt-6"
                    >
                        Login as User
                    </Link>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/captain/signup" className="text-indigo-600 hover:underline">
                        Sign Up as Captain
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CaptainLogin;
