import '../styles/globals.css'
import { UserProvider } from '../store/userContext'
import { useEffect, useState } from 'react'
import { m } from '../lib/magic-client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter();


  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
