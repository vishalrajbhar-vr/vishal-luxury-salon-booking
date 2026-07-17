import axios from "axios";

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    return axios.get(
        "http://localhost:1000/web/register/api/profile",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};