import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const createText3DModel = (data) => {
    return axios.post(`${API_URL}text3dmodels/`, data);
};

export const generateSTL = (id) => {
    return axios.post(`${API_URL}text3dmodels/${id}/generatestl/`);
};

export const fetchFonts = () => {
    return axios.get(`${API_URL}fonts/`);
};