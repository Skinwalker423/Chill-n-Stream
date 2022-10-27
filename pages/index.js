import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import { classMap } from '../components/card/card'
import SectionCards from '../components/card/SectionCards'
import fetchYouTubeVideos from '../lib/fetchYouTubeVideos'
import { getVideosByQuery, getPopularVideos } from '../lib/fetchYouTubeVideos'
import { m } from '../lib/magic-client'
import vidaData from '../data/youtubeQuery.json'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../store/userContext'
import Loader from '../components/Loader/Loader'
import { startFetchMyQueryUserCheck } from '../lib/db/hasura'

export async function getServerSideProps(context) {

  const disneyVids = await getVideosByQuery('Disney trailer');
  const comedyVids = await getVideosByQuery('Comedy Movies');
  const popVids = await getPopularVideos();
  // const disneyVids = vidaData.items;
  // const comedyVids = vidaData.items;
  // const popVids = vidaData.items;
  const res = await startFetchMyQueryUserCheck();
  console.log({res});
  const hasuraData = res.users ? res.users : [];

  // const userStats = hasuraData.stats.find((data) => data.userId === issuer);



  return{
    props: {disneyVids, comedyVids, popVids, hasuraData}
  }
}





export default function Home({disneyVids, comedyVids, popVids, hasuraData}) {

  const {isLoading} = useContext(UserContext);

  const {state} = useContext(UserContext);

  useEffect(() =>{
    if(state.issuer){
    console.log(hasuraData);
    const userStats = hasuraData.find((data) => data.issuer === state.issuer);
    console.log(userStats);
  }
  }, [state.issuer])





  return (
    <div className={styles.container}>
      <Head>
        <title>Chill n Stream</title>
        <meta name="description" content="Find and watch your favorite streaming shows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <Loader /> : <main className={styles.main}>
        <NavBar avatarUrl={'/static/expand.svg'} />
        
        <Banner title="Clifford the red dog" subTitle="a very cute dog" buttonName="Play" imgUrl={'/static/clifford.webp'} videoId={'4zH5iYM4wJo'} />
        <div className={styles.sectionWrapper}>
          <SectionCards moviesArray={disneyVids} section={'My Favs'} size={classMap.large}  />
          <SectionCards moviesArray={comedyVids} section={'Comedy'} size={classMap.medium} />
          <SectionCards moviesArray={popVids} section={'Trending'} size={classMap.small} />
        </div>
      </main>}
    </div>
  )
}


