import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import Card from '../components/card/card'
import { classMap } from '../components/card/card'


export default function Home() {


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
        <div className={styles.cardListContainer}>
        <Card imgUrl={'/static/clifford.webp'} size={classMap.large} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.large} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.large} />
        </div>
        <div className={styles.cardListContainer}>
        <Card imgUrl={'/static/clifford.webp'} size={classMap.medium} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.medium} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.medium} />
        </div>
        <div className={styles.cardListContainer}>
        <Card imgUrl={'/static/clifford.webp'} size={classMap.small} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.small} />
        <Card imgUrl={'/static/clifford.webp'} size={classMap.small} />
        </div>
      </main>
    </div>
  )
}
