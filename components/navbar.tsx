import Link from "next/link";
import React from "react";
import { Menu} from "react-feather";
import { X } from "react-feather";
import { Instagram } from "react-feather";
import { Twitter } from "react-feather";
import { Youtube } from "react-feather";
import styles from "./navbar.module.css";
import logo from "../images/logos/thistle.png";

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
      <div className='w-full'>
        <div className={`flex justify-between items-center border-b-4 border-[plum]`} style={{padding: "0 1rem"}}>
          <Link href="/" onClick = {() => {setOpen(false)}}>
            <div className = {'flex items-center nowrap'}>
              <img
                src={logo.src}
                alt= "Logo"
                className={styles.logo}
              /> 
              <div className = {styles.logoTitle}>The Wild Thistle Productions</div>
            </div>
            </Link>
            <span className="visually-hidden">Home</span>
          
          <div className = "flex items-center gap-8 text-xl">
          <div className= "items-center gap-8 text-xl hidden sm:flex">
            <Link className = {styles.link} href = "/shows" onClick = {() => {setOpen(false)}}> Shows </Link>
            <Link className = {styles.link} target = "_blank" onClick = {() => {setOpen(false)}} href = "https://drive.google.com/drive/folders/1Az_03z0v7c8jZdKIGyCo5ssf9DPwK1F_">Transcripts</Link>
          </div>
          <div className={`h-24 w-24 p-0 hover:cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} onClick={() => setOpen(!isOpen)} style = {{height: "24px", width: "24px"}}>
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
          <div className = {`fixed h-full right-0 top-20 bg-[#111111] text-[plum] sm:border-l-4 border-[#DDA0DD] border-double border-t-0 p-10 border-b-0 border-r-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-xl transition-all duration-600 ${isOpen ? "visible opacity-100" : "collapse opacity-0"} xl:collapse`}>
            <div className = "block">
              <ul className="list-none text-xl">
                <li className="mb-4 block sm:hidden">
                  <Link
                    href="/shows"
                    className={styles.link}
                    onClick={() => {setOpen(!isOpen)}}
                  >
                    Shows
                  </Link>
                </li>
                <li className="mb-4 block sm:hidden">
                  <Link
                    href="https://drive.google.com/drive/folders/1Az_03z0v7c8jZdKIGyCo5ssf9DPwK1F_"
                    target = "_blank"
                    className={styles.link}
                    onClick={() => {setOpen(!isOpen)}}
                  >
                    Transcripts
                  </Link>
                </li>
                {links.map(({ label, to }) => (
                  <li key={to} className="mb-4">
                    <Link
                      href={to}
                      className={styles.link} onClick = {() => {setOpen(!isOpen)}}
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
