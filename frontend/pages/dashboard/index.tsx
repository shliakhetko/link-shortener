"use client";
import {useAuth} from "@/hooks/useAuth";

export default function Dashboard() {
    const auth = useAuth();

    if (!auth) {
        return <h1>You have no rights</h1>; // Optionally render a loading state or null
    }
    
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}