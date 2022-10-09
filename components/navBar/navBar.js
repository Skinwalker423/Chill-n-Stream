import styles from './navBar.module.css';
import Image from 'next/image'
import { useState } from 'react';


const NavBar = ({logoUrl, username, avatarUrl}) => {

  const [expand, setExpand] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserInfo = () => {
    setExpand((bool) => !bool);
  }
  const handleSignOut = () => {
    console.log('logging off');
    setUser(null);
    setExpand((bool) => !bool);
    
  }

  const handleSignIn = () => {
    setUser('423@gmail.com')
  }
  
  

  return (
    <div className={styles.navContainer}>
        <div className={styles.leftWrapper}>
            <h1 className={styles.header}>Netflix</h1>
            <p>My List</p>
        </div>
        <nav>
            <div>
                {user ? <button onClick={handleUserInfo} className={styles.userContainer}>
                    <span className={styles.username}>{username}</span>
                    <div className={styles.expandIconWrapper}>
                        <Image src={avatarUrl} width={20} height={20} />  
                    </div> 
                </button> : <button className={styles.signInButton} onClick={handleSignIn}>Sign In</button>}
                {user && expand && <button onClick={handleSignOut} type='button' className={styles.accountDetails}>Sign Out</button>}
            </div>
            
        </nav>
    </div>
  )
}

export default NavBar