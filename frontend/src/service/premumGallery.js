import axios from 'axios'

export const addpremgly = (data) => {
    const response = axios.post("http://localhost:1000/web/prememGallery/api/prememGallery/add", data)
    return response;
}

export const getpremgly = () => {
    const response = axios.get("http://localhost:1000/web/prememGallery/api/prememGallery/get")
    return response;
}

export const deletepremgly = (id) => {
    const response = axios.delete(`http://localhost:1000/web/prememGallery/api/prememGallery/delete/${id}`)
    return response;
}

export const fetchpremgly = (id) => {
    const response = axios.get(`http://localhost:1000/web/prememGallery/api/prememGallery/fetch/${id}`)
    return response;
}

export const updatepremgly = (id, data) => {
    const response = axios.patch(`http://localhost:1000/web/prememGallery/api/prememGallery/update/${id}`, data)
    return response;
}