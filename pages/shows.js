"use client";

import styles from "./shows.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";
import React from "react";
import fetch from 'node-fetch';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Head from 'next/head';
import { X } from "react-feather";
import { Instagram } from "react-feather";
import { Twitter } from "react-feather";
import { Youtube } from "react-feather";

export const metadata = {
  title: "Shows",
}; 

var urls = ['https://api.spotify.com/v1/shows/7HdlfouqPBS3PLf1ivCfdN',
 'https://api.spotify.com/v1/shows/7ePxTS7GYVZ0uBAZrueeaD',
];

function setColor(idn, numEpisodes) {
  console.log(idn);
  console.log(numEpisodes);
  for (let j = 0; j < numEpisodes; j++) {
    const html = document.getElementById(j);
    if(j == idn) {
      console.log(html.innerHTML);
      html.style.borderColor = "plum";
      html.style.borderWidth = "5px";
      html.style.borderStyle = "solid";
    } else {
      html.style.borderColor = "gray";
      html.style.borderWidth = "5px";
      html.style.borderStyle = "solid";
    }
  }
}


export default function Shows ({episodes, Remnants, LightsOut}) {
  console.log(episodes[0]["images"][0]["url"]);
  var i = -1;

  const num = episodes.length

  const names = [LightsOut, Remnants];
  const [isHighlighted, setHighlighted] = React.useState({id: 0});
  
  return (
    <section>
    <Head>
        <title>Shows | The Wild Thistle Productions</title>
      </Head>
    <main>
      <PageTitle> 
        Shows
      </PageTitle>
      <div>
          <ul className  = {styles.episodes}>
          {episodes.map((episode) => {i = i + 1; const id = i; return (
            <div>
          <li onClick = {() => {setHighlighted({id}); setColor(id, num); console.log(names[isHighlighted.id])}}>
            <div>
            <Image id = {i} src = {episode["images"][0]["url"]} width = "300" height = "300" className = {styles.topImage}/>
            </div>
            </li>
            </div>
          );})}
          </ul>
        </div>
        <section className = "section container">     
            <div className = {styles.spacer}></div> 
            <div className = "cols1_1">
            <Image src = {names[isHighlighted.id].images[0]["url"]} width = "500" height = "500" className = {styles.image}/>
            <div>
              <div className = {styles.showTitle}>{names[isHighlighted.id].name}</div>
              <div className = {styles.releaseDate}><i>Episodes: {names[isHighlighted.id].total_episodes}</i></div>
              <div className = {styles.description}>{names[isHighlighted.id].description.split(".")[0] + "." + names[isHighlighted.id].description.split(".")[1] + "."}</div>
              <div className = {styles.title}>Releases:</div>
              <div>{names[isHighlighted.id].episodes.items.map((episode) => {
                return (<div className = {styles.link} >
                <Link href = {episode["external_urls"]["spotify"]}><div className = {styles.link}>{episode["name"]}</div></Link>
                </div>);
              })}</div>
              <div className = {styles.media}>
              <div className = {styles.mediaTitle}>Share and Support!</div>
              <div className = {styles.icons}>
              <Link href = "https://www.instagram.com/the_wild_thistle_productions/" target = "_blank"><Instagram className = {styles.mediaIcon}/></Link>
             <Link href = "https://www.youtube.com/channel/UCh936OgeD_W7DS4bcQv1B0A" target = "_blank"><Youtube className = {styles.mediaIcon}/></Link>
             <Link href = "https://www.buymeacoffee.com/thewildthistleproductions" className = {styles.link} onClick = {() => {setOpen(!isOpen)}}>Buy Me a Coffee</Link>
              </div>
              </div>
             
              <div>Produced by {names[isHighlighted.id].publisher}</div>
              </div>
            </div>    
        </section>
    </main>
    </section>);

 }

 //<Link className = {styles.link} href = {episode["external_urls"]["spotify"]}>

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
  const episodes = data.episodes.items;

  const rem = await fetch('https://api.spotify.com/v1/shows/7HdlfouqPBS3PLf1ivCfdN', {

  headers: {
    Authorization: 'Bearer ' + accessToken
  }
 });

 const rdata = await rem.json();
 const Remnants = rdata;

const lights = await fetch('https://api.spotify.com/v1/shows/7ePxTS7GYVZ0uBAZrueeaD', {

headers: {
  Authorization: 'Bearer ' + accessToken
}
});

const ldata = await lights.json();
const LightsOut = ldata;

console.log(Remnants);

  return {
      props: {episodes, Remnants, LightsOut, revalidate: 10},
  };
}
}
