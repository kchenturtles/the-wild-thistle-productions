import styles from "./shows.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";
import React from 'react';
import fetch from 'node-fetch';
// import { getLatestEpisodes } from ".";
import { InferGetStaticPropsType, GetStaticProps } from 'next'

export const metadata = {
  title: "Shows",
}; 

export default function Shows ({episodes}) {
  // console.log("LAKFALKSJF")
  // console.log(episodes[0]);
  // console.log("ASIOFHASKJF");
  // console.log(episodes[1]);

  // const json = JSON.parse(episodes[1].stringify);
  // console.log(json);

  console.log(episodes[0]["description"]);
  
  return (
    <main>
      <PageTitle> 
        Shows
      </PageTitle>
      <div>
      <div>Shows</div>
      <div></div>
        <div>
          <ul>
          {episodes.map((episode) => {return (<li>{episode["description"]}</li>);})}
          </ul>
        </div>
        <div>Transcripts</div>
      </div>
    </main>);

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

  // https://open.spotify.com/show/
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



// curl -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded"  -d "grant_type=client_credentials&client_id=aa9e986bd91742ef913fbf78a66a24ec&client_secret=7749e697db2647fea424bcfd2d8e85ef"

//curl "https://api.spotify.com/show/4MqPuRVONKkOiu2SOAYgAf?si=07bcb65e7de44d0e" -H "Authorization: Bearer  BQBXMedpAk925eX2eSqC4swzZyBDUDSyi5zk-nEa-mAn5q1l3pxGiZT2aNRItNmcJ56lskSfgZLGlpTk4GYhB_HyOEr2hLFBiXO5xEkdiarGrsjjE2g"

// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" -H "Authorization: Bearer  BQBXMedpAk925eX2eSqC4swzZyBDUDSyi5zk-nEa-mAn5q1l3pxGiZT2aNRItNmcJ56lskSfgZLGlpTk4GYhB_HyOEr2hLFBiXO5xEkdiarGrsjjE2g"