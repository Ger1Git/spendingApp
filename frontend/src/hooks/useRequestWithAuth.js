import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:5000/api/v1';

const useRequestWithAuth = () => {
    const token = Cookies.get('token');

    const request = async (url, method = 'GET', data = null) => {
        if (!token) {
            throw new Error('No token found');
        }

        try {
            const config = {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: method === 'POST' ? JSON.stringify(data) : null
            };

            const response = await axios(`${BASE_URL}${url}`, config);

            if (!response.statusText === 'OK') {
                throw new Error(`Request failed with status: ${response.statusText}`);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    };

    return { request };
};

export default useRequestWithAuth;
