import React, {useEffect, useContext, useState} from 'react'
import Head from 'next/head'
import { m } from '../../lib/magic-client';
import Link from 'next/link';
import { UserContext } from '../../store/userContext';
import { useRouter } from 'next/router';

const UserDashboard = () => {

    const router = useRouter();
    const {state, dispatch} = useContext(UserContext);
    const [loading, setLoading] = useState(false);


    useEffect(() =>{
        if(router.query.tokenId && state.user){
          if(state.user !== router.query.tokenId ){
          console.log('not authorized');
          router.push('/');
          } 
        }else {
          setLoading(true);
        }
    }, [router.query.tokenId])

  return (
    <div>

      {!loading ? <div>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="user info" />
        </Head>
        <div>
            <h1>Welcome to your Dashboard </h1>
            <div>
              <p>Email: {state.email}</p>
              <p>Username: </p>
              <p>Other info</p>
            </div>
            <Link href={'/'}><a>Back Home</a></Link>
        </div>
      </div>: 'Loading...'}  
    </div>
  )
}

export default UserDashboard