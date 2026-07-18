import axios from 'axios'

export const addprofile = async(data) => {
    const response =  await axios.post("https://vishal-luxury-salon-booking.onrender.com/web/adminprofile/api/add/profile/data", data);
    return response;
}

export const getprofile = async() => {
    const response =  await axios.get("https://vishal-luxury-salon-booking.onrender.com/web/adminprofile/api/get/profile/data");
    return response;
}

export const updateprofile = async(id,data) => {
    const response =  await axios.patch(`https://vishal-luxury-salon-booking.onrender.com/web/adminprofile/api/update/profile/data/${id}`, data);
    return response;
}