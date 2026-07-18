import axios from 'axios'

export const addtestemonial = (data) => {
    const response = axios.post("https://vishal-luxury-salon-booking.onrender.com/admin/testimonial/api/add/testemonial", data)
    return response;
}

export const gettestemonial = () => {
    const response = axios.get("https://vishal-luxury-salon-booking.onrender.com/admin/testimonial/api/get/all/testemonial")
    return response;
}

export const deletetestemonial = (id) => {
    const response = axios.delete(`https://vishal-luxury-salon-booking.onrender.com/admin/testimonial/api/delete/testemonial/${id}`)
    return response;
}

export const updateestemonial = (id, data) => {
    const response = axios.patch(`https://vishal-luxury-salon-booking.onrender.com/admin/testimonial/api/update/testemonial/${id}`, data)
    return response;
}