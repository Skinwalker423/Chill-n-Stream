import styles from './navBar.module.css';
import Image from 'next/image'
import { useState } from 'react';


const NavBar = ({logoUrl, username, avatarUrl, setExpand}) => {


  const handleUserInfo = () => {
    setExpand((bool) => !bool);
  }  

  return (
    <div className={styles.navContainer}>
        <div className={styles.leftWrapper}>
            <h1 className={styles.header}>Netflix</h1>
            <p>My List</p>
        </div>
        <button onClick={handleUserInfo} className={styles.userContainer}>
            <span className={styles.username}>{username}</span>
            <div className={styles.expandIconWrapper}>
                <Image src={avatarUrl} width={20} height={20} />  
            </div> 
        </button>
    </div>
  )
}

export default NavBar