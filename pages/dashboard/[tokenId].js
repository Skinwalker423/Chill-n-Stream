import React, {useEffect} from 'react'
import Head from 'next/head'
import { m } from '../../lib/magic-client'

const UserDashboard = () => {

    const getUserTokenId = async() => {
        const idToken = await m.user.getIdToken();
        console.log({idToken});
        return idToken;
    }

  useEffect(() => {
    
  }, [])

  return (
    <div>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="user info" />
        </Head>
        <div>
            <h1>Welcome to your Dashboard </h1>
            <p></p>
        </div>
    </div>
  )
}

export default UserDashboard