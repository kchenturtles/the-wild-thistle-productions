import styles from "./footer.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import logo from "../images/logos/spotify.png";


export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className="container cols1_1">
          <div>
          </div>
          <div>
            <h4>Copyright &copy; 2023 The Wild Thistle Productions</h4>
          </div>
        </div>
    </footer>
  );
}
