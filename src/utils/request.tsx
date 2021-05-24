import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
    baseURL: "https://avartus.cmu.edu.au",
    timeout: 10000
})

instance.interceptors.request.use(
    function(config) {
        config.headers["authorization"] = "Bearer" + getToken();
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    function(response) {
        return response.data;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export function get(url: string, params: any) {
    return axios.get(url, {
        params
    })
}

export function post(url: string, data: any) {
    return axios.post(url, data)
}

export function put(url: string, data: any) {
    return axios.put(url, data)
}

export function del(url: string) {
    return axios.delete(url)
}
