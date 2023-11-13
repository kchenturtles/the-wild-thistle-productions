import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./global.css";
import styles from "./layout.module.css";
import type { AppProps } from 'next/app'

export const metadata = {
    title: {
      template: "The Wild Thistle Productions",
      default: "The Wild Thistle Productions",
    },
    description: "The Wild Thistle Productions Podcast.",
    alternates: {
      canonical: "/",
    }
    // themeColor: ,
  };
  


  export default function App ({ Component, pageProps }: AppProps) {
    return (
      <main>
        <Navbar />
        <div className={styles.content}>
        <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    );
  }
  