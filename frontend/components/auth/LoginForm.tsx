"use client";
import {ChangeEvent, FormEvent, useState} from "react";
import {useLogin} from "@/hooks/useLogin";
import classNames from "classnames";

interface LoginFormData {
    username: string;
    password: string;
}
interface LoginFormErrors {
    username?: string;
    password?: string;
    notFound?: string;
}
const emptyFormData: LoginFormData = {username: "", password: ""};
export function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>(emptyFormData);
    const [errors, setErrors] = useState<Partial<LoginFormErrors>>({});
    const [loading, setLoading] = useState(false);
    const login = useLogin();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    
    const validateForm = ():boolean => {
        const tempErrors: Partial<LoginFormData> = {};
        if(formData.username === ""){
            tempErrors.username = "Email or username is required";
        }
        if(formData.password === ""){
            tempErrors.password = "Password is required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            setTimeout(() => {
            login(formData)
                .then(() => {
                    setFormData(emptyFormData);
                    setErrors({});
                    setLoading(false);
                })
                .catch(() => {
                    setErrors({ notFound: "Invalid username or password" });
                    setLoading(false);
                });}, 1000);
        }
    };
    return (
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input type="username" id="username"
                           value={formData.username}
                           onChange={handleChange}
                           className="w-full px-4 py-2 rounded-md bg-light-accent text-dark-accent placeholder:text-main-brand-color focus:outline-main-brand-color"
                           placeholder="Email or Username"/>
                    <input type="password" id="password"
                           value={formData.password}
                           onChange={handleChange}
                           className="w-full px-4 py-2 rounded-md bg-light-accent text-dark-accent placeholder:text-main-brand-color focus:outline-main-brand-color"
                           placeholder="Password"/>
                    <button
                        type="submit"
                        className={classNames("w-full px-4 py-2 font-bold bg-dark-accent text-light-shades transition-colors rounded-lg border border-dark-accent focus:outline-main-brand-color hover:bg-dark-shades",  loading ? "opacity-50 cursor-not-allowed" : "")}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    
                    {Object.values(errors)[0] && <div className="bg-light-shades p-0.5 rounded-md border-2 border-red-500"><p
                        className="text-xs text-center text-red-500">{Object.values(errors)[0]}</p></div>}
                    </div>
            </form>
    )
}