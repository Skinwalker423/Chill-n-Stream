import Head from 'next/head'
import React, { useRef, useContext, useState } from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { UserContext } from '../store/userContext'
import { useRouter } from 'next/router'
import { ACTION_TYPES } from '../store/userContext'
import Link from 'next/link'
import { m } from '../lib/magic-client'

console.log(m);


const login = () => {

  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const router = useRouter();
  const {state, dispatch} = useContext(UserContext)

  const handleLoginSubmit = async(e) => {
    e.preventDefault();

    if(!email){
        setUserMessage('Enter a valid email');
        return;
    }
    console.log('sign in start');
    try {
        await m.auth.loginWithMagicLink({ email: email });
    } catch(err) {
        console.log("error with magic link", err);
    }
    dispatch({type: ACTION_TYPES.SET_USER, payload: email})
    router.push('/');
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
                    <button className={styles.button} type="submit">Sign In</button>
                </div>
            </form>
            
        </main>
        
    </div>
  )
}

export default login