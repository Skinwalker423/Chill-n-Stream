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
    <div className={styles.container}>
        <div className={styles.leftWrapper}>
            <a href='/' className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                Netflix
              </div>
            </a>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>Home</li>
              <li className={styles.navItem}>My List</li>
            </ul>
        </div>
        <nav className={styles.navContainer}>
            <div>
                {user ? <button onClick={handleUserInfo} className={styles.usernameBtn}>
                    <p className={styles.username}>{username}</p>
                    <div className={styles.expandIconWrapper}>
                        <Image src={avatarUrl} width={20} height={20} />  
                    </div> 
                </button> : <button className={styles.signInButton} onClick={handleSignIn}>Sign In</button>}
                {user && expand && <div className={styles.navDropdown}><button className={styles.signOutButton} onClick={handleSignOut} type='button' >Sign Out</button></div>}
            </div>
            
        </nav>
    </div>
  )
}

export default NavBar