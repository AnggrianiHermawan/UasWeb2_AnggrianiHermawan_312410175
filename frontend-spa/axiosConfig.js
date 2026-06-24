// frontend-spa/axiosConfig.js

// axios sudah global dari CDN di index.html, jadi TIDAK perlu:
// import axios from 'axios';

const axiosInstance = axios.create({
  // Sesuaikan dengan alamat backend
  baseURL: 'http://localhost:8080',
  // Kalau backend di path lain:
  // baseURL: 'http://localhost/web2-backend/public',
});

// Request Interceptor: otomatis tambah Bearer Token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: tangkap error 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      alert('Sesi telah habis, silakan login kembali.');
      localStorage.clear();
      window.location.href = '#/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;