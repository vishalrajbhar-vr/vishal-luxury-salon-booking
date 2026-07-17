import axios from 'axios'

export const addtestemonial = (data) => {
    const response = axios.post("http://localhost:1000/admin/testimonial/api/add/testemonial", data)
    return response;
}

export const gettestemonial = () => {
    const response = axios.get("http://localhost:1000/admin/testimonial/api/get/all/testemonial")
    return response;
}

export const deletetestemonial = (id) => {
    const response = axios.delete(`http://localhost:1000/admin/testimonial/api/delete/testemonial/${id}`)
    return response;
}

export const updateestemonial = (id, data) => {
    const response = axios.patch(`http://localhost:1000/admin/testimonial/api/update/testemonial/${id}`, data)
    return response;
}