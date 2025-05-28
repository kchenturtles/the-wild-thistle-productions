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
    <div className="h-lvh container max-w-[1200px] mx-auto px-8 sm:px-12 md:px-24 lg:px-36">
     <Head>
        <title>About | The Wild Thistle Productions</title>
      </Head>
    <div className={"max-w-[1200px] mx-auto"}>
      <div className={"title mt-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center"}>
        About
       <div className="w-1/4 border-b-4 border-dotted border-b-[#DDA0DD] mx-auto my-2 mb-8"/>
      </div>
      <div className={`container ${styles.about} mx-auto`}>The Wild Thistle Productions is the project of a college student. I started writing in high school (well, in middle school, but we don't talk about those). It was always a dream of mine to produce something and to share my writing and ideas with others, and with this, I finally had the chance to! Thanks for listening and thanks for your support, and I hope you enjoy!</div>
    </div>
    </div>
  );
}
