import Link from "next/link";
import React from "react";
import Image from "next-image-export-optimizer";
import { Menu} from "react-feather";
import { X } from "react-feather";
import { Instagram } from "react-feather";
import { Twitter } from "react-feather";
import { Youtube } from "react-feather";
import logo from "../images/logos/thistle.png";
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
      <div className='w-full px-72'>
        <div className={`flex justify-between items-center border-b-4 border-[plum] px-16`}>
          <Link href="/" onClick = {() => {setOpen(false)}}>
            <div className = {'flex items-center nowrap'}>
              <Image
                src={logo}
                alt= "Logo"
                className={styles.logo}
              /> 
              <div className = {styles.logoTitle}>The Wild Thistle Productions</div>
            </div>
            </Link>
            <span className="visually-hidden">Home</span>
          
          <div className = "flex items-center gap-8 text-3xl">
          <div className= "flex items-center gap-8 text-3xl">
            <Link className = 'link' href = "/shows" onClick = {() => {setOpen(false)}}> Shows </Link>
            <Link className = 'link' onClick = {() => {setOpen(false)}} href = "https://drive.google.com/drive/folders/1Az_03z0v7c8jZdKIGyCo5ssf9DPwK1F_">Transcripts</Link>
          </div>
          <div className={`h-fit p-0 hover:cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} onClick={() => setOpen(!isOpen)}>
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
          </div>
          </div>
        </div>          
          <div className = {`fixed h-full right-0 top-20 bg-[plum] text-[#111111] text-2xl p-10 pr-20 w-min shadow-xl transition-all duration-600 ${isOpen ? "visible opacity-100" : "collapse opacity-0"} xl:collapse`}>
            <div className = "block w-min">
              <ul className="list-none">
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
            </div>
          </div>
      </div>
    </header>
  );
};

export default Navbar;
