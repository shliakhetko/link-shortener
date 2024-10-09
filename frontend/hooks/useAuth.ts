import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authAtom } from '@/atoms/authAtom';
import useAxios from "@/utils/api";

export const useAuth = () => {
    const [auth, setAuth] = useAtom(authAtom);
    const router = useRouter();
    const axiosInstance = useAxios()

    useEffect(() => {
        const checkToken = async () => {
            if (auth) {
                try {
                    const res = await axiosInstance.post('/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${auth}`,
                        },
                    });
                    if (res.data.statusCode){
                        setAuth(null);
                        console.log('Token invalid');
                        //Timed out
                    }
                } catch (error) {
                    setAuth(null);
                    console.error('Error checking token:', error);
                    //Something vent wrong
                }
            }
        };

        checkToken();
    }, [auth, router, setAuth]);

    return auth;
};