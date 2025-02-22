import axios from 'axios';
// const BASE_URL = 'https://nsd-face-recog-backend.onrender.com';
const BASE_URL = 'http://192.168.69.25:3500';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
