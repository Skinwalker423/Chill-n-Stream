import Head from 'next/head'
import Banner from '../components/banner/Banner'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chill n Stream</title>
        <meta name="description" content="Find and watch your favorite streaming shows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.header}>Netflix</h1>
        <Banner title="Title" subTitle="Subtitle" buttonName="Play" imgUrl={'/static/clifford.webp'} />
      </main>
    </div>
  )
}
