import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    console.log("userss:", user);

    // Check Existing Login
    useEffect(() => {

        const token = localStorage.getItem("appointment-app-token");
        console.log("appointment-app-token:", token)
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }

    }, []);


    // Fetch Profile
    const fetchProfile = async () => {

        try {

            const response = await api.get("/auth/profile");

            setUser(response.data.data);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);

        } finally {
            setLoading(false);
        }
    };


    // Login
    const login = async (formData) => {

        const response = await api.post(
            "/auth/login",
            formData
        );

        const token = response.data.data.token;

        localStorage.setItem("token", token);

        setUser(response.data.data.user);

        return response.data;
    };


    // Register
    const register = async (formData) => {

        const response = await api.post(
            "/auth/register",
            formData
        );

        const token = response.data.data.token;

        localStorage.setItem("token", token);

        setUser(response.data.data.user);

        return response.data;
    };


    // Logout
    const logout = () => {

        localStorage.removeItem("appointment-app-token");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;