import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { authAtom } from '@/atoms/authAtom';

export const useLogout = () => {
    const setAuth = useSetAtom(authAtom);
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        router.push('/');
    };

    return logout;
};

