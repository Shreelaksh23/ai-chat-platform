import axios from "axios";

// Create Axios Instance
const accounts = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// ===================== REQUEST INTERCEPTOR =====================

accounts.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log(`token ${token}`);
        

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===================== RESPONSE INTERCEPTOR =====================

accounts.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            // Optional:
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default accounts;