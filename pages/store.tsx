import styles from "./store.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";

export const metadata = {
  title: "Store",
};

export default function Store() {
  return (
    <main>
      <PageTitle>
        Store
      </PageTitle>
    </main>);
}
