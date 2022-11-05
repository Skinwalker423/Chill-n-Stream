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


export async function getServerSideProps(context) {

  const disneyVids = await getVideosByQuery('Disney trailer');
  const comedyVids = await getVideosByQuery('Comedy Movies');
  const popVids = await getPopularVideos();

  const issuer = 'did:ethr:0x194254B69E0951BA076D1077e1E4EF644A502D3A'

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDE5NDI1NEI2OUUwOTUxQkEwNzZEMTA3N2UxRTRFRjY0NEE1MDJEM0EiLCJwdWJsaWNBZGRyZXNzIjoiMHgxOTQyNTRCNjlFMDk1MUJBMDc2RDEwNzdlMUU0RUY2NDRBNTAyRDNBIiwiZW1haWwiOiJsZ29uemFsZXoyM0B2ZXJpem9uLm5ldCIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHgxOTQyNTRCNjlFMDk1MUJBMDc2RDEwNzdlMUU0RUY2NDRBNTAyRDNBIn0sImlhdCI6MTY2NzYyNTU4MiwiZXhwIjoxNjY4MjMwMzgyfQ.TDJt3xF53_c7kcvEaJn8wRHRJD1m5u2K0ZsphL4LKls'

  const response = await getWatchedVids(token, issuer);
  console.log({response});
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
          <SectionCards moviesArray={watchAgainVids} section={'Watch Aagin'} size={classMap.small} />
        </div>
      </main>}
    </div>
  )
}


