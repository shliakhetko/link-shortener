import { Link } from "@/pages/dashboard/Dashboard";
import { Clipboard, Edit, Trash } from "lucide-react";
import classNames from "classnames";
import {useRef} from "react";

interface DashboardItemProps {
    key: number;
    link: Link;
}

export default function DashboardItem(props: DashboardItemProps) {
    return (
        <li key={props.key} className="bg-light-accent rounded-3xl mb-4 overflow-hidden md:w-fit w-60">
            <div className="pt-2 px-3 flex md:flex-row flex-col justify-between">
                <span className={classNames("text-xl font-bold", !props.link.title && "text-main-brand-color")}>
                    {props.link.title || "Unnamed Link"}
                </span>
                <div className="space-x-2 pt-1">
                    <button className="text-main-brand-color hover:text-dark-shades transition-colors"
                            onClick={() => navigator.clipboard.writeText(props.link.shortLink)}>
                        <Clipboard size={16} />
                    </button>
                    <button className="text-main-brand-color hover:text-dark-shades transition-colors">
                        <Edit size={16} />
                    </button>
                    <button className="text-main-brand-color hover:text-dark-shades transition-colors">
                        <Trash size={16} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 relative py-3 text-dark-shades">
                <div className="px-3 truncate">
                    <span className="block md:hidden font-semibold text-main-brand-color">Link:</span>
                    {props.link.link}
                </div>
                <div className="px-3">
                    <span className="block md:hidden font-semibold text-main-brand-color">Short Link:</span>
                    {props.link.shortLink}
                </div>
                <div className="px-3">
                    <span className="block md:hidden font-semibold text-main-brand-color">Update Date:</span>
                    {new Date(props.link.updatedAt).toDateString()}
                </div>
                <div className="hidden md:block absolute left-1/3 top-[20%] bottom-[20%] w-px bg-dark-shades opacity-25"></div>
                <div className="hidden md:block absolute left-2/3 top-[20%] bottom-[20%] w-px bg-dark-shades opacity-25"></div>
            </div>
        </li>
    );
}