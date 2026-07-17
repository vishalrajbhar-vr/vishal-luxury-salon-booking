import axios from 'axios';

export const signup = async (data) => {
    const response = await axios.post("http://localhost:1000/web/register/api/signup", data)
    return response;
}

export const login = async (data) => {
    const response = await axios.post("http://localhost:1000/web/register/api/login", data)
    return response;
}

export const sendotp = async (data) => {
    const response = await axios.post("http://localhost:1000/web/register/api/email/otp", data)
    return response
}

export const verifyingotp = async (data) => {
    const response = await axios.post("http://localhost:1000/web/register/api/verify/otp", data)
    return response;
}

export const newpassword = async (data) => {
    const response = await axios.post("http://localhost:1000/web/register/api/new/password", data);
    return response;
}

export const googleLogin = async () => {
    window.location.href = "http://localhost:1000/web/register/api/google";
}
