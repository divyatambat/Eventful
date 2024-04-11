import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

export const get = (url: string, payload: any) => {   
    return instance.get(url, payload);
};

export const post = (url: string, payload: any) => {
    return instance.post(url, payload);
};

export const patch = (url: string, config: any) => {
    return instance.patch(url, config);
};

export const deleteReq = (url: string, payload: any) => {
    return instance.delete(url, payload);
};

export const postWithAuth = (url: string, payload: any, auth: any) => {
    return instance.post(url, payload, auth).then((res: any) => res.data);
};

export const patchWithAuth = (url: string, payload: any, auth: any) => {
    return instance.patch(url, payload, auth).then((res: any) => res.data);
};

export const putWithAuth = (url: string, payload: any, auth: any) => {
    return instance.put(url, payload, auth).then((res: any) => res.data);
};