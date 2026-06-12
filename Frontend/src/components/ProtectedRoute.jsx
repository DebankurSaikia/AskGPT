import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import blacklogo from "../assets/blacklogo.png";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Authentication check in progress
    if (loading) {
        return (
            <div className="auth-loading">
                <img
                    src={blacklogo}
                    alt="AskGPT Logo"
                    className="auth-loading-logo"
                />

                <p>Checking Authentication...</p>
            </div>
        );
    }

    // User not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User authenticated
    return children;
};

export default ProtectedRoute;