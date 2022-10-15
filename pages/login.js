import Head from 'next/head'
import React from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useRef } from 'react'

const login = () => {

  const emailRef = useRef();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('sign in start')
    console.log(emailRef.current.value);
  }


  return (
    <div className={styles.container}>
        <Head>
            <title>Login</title>
            <meta name='description'  content='login page' />
        </Head>
        <main>
            <div className={styles.logoWrapper}>
                <Image src={'/static/netflix.svg'} width={150} height={150} alt={'streaming logo'} />
            </div>
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