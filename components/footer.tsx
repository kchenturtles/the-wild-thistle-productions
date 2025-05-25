import styles from "./footer.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import logo from "../images/logos/spotify.png";


export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className="text-right">
        <div className="mx-auto max-w-[1200px]">Copyright &copy; 2023 The Wild Thistle Productions</div>
      </div>
    </footer>
  );
}
