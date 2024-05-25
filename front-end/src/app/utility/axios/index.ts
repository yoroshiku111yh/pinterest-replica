'use client'

import axios from "axios";
import { ENV } from "../global-variable";
import { refreshToken } from "./api.auth";

export const headersToUpload = {
    'Content-Type': `multipart/form-data`
};

export const instanceAxios = axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export interface TypeResponse {
    statusCode : number,
    message?: string,
}

instanceAxios.interceptors.request.use(
    (config) => {
        const token = localStorageFn.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

instanceAxios.interceptors.response.use((response) => {
    return response.data;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response && error.response.data.message === "Refresh token is expired"){
        localStorageFn.deleteToken();
        window.location.href = "/errors/401";
    }
    if(error.response && error.response.data.message === "Token expired"){
        try {
            const {data} = await refreshToken();
            originalRequest.headers['Authorization'] = `Bearer ${data}`;
            localStorageFn.token = data;
            return instanceAxios(originalRequest);
        }
        catch(err){
            console.error("Refresh token failed : " + err);
            localStorageFn.deleteToken();
            return Promise.reject(err);
        }
    }
    if(error.response.status === 401){
        window.location.href = "/errors/401";
    }
    return Promise.reject(error);
})


class LocalStorage {
    get token(){
        return localStorage.getItem(ENV.TOKEN_STORAGE) || "";
    }
    set token(value : string){
        localStorage.setItem(ENV.TOKEN_STORAGE, value);
    }
    deleteToken(){
        localStorage.removeItem(ENV.TOKEN_STORAGE);
    }
};

export const localStorageFn = new LocalStorage();