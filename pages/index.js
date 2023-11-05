import styles from "./page.module.css";
import Overlay from "../components/overlay";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import mainImage from "../images/Cover.jpeg";

import { Twitter } from "react-feather";
import { Instagram } from "react-feather";
import { Youtube } from "react-feather";
import { ArrowRight } from "react-feather";

export default function Page () {
  return (
    <main>
      <header>
      </header>
      <section className='section container'>
      <Image className={styles.mainImage } src = { mainImage } alt = "Main Photo" />
      <div className = {styles.introText}>
        <p>
        Welcome, listener, to the worlds that we have created. In these audio dramas, you will find places where imagination has touched. You can explore the mystery surrounding the Starship Athena in "Lights Out," follow a journey to find love in "Remnants," or struggle to escape the island of Rintheia in "Supernova." Whichever you choose, we hope that you enjoy your visit!
        </p>
      </div>
      </section>
    </main>
  );
}
