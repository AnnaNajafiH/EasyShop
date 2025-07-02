import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === "development" 
        ? "http://localhost:4000/" 
        : "/api/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 second timeout for production
});

apiClient.interceptors.request.use(
    async (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                const parsedUserInfo = JSON.parse(userInfo);
                if (parsedUserInfo.token) {
                    config.headers.Authorization = `Bearer ${parsedUserInfo.token}`;
                }
            } catch (error) {
                console.error('Error parsing userInfo from localStorage:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('userInfo');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default apiClient;




