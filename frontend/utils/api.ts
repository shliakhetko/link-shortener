import axios from 'axios';
import { useAtom } from 'jotai';
import {authAtom} from "@/atoms/authAtom";

const API_URL = process.env.NEXT_PUBLIC_API;

const useAxios = () => {
    const [auth] = useAtom(authAtom);

    const instance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            if (auth) {
                config.headers.Authorization = `Bearer ${auth}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxios;