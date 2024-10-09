import useAxios from "@/utils/api";
import {useSetAtom} from "jotai/index";
import {authAtom} from "@/atoms/authAtom";
import {useRouter} from "next/router";

export const useLogin = () => {
    const axiosInstance = useAxios();
    const setAuth = useSetAtom(authAtom);
    const router = useRouter();
    const login = async (loginData: {username:string, password:string}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axiosInstance.post('/auth/login', loginData);
                if (response.data['access_token']) {
                    setAuth(response.data['access_token']);
                    router.push('/dashboard');
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    return login;
} 