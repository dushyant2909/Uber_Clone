import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const loginStatus = useSelector((state) => state.user.isLoggedIn);
    const isLoading = useSelector((state) => state.user.isLoading); // Ensure this exists in your slice

    useEffect(() => {
        // Ensure loading is complete before redirecting
        if (!isLoading) {
            if (authentication) {
                // If route requires authentication and user is not logged in
                if (!loginStatus) {
                    navigate("/"); // Redirect to the home page
                }
            } else {
                // If route does not require authentication and user is logged in
                if (loginStatus) {
                    navigate("/welcome"); // Redirect to welcome page
                }
            }
        }
    }, [authentication, loginStatus, isLoading, navigate]);

    return <>{children}</>;
}

export default AuthLayout;
