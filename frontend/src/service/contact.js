import axios from "axios";

export const sendMessage =async (data)=>{
    const responc = await axios.post("https://vishal-luxury-salon-booking.onrender.com/admin/contact/api/add/contact", data);
    return responc;
}

export const getAllMessage = async () => {
    const response = await axios.get("https://vishal-luxury-salon-booking.onrender.com/admin/contact/api/get/all/contact");
    return response;
}

export const deleteMessage = async (id) => {
    const response = await axios.delete(`https://vishal-luxury-salon-booking.onrender.com/admin/contact/api/delete/contact/${id}`);
    return response;
}