import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import Card from '../components/card/card'

export const sizes = {
        'small': {width: '150px', height: '150px'},
        'medium': {width: '250px', height: '250px'},
        'large': {width: '350px', height: '500px'},
    }

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
        <Card imgUrl={'/static/netflix.svg'} size={sizes.large} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.large} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.large} />
        </div>
        <div className={styles.cardListContainer}>
        <Card imgUrl={'/static/netflix.svg'} size={sizes.medium} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.medium} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.medium} />
        </div>
        <div className={styles.cardListContainer}>
        <Card imgUrl={'/static/netflix.svg'} size={sizes.small} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.small} />
        <Card imgUrl={'/static/netflix.svg'} size={sizes.small} />
        </div>
      </main>
    </div>
  )
}
