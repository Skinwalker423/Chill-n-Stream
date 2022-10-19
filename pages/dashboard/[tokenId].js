import React, {useEffect, useContext, useState} from 'react'
import Head from 'next/head'
import { m } from '../../lib/magic-client';
import Link from 'next/link';
import { UserContext } from '../../store/userContext';
import { useRouter } from 'next/router';
import styles from './[tokenId].module.css';
import Loader from '../../components/Loader/Loader';

const UserDashboard = () => {

    const router = useRouter();
    const {state, dispatch, isLoading} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

  return (
    <div>

      {!isLoading ? <div>
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
      </div>: <Loader />}  
    </div>
  )
}

export default UserDashboard