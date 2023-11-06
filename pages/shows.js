import styles from "./shows.module.css";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import PageTitle from "../components/page-title";

import fetch from 'node-fetch';
import { getLatestEpisodes } from ".";

import {first} from ".";

async function showFirst() {
  console.log(first[0].description);
}

//  const LatestEpisodes = getLatestEpisodes();

const ListShows = () => {}

export const metadata = {
  title: "Shows",
};

export default function Shows() {
  return (
    <main onClick = {() => {getLatestEpisodes()}}>
      <PageTitle> 
        Shows
        <div onClick = {() => {showFirst()}}> HI
        <ul>
          {first.map(({episode}) => {<li>{episode.description}</li>})}
          </ul>
        </div>
      </PageTitle>
    </main>);
}

// curl -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded"  -d "grant_type=client_credentials&client_id=aa9e986bd91742ef913fbf78a66a24ec&client_secret=7749e697db2647fea424bcfd2d8e85ef"

//curl "https://api.spotify.com/show/4MqPuRVONKkOiu2SOAYgAf?si=07bcb65e7de44d0e" -H "Authorization: Bearer  BQBXMedpAk925eX2eSqC4swzZyBDUDSyi5zk-nEa-mAn5q1l3pxGiZT2aNRItNmcJ56lskSfgZLGlpTk4GYhB_HyOEr2hLFBiXO5xEkdiarGrsjjE2g"

// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" -H "Authorization: Bearer  BQBXMedpAk925eX2eSqC4swzZyBDUDSyi5zk-nEa-mAn5q1l3pxGiZT2aNRItNmcJ56lskSfgZLGlpTk4GYhB_HyOEr2hLFBiXO5xEkdiarGrsjjE2g"