"use client";

import styles from "./shows.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink, Facebook, Mail, PlayCircle } from "react-feather";
import PageTitle from "../components/page-title";
import React from "react";
import fetch from 'node-fetch';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Head from 'next/head';
import { Instagram } from "react-feather";
import { Twitter } from "react-feather";
import { Youtube } from "react-feather";

export const metadata = {
  title: "Shows",
}; 

const urls = ['https://api.spotify.com/v1/shows/7HdlfouqPBS3PLf1ivCfdN',
 'https://api.spotify.com/v1/shows/7ePxTS7GYVZ0uBAZrueeaD',
];

const actorsLightsOut = new Map();
actorsLightsOut.set("Sadie Maxwell", "Kate Dickinson");
actorsLightsOut.set("Zara Williams", "Sally Jamrog");
actorsLightsOut.set("Miriam Silas", "Katy Silva");
actorsLightsOut.set("Jo Treman", "Kaeleen Chen");
actorsLightsOut.set("Worker (Terry)", "Andi Alexander-Smith");
actorsLightsOut.set("Paul Williams", "Theo Sloan");
actorsLightsOut.set("Guard", "Alder Chu");
actorsLightsOut.set("Archive Worker", "Angus Abercrombie");
actorsLightsOut.set("Passenger", "Jackson Phelps");
actorsLightsOut.set("Teacher", "Jackson Phelps");
actorsLightsOut.set("Monster", "Jackson Phelps");

const actorsRemnants = new Map();

const transcriptsLightsOut = "https://drive.google.com/drive/folders/1mf7VR4szJyBBYbRWcl9lWLz7h6rhBpBv"; 

const transcriptsRemnants = "https://drive.google.com/drive/folders/1Eze6Lqetc0Q6aronlB0x7miS7JR35mt-";

const transcripts = [transcriptsLightsOut, transcriptsRemnants];
const actors = [actorsLightsOut, actorsRemnants];

function setColor(idn, numEpisodes) {
  console.log(idn);
  console.log(numEpisodes);
  for (let j = 0; j < numEpisodes; j++) {
    const html = document.getElementById(j);
    if(j == idn) {
      console.log(html.innerHTML);
      html.style.borderColor = "plum";
      html.style.borderWidth = "2px";
      html.style.borderStyle = "solid";
    } else {
      html.style.borderColor = "gray";
      html.style.borderWidth = "2px";
      html.style.borderStyle = "solid";
    }
  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default function Shows ({Remnants, LightsOut}) {
  var i = -1;
  const num = 2;

  const names = [LightsOut, Remnants];
  const [isHighlighted, setHighlighted] = React.useState({id: 0});
  
  return (
    <section className = "max-w-[1200px] mx-auto">
    <Head>
        <title>Shows | The Wild Thistle Productions</title>
      </Head>
    <main>
      <PageTitle> 
        Shows
      </PageTitle>
      <div>
          <ul className  = {styles.episodes}>
          {names.map((name) => {i = i + 1; const id = i; return (
            <div>
          <li onClick = {() => {setHighlighted({id}); setColor(id, num); console.log(names[isHighlighted.id])}}>
            <div>
            <Image id = {i} src = {name["images"][0]["url"]} width = "300" height = "300" className = {styles.topImage}/>
            </div>
            </li>
            </div>
          );})}
          </ul>
        </div>
        <section className = "max-w-[1200px] mx-auto">     
            <div className = {styles.spacer}></div> 
            <div className = "grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className = {styles.showTitle}>{names[isHighlighted.id].name}</div>
              <hr className = {styles.showUnderline} color="green"/>
              <div className = {styles.releaseDate}><i>Episodes: {names[isHighlighted.id].total_episodes}</i></div>
              <div className = {styles.description}>{names[isHighlighted.id].description.split(".")[0] + "."}</div>
              <Link href = {transcripts[isHighlighted.id]} className={styles.link}>All Episode Transcripts</Link>
              <hr className = {styles.spaceTop} color="green"/>
              <div className = {styles.castHeader}>{actors[isHighlighted.id].size > 0 ? "Dramatis Personae:" : ""}</div>
              <div>
                {...Array.from(actors[isHighlighted.id].keys()).map((key) => {return(<div className = {styles.castList}><div>{key}</div> <div>{actors[isHighlighted.id].get(key)}</div></div>);})}
              </div>
              <div className = {styles.producer}>Produced by {names[isHighlighted.id].publisher}</div>
              <hr className = {styles.spaceBottom} color="green"/>
              <div className = {styles.media}>
              <div className = {styles.mediaTitle}>Share and Support!</div>
              <div className = {styles.icons}>
              <Link href = "https://www.twitter.com/" target = "_blank"><Twitter className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.facebook.com/" target = "_blank"><Facebook className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.gmail.com/" target = "_blank"><Mail className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.instagram.com/the_wild_thistle_productions/" target = "_blank"><Instagram className = {styles.mediaIcon}/></Link>
             <Link href = "https://www.youtube.com/channel/UCh936OgeD_W7DS4bcQv1B0A" target = "_blank"><Youtube className = {styles.mediaIcon}/></Link>
             <Link href = "https://www.buymeacoffee.com/thewildthistleproductions" className = {styles.link} onClick = {() => {setOpen(!isOpen)}}>Buy Me a Coffee</Link>
              </div>
              </div>
              </div>
              <div>
              <Link href = {names[isHighlighted.id]["external_urls"]["spotify"]}><Image src = {names[isHighlighted.id].images[0]["url"]} width = "500" height = "500" className = {styles.image}/></Link>
              <div className = {styles.title}>Latest Episode:</div>
              <div className = {styles.latestEpisodeName}>{names[isHighlighted.id].episodes.items[0]["name"]}</div>
              <div className={styles.audio}> Preview: <audio controls src={names[isHighlighted.id].episodes.items[0]["audio_preview_url"]} className={styles.preview}>Listen to An Audio Preview Here:</audio></div>
              <hr className = {styles.spaceBottom} color="green"/>

              <div>{names[isHighlighted.id].episodes.items.map((episode) => {
                return (<div><Link href = {episode["external_urls"]["spotify"]}> <div className = {styles.spaceApart}> <div className = {styles.episode}><PlayCircle/>
                <div class = {styles.episodeName}>{episode["name"]}</div></div> <div>{millisToMinutesAndSeconds(episode["duration_ms"])}</div></div> </Link>
                    <div color = "plum" className = {styles.episodeUnderline}></div></div>
                );
              })}</div>
              </div>
            </div>    
        </section>
    </main>
    </section>);

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

  const rem = await fetch('https://api.spotify.com/v1/shows/7HdlfouqPBS3PLf1ivCfdN', {
    next: { revalidate: 10 },
  headers: {
    Authorization: 'Bearer ' + accessToken
  }
 });

 const rdata = await rem.json();
 const Remnants = rdata;

const lights = await fetch('https://api.spotify.com/v1/shows/7ePxTS7GYVZ0uBAZrueeaD',{
  next: { revalidate: 10 },
headers: {
  Authorization: 'Bearer ' + accessToken
}
});

const ldata = await lights.json();
const LightsOut = ldata;

console.log(Remnants);

  return {
      props: {Remnants, LightsOut},
      revalidate: 10,
  };
}
}
