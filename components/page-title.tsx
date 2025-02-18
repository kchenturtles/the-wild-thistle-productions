import { ReactNode } from "react";
import styles from "./page-title.module.css";

interface PageTitleProps {
  children: ReactNode;
}

export default function PageTitle ({ children }: PageTitleProps) {
  return <header className="container">
    <div className={styles.pageTitle}>{children}<div className = {styles.spacer}/></div>
  </header>;
}
