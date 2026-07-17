import axios from "axios";

export const loginadminAuth = async (data) => {
    const response = await axios.post("http://localhost:1000/admin/auth/api/add/Admin/login", data);
    return response;
}


export const changePassword = async (data) => {
    const token = localStorage.getItem("adminToken");

    const response = await axios.post(
        "http://localhost:1000/admin/auth/api/admin/change-password",
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
    const response = await axios.get("http://localhost:1000/admin/auth/api/find/Admin/data");
    return response;
}