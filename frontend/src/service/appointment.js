import axios from 'axios';

export const findallappointment = async () => {
    const response = await axios.get('https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/find-all/appointment');
    return response;
}

export const bookappointment = async (data) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/add/appointment",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const getallappointment = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        "https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/find/all/appointment",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const deleteappointment = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/delete/appointment/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const updateAppointmentStatus = async (id, status) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/appointment/status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const createOrder = async (data) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "https://vishal-luxury-salon-booking.onrender.com/web/register/api/payment/create-order",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const verifyPayment = async (data) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "https://vishal-luxury-salon-booking.onrender.com/web/register/api/payment/verify",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const cashPayment = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `https://vishal-luxury-salon-booking.onrender.com/admin/appointment/api/appointment/cash-payment/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
