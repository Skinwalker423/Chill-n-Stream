import Head from 'next/head'
import React, { useContext, useState, useEffect } from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { UserContext } from '../store/userContext'
import { useRouter } from 'next/router'
import { ACTION_TYPES } from '../store/userContext'
import Link from 'next/link'
import { m } from '../lib/magic-client'


const login = () => {

  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const router = useRouter();
  const {dispatch} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const handleLoading = () => {
        setIsLoading(false);
    }

    router.events.on('routeChangeComplete', handleLoading);
    router.events.on('routeChangeError', handleLoading);

    return () => {
        router.events.off('routeChangeComplete', handleLoading);
        router.events.off('routeChangeError', handleLoading);
    }

  },[router])

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    if(!email){
        setUserMessage('Enter a valid email');
        setIsLoading(false);
        return;
    }
    console.log('sign in start');
    try {
        const user = await m.auth.loginWithMagicLink({ email });
        if(!user){
            setIsLoading(false);
            setUserMessage('Could not authenticate');
        }

        const result = await fetch('/api/login',
            {
                method: "POST",
                headers: {
                    'conent-type': "application/json",
                    'Authorization': `Bearer ${user}`,
                    },
            }
        );

        const loggedInResponse = await result.json();
        if(loggedInResponse.done){
            dispatch({type: ACTION_TYPES.SET_USER, payload: {user, email}})
            router.push(`/`);
        } else {
            setIsLoading(false);
            setUserMessage('Problem logging in');
        }
    } catch(err) {
        console.log("error with magic link", err);
    }

  }

  const handleInputOnchange = (e) => {
    setUserMessage('');
    setEmail(e.target.value);
  }


  return (
    <div className={styles.container}>
        <Head>
            <title>Chill'n Stream Login</title>
            <meta name='description'  content='login page' />
        </Head>
        <header>
            <div className={styles.headerWrapper}>
                <Link href='/'>
                    <a className={styles.logoLink}>
                        <div className={styles.logoWrapper}>
                            <Image src={'/static/netflix.svg'} width={150} height={150} alt={'streaming logo'} />
                        </div>
                    </a>
                    
                </Link>
            </div>
        </header>
        <main>
            <form onSubmit={handleLoginSubmit} className={styles.formContainer}>
                <section className={styles.inputSection}>
                    <label className={styles.label} htmlFor="email">Sign In</label>
                    <input onChange={handleInputOnchange} value={email} className={styles.emailInput} type="email" id="email" name="email" placeholder='Email address' />
                    {userMessage && <p className={styles.userMessage}>{userMessage}</p>}
                </section>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button} disabled={isLoading} type="submit">{isLoading ? 'Loading...': 'Sign In'}</button>
                </div>
            </form>
            
        </main>
        
    </div>
  )
}

export default login