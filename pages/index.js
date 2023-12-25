import styles from "./page.module.css";
import Overlay from "../components/overlay";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import mainImage from "../images/Cover.jpeg";
import Head from 'next/head';
import { Twitter } from "react-feather";
import { Instagram } from "react-feather";
import { Youtube } from "react-feather";
import { ArrowRight } from "react-feather";
import fetch from 'node-fetch';
import React from "react";
import { InferGetStaticPropsType, GetStaticProps } from 'next'

export default function Page ({episodes}) {
  return (
    <div>
    <Head><title>Home | The Wild Thistle Productions</title></Head>
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
      <section className = 'section container'>
        <header className = {styles.title}>Latest Releases</header>
        <div className = "section container">
        <div>
          <ul className  = {styles.episodes}>
          {episodes.map((episode) => {return (
            <div>
          <li className = {styles.episode}>
          <Link className = {styles.link} href = {episode["external_urls"]["spotify"]}><Image src = {episode["images"][0]["url"]} width = "300" height = "300" className = {styles.image}/></Link>
             
           <Link className = {styles.link} href = {episode["external_urls"]["spotify"]}><div className = {styles.episodeTitle}>{episode["name"]}</div></Link>
            <div className = {styles.releaseDate}><i>Released: </i>{episode["release_date"]}</div>
            <div className = {styles.description}>{episode["description"].split(".")[0] + "." + episode["description"].split(".")[1] + "."}</div>
            <div className = {styles.audio}> <audio controls src = {episode["audio_preview_url"]} className = {styles.preview}>Listen to An Audio Preview Here:</audio></div> 
            </li>
            </div>
          );})}
          </ul>
        </div>
      </div>  
      </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {

  const url = "https://accounts.spotify.com/api/token";

  const refreshToken = "AQALo12zrAAwkR25d5UnLkfWgnIkB9tXX3TsxqtJXCKUyB6a1dU2BuDJ1omRkP7cGDpnNl0eZvvqR-etNpBi3X5kdZUNIU6fJ8ANTCi3gojon-lSPufyXVq8Puo1vgXtnEM"

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`aa9e986bd91742ef913fbf78a66a24ec:7749e697db2647fea424bcfd2d8e85ef`).toString("base64")}` 
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: 'aa9e986bd91742ef913fbf78a66a24ec',
     }),
   }
   const request = await fetch(url, payload);
   if (request.ok) {
    const response = await request.json();
    const { access_token, expires_in, refresh_token } = response;
    const timestamp = Math.floor((Date.now() + expires_in * 1000) / 1000);

    console.log(response);
    console.log(`New access token: ${access_token}`);

  let accessToken = access_token;
  const res = await fetch('https://api.spotify.com/v1/shows/4MqPuRVONKkOiu2SOAYgAf', {

    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await res.json();
  console.log("SDDDD");
  const episodes = data.episodes.items;
  console.log("SWITJ");
  const epi = episodes;
  console.log(episodes);

  return {
      props: {episodes, revalidate: 10},
  };
}
}



