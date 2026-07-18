import axios from 'axios';

export const addGallery = (data)=>{
    const response = axios.post('https://vishal-luxury-salon-booking.onrender.com/admin/gallery/api/add/gallery', data);
    return response;
}

export const getAllGallery = ()=>{
    const response = axios.get('https://vishal-luxury-salon-booking.onrender.com/admin/gallery/api/get/all/gallery');
    return response;
}

export const deleteGallery = (id)=>{
    const response = axios.delete(`https://vishal-luxury-salon-booking.onrender.com/admin/gallery/api/delete/gallery/${id}`);
    return response;
}

export const UpdateGallery = (id, data)=>{
    const response = axios.patch(`https://vishal-luxury-salon-booking.onrender.com/admin/gallery/api/update/gallery/${id}`, data);
    return response;
}

export const fetchGallery = (id)=>{
    const response = axios.get(`https://vishal-luxury-salon-booking.onrender.com/admin/gallery/api/get/single/gallery/${id}`);
    return response;
}