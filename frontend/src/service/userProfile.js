import axios from "axios";

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    return axios.get(
        "https://vishal-luxury-salon-booking.onrender.com/web/register/api/profile",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};