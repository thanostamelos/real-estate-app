import axios from 'axios';

let storeRef = null;

export const attachStore = (store) => {
    storeRef = store;
};

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = storeRef?.getState?.()?.data_auth?.authData?.token;

    config.headers = config.headers ?? {};

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {

        return Promise.reject(error);
    }
);