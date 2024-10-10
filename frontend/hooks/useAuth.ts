import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authAtom } from '@/atoms/authAtom';
import useAxios from "@/utils/api";

interface AuthData {
    userId: string;
    username: string;
}

export const useAuth = () => {
    const [auth, setAuth] = useAtom(authAtom);
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const axiosInstance = useAxios();

    useEffect(() => {
        const checkToken = async () => {
            setLoading(true);
            if (auth) {
                try {
                    const res = await axiosInstance.post('/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${auth}`,
                        },
                    });
                    if (res.data.statusCode) {
                        setAuth(null);
                        setError('Failed to fetch profile');
                    } else {
                        setAuthData(res.data);
                        setError(null);
                    }
                } catch (error) {
                    setAuth(null);
                    setAuthData(null);
                    setError('Failed to fetch profile');
                }
            }
            else{
                setAuthData(null);
            }
            setLoading(false);
        };

        checkToken();
    }, [auth, router, setAuth]);

    return { data: authData, loading, error };
};