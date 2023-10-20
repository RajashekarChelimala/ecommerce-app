import axios from 'axios';

const token = localStorage.getItem('token'); // Get the JWT token from storage

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default axiosInstance;