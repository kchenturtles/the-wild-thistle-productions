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
    <div className="h-lvh">
    <Head>
        <title>About | The Wild Thistle Productions</title>
      </Head>
    <div className={"max-w-[1200px] mx-auto"}>
      <div className={"title my-8"}>
        About
      </div>
      <div className={`container ${styles.about}`}>The Wild Thistle Productions is the project of a college student. I started writing in high school (well, in middle school, but we don't talk about those). It was always a dream of mine to produce something and to share my writing and ideas with others, and with this, I finally had the chance to! Thanks for listening and thanks for your support, and I hope you enjoy!</div>
    </div>
    </div>
  );
}
