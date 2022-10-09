import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar/navBar'
import { useState } from 'react'

export default function Home() {

  const [expand, setExpand] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chill n Stream</title>
        <meta name="description" content="Find and watch your favorite streaming shows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar username={'423@gmail.com'} avatarUrl={'/static/expand.svg'} setExpand={setExpand} />
        
        <Banner title="Clifford the red dog" subTitle="a very cute dog" buttonName="Play" imgUrl={'/static/clifford.webp'} />
        {expand && <div className={styles.accountDetails}>Account Details</div>}
      </main>
    </div>
  )
}
