import axios from 'axios';

export const addedservice = async (data) => {
    const responce = await axios.post('https://vishal-luxury-salon-booking.onrender.com/admin/service/api/add/service', data);
    return responce;
};

export const getAllService = async () => {
    const responce = await axios.get('https://vishal-luxury-salon-booking.onrender.com/admin/service/api/find/data');
    return responce;
};

export const deleteService = async (id) => {
    const responce = await axios.delete(`https://vishal-luxury-salon-booking.onrender.com/admin/service/api/delete/data/${id}`);
    return responce;
};

export const fetchService = async (id) => {
    const responce = await axios.get(`https://vishal-luxury-salon-booking.onrender.com/admin/service/api/fetch/data/${id}`);
    return responce;
};

export const UpdateService = async (id, data) => {
    const responce = await axios.patch(`https://vishal-luxury-salon-booking.onrender.com/admin/service/api/update/data/${id}`, data);
    return responce;
};

