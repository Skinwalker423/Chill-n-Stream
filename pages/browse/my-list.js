import React from 'react'
import Link from 'next/link';
import redirectUser from '../../utils/redirectUser';
import { getFavoriteVids } from '../../lib/fetchYouTubeVideos';
import SectionCards from '../../components/card/SectionCards';
import { classMap } from '../../components/card/card';

export async function getServerSideProps(context){
    const {issuer, token} = await redirectUser(context);
    console.log('issuer and token', issuer, token);

    // if(!issuer){
    //     return {
    //     props: {},
    //     redirect: {
    //         destination: '/login',
    //         permanent: false,
    //     }

    //     }
    // }

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
    <div>
        <h1>Here is my list of favorite streams</h1>
        <Link href={'/'}><a>Go Back Home</a></Link>
        <SectionCards moviesArray={myListVids} section={'Favorites'} size={classMap.large} />
    </div>

  )
}

export default myList;