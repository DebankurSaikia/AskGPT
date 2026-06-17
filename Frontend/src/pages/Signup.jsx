import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import blacklogo from "../assets/blacklogo.png";

import "../Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        } else if (name.trim().length > 50) {
            newErrors.name = "Name cannot exceed 50 characters";
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        // Confirming password validation
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword =
                "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword =
                "Passwords do not match";
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

            const data = await registerUser({
                name,
                email,
                password
            });

            // Automatically log in
            login(data.token, data.user);

            navigate("/", { replace: true });

        } catch (err) {
            setServerError(
                err.message || "Registration failed"
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

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Sign up to start using AskGPT
                </p>

                {serverError && (
                    <p className="auth-server-error">
                        {serverError}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="auth-input-group">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        {errors.name && (
                            <span className="auth-error">
                                {errors.name}
                            </span>
                        )}
                    </div>

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

                    {/* Confirm password */}
                    <div className="auth-input-group">
                        <label>Confirm Password</label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                        {errors.confirmPassword && (
                            <span className="auth-error">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}

                    <Link to="/login">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;