import { Layout } from "@/components/layout/Layout";
import type { AppProps } from 'next/app';
import Head from "next/head";
import { Inter } from '@next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>My Application</title>
                <meta name="description" content="This is my application description." />
                
            </Head>
            <Layout className={inter.className}>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;