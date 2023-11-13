import styles from "./shows.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";
import React from 'react';
import fetch from 'node-fetch';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Head from 'next/head';

export const metadata = {
  title: "Shows",
}; 

export default function Shows ({episodes}) {
  console.log(episodes[0]["images"][0]["url"]);
  
  return (
    <div>
    <Head>
        <title>Shows | The Wild Thistle Productions</title>
      </Head>
    <main>
      <PageTitle> 
        Shows
      </PageTitle>
      <div className = "section container">
        <div>
          <ul className  = {styles.episodes}>
          {episodes.map((episode) => {return (
            <div>
          <li className = {styles.episode}>
            <Image src = {episode["images"][0]["url"]} width = "300" height = "300" className = {styles.image}/>
             
            <div className = {styles.title}>{episode["name"]}</div>
            <div className = {styles.releaseDate}><i>Released: </i>{episode["release_date"]}</div>
            <div className = {styles.description}>{episode["description"]}</div>
            <div className = {styles.audio}> <audio controls src = {episode["audio_preview_url"]}>Listen to An Audio Preview Here:</audio></div> 
            <div className = {styles.episodeLink}><Link className = {styles.link} href = {episode["external_urls"]["spotify"]}>Listen to the Full Episode</Link> </div>
            </li>
            </div>
          );})}
          </ul>
        </div>
        <Link className = {`button ${styles.transcripts}`} href = "https://drive.google.com/drive/folders/1Az_03z0v7c8jZdKIGyCo5ssf9DPwK1F_">View Episode Transcripts</Link>
      </div>
    </main>
    </div>);

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
  const res = await fetch('https://api.spotify.com/v1/shows/4MqPuRVONKkOiu2SOAYgAf?si=a90b318f18ff4ace', {

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
      props: {episodes},
  };
}
}
