import axios from 'axios';
import { base_url } from './baseurl';
import * as SecureStore from 'expo-secure-store';

axios.defaults.withCredentials = true;

export const privateRequest = axios.create({
    timeout: 200000,
    baseURL: base_url,
});

const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync("token");
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

const requestHandler = async (request) => {
    const token = await getToken(); // Await token resolution
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
};

const responseHandler = (response) => {
    response.headers['content-type'] = 'application/json';
    response.headers['access-control-allow-headers'] = "*";
    response.headers['access-control-allow-origin'] = "*";
    response.headers['allow'] = "GET,POST,PUT,HEAD,OPTIONS";
    response.headers['content-length'] = 360;
    response.headers['referrer-policy'] = 'same-origin';
    return response;
};

const errorHandler = (error) => {
    return Promise.reject(error);
};

privateRequest.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

privateRequest.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);
