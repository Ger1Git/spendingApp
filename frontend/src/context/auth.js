import axios from 'axios';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:5000/api/v1';

const login = async ({ username, password }) => {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data.token;
};

const register = async ({ username, password, email }) => {
    const response = await axios.post(`${BASE_URL}/register`, { username, password, email });
    return response.data;
};

const useLoginMutation = () => {
    return useMutation('login', login, {
        onSuccess: (data) => {
            Cookies.set('token', data, { expires: 1 });
        }
    });
};

const useRegisterMutation = () => {
    return useMutation('register', register);
};

export { useLoginMutation, useRegisterMutation };
