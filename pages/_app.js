import '../styles/globals.css'
import { UserProvider } from '../store/userContext'
import { useEffect, useState } from 'react'
import { m } from '../lib/magic-client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

  //   useEffect(() => {
  //   const getUserLoginSatus = async() => {
  //     try{const isLoggedIn = await m.user.isLoggedIn();
  //     if(isLoggedIn){
  //       router.push('/');
  //     } else {
  //       router.push('/login');
  //     }
  //   }catch(err){
  //     console.error('could not validate login status');
  //     router.push('/login');
  //   }
  // }

  //   getUserLoginSatus();

  // },[])

  // useEffect(() => {

  //   const handleLoading = () => {
  //       setIsLoading(false);
  //   }

  //   router.events.on('routeChangeComplete', handleLoading);
  //   router.events.on('routeChangeError', handleLoading);

  //   return () => {
  //       router.events.off('routeChangeComplete', handleLoading);
  //       router.events.off('routeChangeError', handleLoading);
  //   }

  // },[router])


  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
