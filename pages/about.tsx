import styles from "./about.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";
import Head from 'next/head';

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <div>
    <Head>
        <title>About | The Wild Thistle Productions</title>
      </Head>
    <main>
      <PageTitle>
        About
      </PageTitle>
    </main>
    </div>);
}
