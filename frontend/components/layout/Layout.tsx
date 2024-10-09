import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";

export function Layout(props: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {props.children}
            </main>
            <Footer/>
        </div>
    );
}