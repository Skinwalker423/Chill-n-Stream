import React from 'react'
import redirectUser from '../../utils/redirectUser';
import { getFavoriteVids } from '../../lib/fetchYouTubeVideos';
import SectionCards from '../../components/card/SectionCards';
import { classMap } from '../../components/card/card';
import Head from 'next/head';
import NavBar from '../../components/navBar/navBar';
import styles from './my-list.module.css';

export async function getServerSideProps(context){
    const {issuer, token} = await redirectUser(context);

    if(!issuer){
        return {
        props: {},
        redirect: {
            destination: '/login',
            permanent: false,
        }

        }
    }

    const response = await getFavoriteVids(token, issuer);
    const myListVids = response ? response : [];


    return {
      props: {
          myListVids,
      }
    }
}

const myList = ({myListVids}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Favorites List</title>
        <meta name="description" content="watch from your favorited content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <NavBar avatarUrl={'/static/expand.svg'} />
          <div className={styles.cardSectionContainer}>
            <SectionCards 
              moviesArray={myListVids} 
              section={'My List'} 
              size={classMap.medium}
              shouldWrap={true}
            />
          </div>
      </main>
    </div>

  )
}

export default myList;