"use client";
import {useAuth} from "@/hooks/useAuth";
import DashboardSkeleton from "@/pages/dashboard/DashboardSkeleton";
import {useRouter} from "next/router";
import {Suspense, useEffect} from "react";
import Dashboard from "@/pages/dashboard/Dashboard";

export default function DashboardPage() {
    const auth = useAuth();
    const router = useRouter();

    useEffect( () => {
        if (auth.error) {
            router.push('/login');
        }
    }, [auth, router]);
    
    if (auth.loading) {
        return <DashboardSkeleton />;
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-dark-shades mb-6">Your Links</h1>
            <Suspense fallback={<DashboardSkeleton/>}>
                <Dashboard />
        </Suspense>
        </div>
    );
}