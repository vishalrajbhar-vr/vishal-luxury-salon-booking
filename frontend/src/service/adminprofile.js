import axios from 'axios'

export const addprofile = async(data) => {
    const response =  await axios.post("http://localhost:1000/web/adminprofile/api/add/profile/data", data);
    return response;
}

export const getprofile = async() => {
    const response =  await axios.get("http://localhost:1000/web/adminprofile/api/get/profile/data");
    return response;
}

export const updateprofile = async(id,data) => {
    const response =  await axios.patch(`http://localhost:1000/web/adminprofile/api/update/profile/data/${id}`, data);
    return response;
}