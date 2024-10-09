import Link from "next/link";
import { User } from 'lucide-react'

export function Header() {
    return (
        <header className="bg-transparent py-4 px-6">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-dark-shades text-xl font-bold">
                    LinkShortener
                </Link>
                <nav>
                    <Link href="/" className="text-dark-accent hover:text-dark-shades transition-colors">
                        Home
                    </Link>
                </nav>
                <div className="flex items-center space-x-2 text-dark-accent">
                    <User size={24}/>
                    <span>Username</span>
                </div>
            </div>
        </header>

    )
}