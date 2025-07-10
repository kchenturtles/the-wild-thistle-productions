"use client";

import styles from "./shows.module.css";
import Link from "next/link";
import { ExternalLink, Facebook, Headphones, Mail, Mic, Music, PlayCircle, Speaker } from "react-feather";
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
 'https://open.spotify.com/show/6Rq1m3JHtixBJq7XnPfCvG?trackId=2SOceEcDVIyvXtrCdG0RPw',
];

/**
 * @typedef {Object} Actor
 * @property {string} name
 * @property {string} bio
 */

/**
 * @typedef {Object} Role
 * @property {string} name
 * @property {Actor} actor
 */

const actorList = [
  {
    name: "Kate Dickinson",
    bio: "Kate Dickinson",
  },
  {
    name: "Sally Jamrog",
    bio: "Sally Jamrog",
  },
  {
    name: "Katy Silva",
    bio: "Katy Silva",
  },
  {
    name: "Kaeleen Chen",
    bio: "Kaeleen Chen",
  },
  {
    name: "Andi Alexander-Smith",
    bio: "Andi Alexander-Smith",
  },
  {
    name: "Theo Sloan",
    bio: "Theo Sloan",
  },
  {
    name: "Alder Chu",
    bio: "Alder Chu",
  },
  {
    name: "Angus Abercrombie",
    bio: "Angus Abercrombie",
  },
  {
    name: "Jackson Phelps",
    bio: "Jackson Phelps",
  },
  {
    name: "Maya S.",
    bio: "Maya S.",
  },
  {
    name: "Alexander Crowe",
    bio: "Alexander Crowe",
  },
  {
    name: "Aster Gamarnik",
    bio: "Aster Gamarnik",
  },
  {
    name: "Fiona S.",
    bio: "Fiona S.",
  },
  {
    name: "Hannah S.",
    bio: "Hannah S.",
  }
]

const actorsLightsOut = [
  {
    name: "Sadie Maxwell",
    actor: actorList[0],
  },
  {
    name: "Zara Williams",
    actor: actorList[1],
  },
  {
    name: "Miriam Silas",
    actor: actorList[2],
  },
  {
    name: "Jo Treman",
    actor: actorList[3],
  },
  {
    name: "Worker (Terry)",
    actor: actorList[4],
  },
  {
    name: "Paul Williams",
    actor: actorList[5],
  },
  {
    name: "Guard",
    actor: actorList[6],
  },
  {
    name: "Archive Worker",
    actor: actorList[7],
  },
  {
    name: "Passenger",
    actor: actorList[8],
  },
  {
    name: "Teacher",
    actor: actorList[8],
  },
  {
    name: "Monster",
    actor: actorList[8],
  },
];

const actorsRemnants = [];

const actorsSyncopa = [
  {
    name: "Mia Stephens",
    actor: actorList[2],
  },
  {
    name: "Elena Harper",
    actor: actorList[9],
  },
  {
    name: "Hayden Kent",
    actor: actorList[10],
  },
  {
    name: "Evelyn Harper",
    actor: actorList[0],
  },
  {
    name: "Paul Sullivan",
    actor: actorList[11],
  },
  {
    name: "Gregory Kelly",
    actor: actorList[6],
  },
  {
    name: "Brendon Waller",
    actor: actorList[4],
  },
  {
    name: "Officer",
    actor: actorList[12],
  },
  {
    name: "Announcer",
    actor: actorList[1],
  },
  {
    name: "Person",
    actor: actorList[5],
  },
  {
    name: "Newscaster",
    actor: actorList[13],
  }
]

const transcriptsLightsOut = "https://drive.google.com/drive/folders/1mf7VR4szJyBBYbRWcl9lWLz7h6rhBpBv"; 

const transcriptsRemnants = "https://drive.google.com/drive/folders/1Eze6Lqetc0Q6aronlB0x7miS7JR35mt-";

const transcriptsSyncopa = "https://drive.google.com/drive/folders/1KGQTjwuh8OcMN7GRvHjmsPDJC7WEn6TH";

const transcripts = [transcriptsLightsOut, transcriptsRemnants, transcriptsSyncopa];
const actors = [actorsLightsOut, actorsRemnants, actorsSyncopa];

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

export default function Shows ({Remnants, LightsOut, Syncopa}) {
  const [showToolTip, setShowToolTip] = React.useState(-1);
  var i = -1;
  const num = 3;

  const names = [LightsOut, Remnants, Syncopa];
  const [isHighlighted, setHighlighted] = React.useState({id: 0});

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  
  return (
    <section className = "max-w-[1200px] mx-auto relative px-8 sm:px-12 md:px-24 lg:px-30">
    <Head>
        <title>Shows | The Wild Thistle Productions</title>
      </Head>
    <main>
      <div className="title" style={{fontSize: "xxx-large", fontWeight: "600", marginTop: "4rem", marginBottom: "4rem"}}>
        Shows
      </div>
      <div>
          <ul className  = {styles.episodes}>
          {names.map((name) => {i = i + 1; const id = i; return (
            <div>
          <li onClick = {() => {setHighlighted({id}); setColor(id, num); console.log(names[isHighlighted.id])}}>
            <div>
              <img id = {i} src = {name["images"][0]["url"]} width = "300" height = "300" className = {styles.topImage}/>
            </div>
            </li>
            </div>
          );})}
          </ul>
        </div>
        <section className = "max-w-[1200px] mx-auto">     
            <div className = {styles.spacer}></div> 
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="order-2 md:!order-first">
              <div className = {styles.showTitle}>{names[isHighlighted.id].name}</div>
              <hr className = {styles.showUnderline} color="green"/>
              <div className = {styles.releaseDate}><i>Episodes: {names[isHighlighted.id].total_episodes}</i></div>
              <div className = {styles.description}>{names[isHighlighted.id].description.split(".")[0] + "."}</div>
              <Link href = {transcripts[isHighlighted.id]} className="button">All Episode Transcripts</Link>
              <hr className = {styles.spaceTop} color="green"/>
              <div className = {styles.castHeader}>{actors[isHighlighted.id].length > 0 ? "Dramatis Personae:" : ""}</div>
              <div>
                {actors[isHighlighted.id].map((actor, index) => {return(<div onMouseEnter={() => setShowToolTip(index)} onMouseLeave={() => setShowToolTip(-1)}><div className = {styles.castList}><div>{actor.name}</div> <div>{actor.actor.name}</div></div>
                <span className={`${showToolTip === index ? "inline-block absolute text-black bg-white z-10 p-1 px-2 rounded-sm" : "hidden"} ml-8 md:ml-0`} style={{left: position.x - 25, top: position.y - 150, pointerEvents: "none"}}>{actor.actor.bio}</span>
                </div>);})}
              </div>
              <div className = {styles.producer}>Produced by {names[isHighlighted.id].publisher}</div>
              <hr className = {styles.spaceBottom} color="green"/>
              <div className = {styles.media}>
              <div className = {styles.mediaTitle}>Share and Support!</div>
              <div className = {styles.icons}>
              <Link href = "https://open.spotify.com/show/4MqPuRVONKkOiu2SOAYgAf" target = "_blank"><Headphones className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.instagram.com/the_wild_thistle_productions/" target = "_blank"><Instagram className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.youtube.com/channel/UCh936OgeD_W7DS4bcQv1B0A" target = "_blank"><Youtube className = {styles.mediaIcon}/></Link>
              <Link href = "https://www.buymeacoffee.com/thewildthistleproductions" target = "_blank" className = {styles.link}>Buy Me a Coffee</Link>
              </div>
              </div>
              </div>
              <div>
              <Link href = {names[isHighlighted.id]["external_urls"]["spotify"]}><img src = {names[isHighlighted.id].images[0]["url"]} width = "500" height = "500" className = {`${styles.image} mx-auto md:m-0`}/></Link>
              <div className = {styles.title}>Latest Episode:</div>
              <div className = {styles.latestEpisodeName}>{names[isHighlighted.id].episodes.items[0]["name"]}</div>
              <div className={styles.audio}> Preview: <audio controls src={names[isHighlighted.id].episodes.items[0]["audio_preview_url"]} className={styles.preview}>Listen to An Audio Preview Here:</audio></div>
              <hr className = {styles.spaceBottom} color="green"/>

              <div>{names[isHighlighted.id].episodes.items.map((episode) => {
                return (<div><Link href = {episode["external_urls"]["spotify"]}> <div className = {styles.spaceApart}> <div className = {styles.episode}><PlayCircle/>
                <div className = {styles.episodeName}>{episode["name"]}</div></div> <div>{millisToMinutesAndSeconds(episode["duration_ms"])}</div></div> </Link>
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

const syncopa = await fetch('https://api.spotify.com/v1/shows/6Rq1m3JHtixBJq7XnPfCvG', {
  next: { revalidate: 10 },
headers: {
  Authorization: 'Bearer ' + accessToken
}
});

const sdata = await syncopa.json();
const Syncopa = sdata;

console.log(Remnants);

  return {
      props: {Remnants, LightsOut, Syncopa},
      revalidate: 10,
  };
}
}
