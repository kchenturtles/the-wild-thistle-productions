import styles from "./page.module.css";
import Overlay from "../components/overlay";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import mainImage from "../images/Cover.jpeg";

import { Twitter } from "react-feather";
import { Instagram } from "react-feather";
import { Youtube } from "react-feather";
import { ArrowRight } from "react-feather";
import fetch from 'node-fetch';
// import React, { useState, useEffect } from 'react';

const SpotifyWebApi = require('spotify-web-api-node');
// const express = require('express');

const getRefreshedToken = async () => {

  // refresh token that has been previously stored
  const url = "https://accounts.spotify.com/api/token";

  console.log(localStorage.getItem('refresh_token'));

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`aa9e986bd91742ef913fbf78a66a24ec:7749e697db2647fea424bcfd2d8e85ef`).toString("base64")}` 
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: localStorage.getItem('refresh_token'),
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
    localStorage.setItem('access_token', access_token);
 }  

// React.useEffect(() => {
//   getRefreshedToken();
// })

}

// const latestReleases = () => {
  
// }

export let first = []

export async function getLatestEpisodes() {
  const url = "https://accounts.spotify.com/api/token";

  console.log(localStorage.getItem('refresh_token'));

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`aa9e986bd91742ef913fbf78a66a24ec:7749e697db2647fea424bcfd2d8e85ef`).toString("base64")}` 
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: localStorage.getItem('refresh_token'),
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
    localStorage.setItem('access_token', access_token);

  let accessToken = localStorage.getItem('access_token');

  const res = await fetch('https://api.spotify.com/v1/shows/4MqPuRVONKkOiu2SOAYgAf?si=a90b318f18ff4ace', {

  // https://open.spotify.com/show/
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await res.json();
  const episodes = data.episodes.items;
   console.log(episodes);
  first = [{description: episodes[0].description, images: episodes[0].images, release_date: episodes[0].release_date, name: episodes[0].name}, 
  {description: episodes[1].description, images: episodes[1].images, release_date: episodes[1].release_date, name: episodes[1].name}];
   console.log(first);
}
}

export default function Page () {
  return (
    <main onLoad = {() => getRefreshedToken()}>
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
      </section>
    </main>
  );
}
