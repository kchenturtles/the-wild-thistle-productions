"use client";

import Link from "next/link";
import React from "react";
import Image from "next-image-export-optimizer";
import { Menu} from "react-feather";
import { X } from "react-feather";
import { Instagram } from "react-feather";
import { Twitter } from "react-feather";
import { Youtube } from "react-feather";
import logo from "../images/logos/spotify.png";
import styles from "./navbar.module.css";

const Navbar = () => {
  let links = [
    {label: "About", to: "/about"},
    {label: "Leave A Comment", to: "/contact"},
    {label: "Store", to: "/store"},
  ];

  const [isOpen, setOpen] = React.useState(false);

  // Close mobile navigation when window resizes to non-mobile
  React.useEffect(() => {
    const listener = () => {
      const media = window.matchMedia("(min-width: 768px)");
      if (media.matches) setOpen(false);
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "scroll;";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [isOpen]);

  return (
    <header className={styles.wrapper}>
      <nav className={`container ${styles.content}`}>
        <div className={styles.navbar}>
          <Link href="/" className={styles.logo} onClick = {() => {setOpen(false)}}>
            <Image
              src={logo}
              alt= "Logo"
            /> <div className = {styles.logoTitle}>The Wild Thistle Productions</div>
            <span className="visually-hidden">Home</span>
          </Link>
          <div className = {styles.Links}>
          <ul className={styles.navbarLinks}>
            <Link href = "/shows" onClick = {() => {setOpen(false)}}> Shows </Link>
          </ul>
          <button className={styles.mobileNavToggle} onClick={() => setOpen(!isOpen)}>
            {isOpen ? (
              <>
                <X />
                <span className="visually-hidden">Close Menu</span>
              </>
            ) : (
              <>
                <Menu />
                <span className="visually-hidden">Menu</span>
              </>
            )}
          </button>
          </div>
        </div>
        {isOpen && (<div>
          <div className = {styles.spacer}></div>
          <div className={styles.mobileNav}>
            <ul>
            <ul>
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  href={to}
                  className={styles.mobileNavLink} onClick = {() => {setOpen(!isOpen)}}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
             <Link href = "https://www.buymeacoffee.com/thewildthistleproductions" className = {styles.mobileNavLink} onClick = {() => {setOpen(!isOpen)}}>Buy Me a Coffee</Link>
             <div>
             <div className = {styles.mediaIcons}>
             <Link href = "https:/twitter.com/" target = "_blank"><Twitter className = {styles.mediaIcon}/></Link>
             <Link href = "https:/instagram.com/" target = "_blank"><Instagram className = {styles.mediaIcon}/></Link>
             <Link href = "https:/youtube.com/" target = "_blank"><Youtube className = {styles.mediaIcon}/></Link>
             </div>
            </div>
            <Link href = "/Shows" className = {styles.extraShowLink} onClick = {() => {setOpen(!isOpen)}}>Shows</Link>
            </ul>
          </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
