"use client";
import Link from 'next/link';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

export default function Header() {
    const auth = useAuth();
    const logout = useLogout();

    return (
        <header className="bg-transparent py-4 px-6">
            <nav>
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-dark-shades text-xl font-bold">
                        LinkShortener
                    </Link>

                    <div className="flex space-x-4 items-center mt-1" style={{ minHeight: '40px' }}>
                        {auth.loading ? (
                            <span>Loading...</span>
                        ) : auth.data ? (
                            <>
                                <button className="text-main-brand-color mr-4" onClick={logout}>
                                    Logout
                                </button>
                                <Link href="/dashboard" className="text-dark-accent hover:text-dark-shades transition-colors">
                                    <div className="flex items-center space-x-2 text-dark-accent">
                                        <User size={24} />
                                        <span>{auth.data.username}</span>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/register" className="bg-dark-accent text-light-shades hover:bg-dark-shades transition-colors rounded-lg border border-dark-accent px-2 pb-1">
                                    Sign Up
                                </Link>
                                <Link href="/login" className="text-dark-accent hover:text-dark-shades transition-colors pb-1">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}