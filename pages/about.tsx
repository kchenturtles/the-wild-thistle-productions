import styles from "./about.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <main>
      <PageTitle>
        About
      </PageTitle>
    </main>);
}
