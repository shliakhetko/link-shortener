import useAxios from "@/utils/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import DashboardItem from "@/pages/dashboard/DashboardItem";

export interface Link {
    title?: string;
    link: string;
    shortLink: string;
    createdAt: string;
    updatedAt: string;
}

export default function Dashboard() {
    const axiosInstance = useAxios();
    const auth = useAuth();
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                if (!auth.data) return;
                const userRes = await axiosInstance.get(`/user/${auth.data.userId}`);
                const linkIds = userRes.data.links;

                const linkPromises = linkIds.map((id: string) => axiosInstance.get(`/link/id/${id}`));
                const linkResponses = await Promise.all(linkPromises);
                const linksData: Link[] = linkResponses.map(res => res.data);

                setLinks(linksData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(`Error: ${error.response?.status} - ${error.response?.statusText}`);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        if (auth.data) {
            fetchLinks();
        }
    }, [axiosInstance, auth.data]);

    return (
        <ul className="bg-transparent rounded-3xl overflow-hidden space-y-4">
            <li className="md:grid hidden grid-cols-3 text-main-brand-color font-semibold relative py-3 mb-4">
                <div className="pl-3">Link</div>
                <div className="pl-3">Short Link</div>
                <div className="pl-3">Date</div>
                <div className="absolute left-1/3 top-[20%] bottom-[20%] w-px bg-main-brand-color opacity-20"></div>
                <div className="absolute left-2/3 top-[20%] bottom-[20%] w-px bg-main-brand-color opacity-20"></div>
            </li>
            {links.map((link, index) => (
                <DashboardItem key={index} link={link} />
            ))}
        </ul>
    );
}