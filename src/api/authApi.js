import api from "./axios";


// Register
export const registerUser = async (data) => {

    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};


// Login
export const loginUser = async (data) => {

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
};


// Get Profile
export const getProfile = async () => {

    const response = await api.get(
        "/users/profile"
    );

    return response.data;
};