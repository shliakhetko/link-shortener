import {LoginForm} from "@/components/auth/LoginForm";

export default function Login() {
return (
    <div className="flex-grow flex items-center justify-center pb-32">
    <div
        className="flex flex-col items-center justify-center min-w-72 w-0 bg-main-brand-color rounded-xl space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2 w-full pt-3">
            <span className="font-bold text-4xl text-center">Login</span>
            <div className="h-0.5 w-11/12 bg-dark-shades"/>
            <span className="text-light-accent text-center px-4">Your links are waiting for you! <br/> Welcome back!</span>
        </div>
        <div className="p-3">
        <LoginForm/>
        </div>
    </div>
    </div>
);
}