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
      <div className="min-h-lvh">
        <div className={"title mt-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center"}>
        Store
       <div className="w-1/4 border-b-4 border-dotted border-b-[#DDA0DD] mx-auto my-2 mb-8"/>
      </div>
      </div>
    </main>);
}
