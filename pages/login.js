import Head from 'next/head'
import React, { useRef, useContext } from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { UserContext } from '../store/userContext'
import { useRouter } from 'next/router'
import { ACTION_TYPES } from '../store/userContext'
import Link from 'next/link'

const login = () => {

  const emailRef = useRef();
  const route = useRouter();
  const {state, dispatch} = useContext(UserContext)

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('sign in start')
    console.log(emailRef.current.value);
    dispatch({type: ACTION_TYPES.SET_USER, payload: emailRef.current.value})
    route.push('/');
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
                    <input ref={emailRef} className={styles.emailInput} type="email" id="email" name="email" placeholder='Email address' />
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