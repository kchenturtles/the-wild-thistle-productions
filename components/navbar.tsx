"use client";

import Link from "next/link";
import React from "react";
import Image from "next-image-export-optimizer";
import { Menu, X } from "react-feather";
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
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, [isOpen]);

  return (
    <header className={styles.wrapper}>
      <nav className={`container ${styles.content}`}>
        <div className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <Image
              src={logo}
              alt= "Claw Logo"
            />
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
             <Link href = "https://www.buymeacoffee.com/" className = {styles.mobileNavLink} onClick = {() => {setOpen(!isOpen)}}>Buy Me a Coffee</Link>
             <div className = {styles.mediaIcons}>
             <div className = {styles.title}>Media:</div>
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
