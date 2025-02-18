import styles from "./page.module.css";
import Overlay from "../components/overlay";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import mainImage from "../images/Cover.png";
import Head from 'next/head';
import { ChevronLeft, ChevronRight, PlayCircle } from "react-feather";
import fetch from 'node-fetch';
import React from "react";
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { TypeAnimation } from 'react-type-animation';

function setColor(idn, numEpisodes) {
  console.log(idn);
  console.log(numEpisodes);
  for (let j = 0; j < numEpisodes; j++) {
    const html = document.getElementById(j);
    if (j == idn) {
      console.log(html.innerHTML);
      html.style.borderColor = "plum";
      html.style.borderWidth = "1px";
      html.style.borderStyle = "solid";
    } else {
      html.style.borderColor = "black";
      html.style.borderWidth = "1px";
      html.style.borderStyle = "solid";
    }
  }
}

function sideScroll(element, direction, speed, distance, step) {
  var scrollAmount = 0;
  var slideTimer = setInterval(function () {
    if (direction == 'left') {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

export default function Page({ episodes }) {
  const [isHighlighted, setHighlighted] = React.useState({ id: 0 });
  const num = episodes.length
  var i = -1;

  return (
    <div>
      <Head><title>Home | The Wild Thistle Productions</title></Head>
      <main>
        <header>
        </header>
        <section className='section container'>
          <Image className={styles.mainImage} src={mainImage} alt="Main Photo" />
          <div className={styles.introText}>
            <p><TypeAnimation sequence={'Welcome, listener, to the worlds that we have created. In these audio dramas, you will find places where imagination has touched.'} speed={75}
              repeat={1}
              style={{}} /></p>
          </div>
        </section>
        <section className='section container'>
          <header className={styles.title}>Latest Releases</header>
          <div className="section container">
            <div className='cols1_1'>
              <div className={styles.imageWrapper}>
                <Image src={episodes[isHighlighted.id]["images"][0]["url"]} width="500" height="500" className={styles.highlightedImage} />
              </div>
              <div>
                <div className={styles.releaseDate}>{episodes[isHighlighted.id]["release_date"]}</div>
                <hr color="green" className={styles.separator}></hr>
                <div className={styles.episodeTitle}>{episodes[isHighlighted.id]["name"]}</div>
                <div className={styles.description}>{episodes[isHighlighted.id]["description"].split("***")[0]}</div>
                <div className={styles.audio}> Preview: <audio controls src={episodes[isHighlighted.id]["audio_preview_url"]} className={styles.preview}>Listen to An Audio Preview Here:</audio></div>
                <Link href={episodes[isHighlighted.id]["external_urls"]["spotify"]}><div className="button"><PlayCircle /> Listen Now</div></Link>
              </div>
            </div>
            <div className={styles.episodes}>
              <div onClick={() => {
                var container = document.getElementById('scroll');
                sideScroll(container, 'left', 25, (container.clientWidth)/5 - 7, 10);
                if(isHighlighted.id > 0) {
                  setHighlighted({id: isHighlighted.id - 1});
                  setColor(isHighlighted.id - 1, num);
                }
              }}><ChevronLeft className = {styles.leftArrow} /></div>
              <div className={styles.scroll} id="scroll">
                {episodes.map((episode) => {
                  i = i + 1; const id = i; return (
                    <div className={styles.episode} onClick={() => { setHighlighted({ id }); setColor(id, num); }}>
                      <Image id={i} src={episode["images"][0]["url"]} width="300" height="300" className={styles.image} />
                    </div>
                  );
                })}
              </div>
              <div onClick={() => {
                var container = document.getElementById('scroll');
                sideScroll(container, 'right', 25, (container.clientWidth)/5 - 7, 10);
                if(isHighlighted.id < episodes.length-1) {
                  setHighlighted({id: isHighlighted.id + 1});
                  setColor(isHighlighted.id + 1, num);
                }
              }}><ChevronRight className = {styles.rightArrow} /></div>
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
  const request = await fetch(url, payload, {
    next: { revalidate: 10 },
  })
  if (request.ok) {
    const response = await request.json();
    const { access_token, expires_in, refresh_token } = response;
    const timestamp = Math.floor((Date.now() + expires_in * 1000) / 1000);

    console.log(response);
    console.log(`New access token: ${access_token}`);

    let accessToken = access_token;
    const res = await fetch('https://api.spotify.com/v1/shows/4MqPuRVONKkOiu2SOAYgAf', {
      next: { revalidate: 10 },

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
      props: { episodes },
      revalidate: 10,
    }
  }
}



