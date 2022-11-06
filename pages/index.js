import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import { classMap } from '../components/card/card'
import SectionCards from '../components/card/SectionCards'
import { getVideosByQuery, getPopularVideos } from '../lib/fetchYouTubeVideos'
import { useContext } from 'react'
import { UserContext } from '../store/userContext'
import Loader from '../components/Loader/Loader'
import { getWatchedVids } from '../lib/fetchYouTubeVideos'
import useRedirectUser from '../utils/redirectUser'

export async function getServerSideProps(context) {

  const disneyVids = await getVideosByQuery('Disney trailer');
  const comedyVids = await getVideosByQuery('Comedy Movies');
  const popVids = await getPopularVideos();

  const {token, issuer} = await useRedirectUser(context);

  const response = await getWatchedVids(token, issuer);
  const watchAgainVids = response ? response : [];

  return{
    props: {disneyVids, comedyVids, popVids, watchAgainVids}
  }
}


export default function Home({disneyVids, comedyVids, popVids, watchAgainVids}) {

  const {isLoading} = useContext(UserContext);
  const {state} = useContext(UserContext);

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
          {watchAgainVids.length && <SectionCards moviesArray={watchAgainVids} section={'Watch Aagin'} size={classMap.small} />}
        </div>
      </main>}
    </div>
  )
}


