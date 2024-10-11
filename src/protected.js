// src/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("user")
    // const isAuthenticated = true;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/register");
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? element : null; // Render null while navigating
};

export default ProtectedRoute;

