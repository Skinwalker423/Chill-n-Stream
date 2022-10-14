import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import { classMap } from '../components/card/card'
import SectionCards from '../components/card/SectionCards'
import { getVideos } from '../lib/videos'

export async function getServerSideProps(context) {

  // const disneyVids = getVideos();
  const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=Disney&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`, {
    Accept: 'application/json',
  })

  const data = await res.json();
  console.log(data)
  const disneyVids = getVideos(data);


  console.log('disney vids inside getServerside props:', disneyVids);

  return{
    props: {disneyVids}
  }
}


export default function Home({disneyVids}) {

  // const disneyVids = getVideos();

  


  const moviesArray = [
    {
      imgUrl: '/static/clifford.webp',
      id: 1
    },
    {
      imgUrl: '/static/clifford.webp',
      id: 2
    },
    {
      imgUrl: '/static/clifford.webp',
      id: 3
    },
    {
      imgUrl: '/static/clifford.webp',
      id: 4
    },
    {
      imgUrl: '/static/clifford.webp',
      id: 5
    },
    {
      imgUrl: '/static/clifford.webp',
      id: 6
    },
  ]

  console.log("dd");

  return (
    <div className={styles.container}>
      <Head>
        <title>Chill n Stream</title>
        <meta name="description" content="Find and watch your favorite streaming shows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar username={'423@gmail.com'} avatarUrl={'/static/expand.svg'} />
        
        <Banner title="Clifford the red dog" subTitle="a very cute dog" buttonName="Play" imgUrl={'/static/clifford.webp'} />
        <div className={styles.sectionWrapper}>
          <SectionCards moviesArray={disneyVids} section={'My Favs'} size={classMap.large}  />
          <SectionCards moviesArray={disneyVids} section={'Thrillers'} size={classMap.medium} />
          <SectionCards moviesArray={disneyVids} section={'Comedy'} size={classMap.small} />
        </div>
      </main>
    </div>
  )
}


