import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import blacklogo from "../assets/blacklogo.png";

import "../Login.css";

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Email Validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password Validation
        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError("");

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);

            const data = await loginUser({
                email,
                password
            });

            // Save token + user in AuthContext
            login(data.token, data.user);

            // Redirecting to Home
            navigate("/", { replace: true });

        } catch (err) {
            setServerError(
                err.message || "Login failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <img
                    src={blacklogo}
                    alt="AskGPT Logo"
                    className="auth-logo"
                />

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Sign in to continue to AskGPT
                </p>

                {serverError && (
                    <p className="auth-server-error">
                        {serverError}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="auth-input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        {errors.email && (
                            <span className="auth-error">
                                {errors.email}
                            </span>
                        )}

                    </div>

                    {/* Password */}
                    <div className="auth-input-group">

                        <label>Password</label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                        {errors.password && (
                            <span className="auth-error">
                                {errors.password}
                            </span>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Signing In..."
                            : "Sign In"}
                    </button>

                </form>

                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/signup">
                        Sign Up
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;