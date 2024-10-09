import Header from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";


export function Layout(props: { className: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow max-w-3xl mx-auto">
                {props.children}
            </main>
            <Footer/>
        </div>
    );
}