import React, {useEffect, useContext, useState} from 'react'
import Head from 'next/head'
import { m } from '../../lib/magic-client';
import Link from 'next/link';
import { UserContext } from '../../store/userContext';
import { useRouter } from 'next/router';
import styles from './[tokenId].module.css';

const UserDashboard = () => {

    const router = useRouter();
    const {state, dispatch} = useContext(UserContext);
    const [loading, setLoading] = useState(false);


    useEffect(() =>{
      const verifyingMetaData = async() => {
        try{
            setLoading(true);
            const {publicAddress} = await m.user.getMetadata();
            if(publicAddress){
              if(router.query.tokenId !== publicAddress ){
                console.log('not authorized');
                router.push(`/dashboard/${publicAddress}`);
              } else {
                setLoading(false);
              }
            }
        }catch(err){
            console.log('problem with getting user token Id', err);
            router.push('/login');
        }
      }

      verifyingMetaData();
        
    }, [router.query.tokenId, state.user])

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
            <div className={styles.buttonWrapper}>
              <Link href={'/'}><a><button className={styles.button} type='button'>Back Home</button></a></Link>
            </div>
        </div>
      </div>: 'Loading...'}  
    </div>
  )
}

export default UserDashboard