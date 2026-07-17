import axios from 'axios'

export const getSuperdata = async () => {
    const response = await axios.get("http://localhost:1000/super/admin/api/get/admin/all/data")
    return response;
}

export const updateSuperdata = async (id, formData) => {
    const response = await axios.patch(
        `http://localhost:1000/super/admin/api/update/admin/data/${id}`,
        formData
    );

    return response;
};