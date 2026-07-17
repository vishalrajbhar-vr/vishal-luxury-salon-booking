import axios from 'axios';

export const addGallery = (data)=>{
    const response = axios.post('http://localhost:1000/admin/gallery/api/add/gallery', data);
    return response;
}

export const getAllGallery = ()=>{
    const response = axios.get('http://localhost:1000/admin/gallery/api/get/all/gallery');
    return response;
}

export const deleteGallery = (id)=>{
    const response = axios.delete(`http://localhost:1000/admin/gallery/api/delete/gallery/${id}`);
    return response;
}

export const UpdateGallery = (id, data)=>{
    const response = axios.patch(`http://localhost:1000/admin/gallery/api/update/gallery/${id}`, data);
    return response;
}

export const fetchGallery = (id)=>{
    const response = axios.get(`http://localhost:1000/admin/gallery/api/get/single/gallery/${id}`);
    return response;
}