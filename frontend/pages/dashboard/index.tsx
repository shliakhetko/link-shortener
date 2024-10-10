"use client";
import {useAuth} from "@/hooks/useAuth";
import Loading from "@/pages/dashboard/loading";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Dashboard() {
    const auth = useAuth();
    const router = useRouter();

    useEffect( () => {
        if (auth.error) {
            router.push('/login');
        }
    }, [auth, router]);
    
    if (auth.loading) {
        return <Loading />;
    }
    
    return (
        <div className="flex-grow">
            <h1>Dashboard</h1>
        </div>
    );
}