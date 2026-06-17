import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checking authentication status on app load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
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
                    throw new Error(data.error);
                }

                setUser(data);

            } catch (err) {
                console.error("Authentication Error:", err);

                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Called after successful login or register
    const login = (token, userData) => {
        localStorage.setItem("token", token);

        setUser(userData);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    };

    const values = {
        user,
        setUser,

        loading,

        login,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};