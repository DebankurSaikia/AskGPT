const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Registration failed"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Login failed"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

// Get Current User
export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to fetch user"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};