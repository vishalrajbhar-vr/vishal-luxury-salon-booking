import axios from 'axios'

export const addpremgly = (data) => {
    const response = axios.post("https://vishal-luxury-salon-booking.onrender.com/web/prememGallery/api/prememGallery/add", data)
    return response;
}

export const getpremgly = () => {
    const response = axios.get("https://vishal-luxury-salon-booking.onrender.com/web/prememGallery/api/prememGallery/get")
    return response;
}

export const deletepremgly = (id) => {
    const response = axios.delete(`https://vishal-luxury-salon-booking.onrender.com/web/prememGallery/api/prememGallery/delete/${id}`)
    return response;
}

export const fetchpremgly = (id) => {
    const response = axios.get(`https://vishal-luxury-salon-booking.onrender.com/web/prememGallery/api/prememGallery/fetch/${id}`)
    return response;
}

export const updatepremgly = (id, data) => {
    const response = axios.patch(`https://vishal-luxury-salon-booking.onrender.com/web/prememGallery/api/prememGallery/update/${id}`, data)
    return response;
}