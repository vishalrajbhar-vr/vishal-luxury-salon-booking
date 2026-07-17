import axios from "axios";

export const sendMessage =async (data)=>{
    const responc = await axios.post("http://localhost:1000/admin/contact/api/add/contact", data);
    return responc;
}

export const getAllMessage = async () => {
    const response = await axios.get("http://localhost:1000/admin/contact/api/get/all/contact");
    return response;
}

export const deleteMessage = async (id) => {
    const response = await axios.delete(`http://localhost:1000/admin/contact/api/delete/contact/${id}`);
    return response;
}