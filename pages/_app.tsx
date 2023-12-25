import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./global.css";
import styles from "./layout.module.css";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    title: {
      template: "The Wild Thistle Productions",
      default: "The Wild Thistle Productions",
    },
    description: "The Wild Thistle Productions Podcast.",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: '/favicon.ico', // /public path
    },
  };
  


  export default function App ({ Component, pageProps}: AppProps) {
    return (
      <div>
      <Head>
        <title>The Wild Thistle Productions</title>
      </Head>
      <main>
        <Navbar />
        <div className={styles.content}>
        <Component {...pageProps} />
        </div>
        <Footer />
      </main>
      <Analytics />
      </div>
    );
  }
  