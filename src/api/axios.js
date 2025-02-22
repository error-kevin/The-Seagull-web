import axios from "axios";

const DEV_MODE = false;

// Declare URLs outside of the conditional block
let WsBASE_URL;
let BASE_URL;

if (DEV_MODE === true) {
  WsBASE_URL = "http://192.168.69.26:4000";
  BASE_URL = "http://192.168.69.26:3500";
} else {
  WsBASE_URL = "https://gdgocws.mirage-cgcj.tech";
  BASE_URL = "https://gdgocsvvv-backend.onrender.com";
}

export { WsBASE_URL, BASE_URL };

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
