import axios from 'axios';

const API_URL = 'http://localhost:3000/api/qr';

export const generateQR = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/generate`, data, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Error generating QR:', error);
        throw error;
    }
};

export const createDynamicQR = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/dynamic`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating dynamic QR:', error);
        throw error;
    }
};
