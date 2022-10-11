import styles from './navBar.module.css';
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


const NavBar = ({logoUrl, username, avatarUrl}) => {

  const [expand, setExpand] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const handleHome = (e) => {
    e.preventDefault();
    console.log('routing home');
    router.push('/');
  }

  const handleMyList = (e) => {
    e.preventDefault();
    console.log('routing to my list');
    router.push('/browse/my-list');
  }

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
            <Link href='/' ><a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                Netflix
              </div>
              </a>
            </Link>
            <ul className={styles.navItems}>
              <li onClick={handleHome} className={styles.navItem}>Home</li>
              <li onClick={handleMyList} className={styles.navItem}>My List</li>
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