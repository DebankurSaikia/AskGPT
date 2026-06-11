import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>

                {/* Protected Home Route */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        user
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />

                {/* Signup Route */}
                <Route
                    path="/signup"
                    element={
                        user
                            ? <Navigate to="/" replace />
                            : <Signup />
                    }
                />

                {/* Fallback Route */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;