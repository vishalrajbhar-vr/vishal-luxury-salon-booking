import axios from "axios";

export const loginadminAuth = async (data) => {
    const response = await axios.post("https://vishal-luxury-salon-booking.onrender.com/admin/auth/api/add/Admin/login", data);
    return response;
}

export const changePassword = async (data) => {
    const token = localStorage.getItem("adminToken");

    const response = await axios.post(
        "https://vishal-luxury-salon-booking.onrender.com/admin/auth/api/admin/change-password",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const getAllData = async () => {
    const response = await axios.get("https://vishal-luxury-salon-booking.onrender.com/admin/auth/api/find/Admin/data");
    return response;
}