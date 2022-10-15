import styles from './navBar.module.css';
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../store/userContext';
import { ACTION_TYPES } from '../../store/userContext';


const NavBar = ({logoUrl, username, avatarUrl}) => {

  const [expandDropdown, setExpandDropdown] = useState(false);
  // const [user, setUser] = useState(false);
  const {state, dispatch} = useContext(UserContext);

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
    setExpandDropdown((bool) => !bool);
  }
  const handleSignOut = () => {
    console.log('logging off');
    dispatch({type: ACTION_TYPES.SIGN_OUT})
    setExpandDropdown(false);
    
  }
 

  return (
    <div className={styles.container}>
        <div className={styles.leftWrapper}>
            <Link href='/' ><a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image src={'/static/netflix.svg'} width={150} height={150} alt={'streaming logo'} />
              </div>
              </a>
            </Link>
            <ul className={styles.navItems}>
              <li onClick={handleHome} className={styles.navItem}>Home</li>
              <li onClick={handleMyList} className={styles.navItem}>My List</li>
            </ul>
        </div>
        <nav className={styles.navContainer}>
                {state.user ? <button onClick={handleUserInfo} className={styles.usernameBtn}>
                    <p className={styles.username}>{state.user}</p>
                    <div className={styles.expandIconWrapper}>
                        <Image src={"https://img.icons8.com/small/16/FFFFFF/expand-arrow.png"} width={20} height={20} />  
                    </div> 
                </button> : <Link href={'/login'}><a className={styles.signInButton}>Sign In</a></Link>}
                {state.user && expandDropdown && <div className={styles.navDropdown}><button className={styles.signOutButton} onClick={handleSignOut} type='button' >Sign Out</button></div>}
        </nav>
    </div>
  )
}

export default NavBar