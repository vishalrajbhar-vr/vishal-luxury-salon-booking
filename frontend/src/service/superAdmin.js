import axios from 'axios'

export const getSuperdata = async () => {
    const response = await axios.get("https://vishal-luxury-salon-booking.onrender.com/super/admin/api/get/admin/all/data")
    return response;
}

export const updateSuperdata = async (id, formData) => {
    const response = await axios.patch(
        `https://vishal-luxury-salon-booking.onrender.com/super/admin/api/update/admin/data/${id}`,
        formData
    );

    return response;
};