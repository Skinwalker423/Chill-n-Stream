import styles from './navBar.module.css';
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../store/userContext';
import { ACTION_TYPES } from '../../store/userContext';
import { m } from '../../lib/magic-client';



const NavBar = () => {

  const [expandDropdown, setExpandDropdown] = useState(false);
  const {state, dispatch} = useContext(UserContext);
  const [didToken, setDidToken] = useState('');

  const router = useRouter();

  useEffect(() => {
    const getTokenFromCookies = async() => { 
      try {
        const didTokenResponse = await m.user.getIdToken();
        if (didTokenResponse) {
          setDidToken(didTokenResponse);
        }
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    }

    getTokenFromCookies();
  }, []);


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
  const handleSignOut = async() => {
    console.log('logging off');
    try {
      
      const result = await fetch('/api/logout',
            {
                method: "POST",
                headers: {
                    'conent-type': "application/json",
                    'Authorization': `Bearer ${didToken}`,
                    },
            }
        );
  
      dispatch({type: ACTION_TYPES.SIGN_OUT})
      setExpandDropdown(false);
      router.push('/login');


    } catch(err) {
      console.error('something went wrong logging off', err);
      router.push('/login');
    }
    
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
              <Link href={'/'} ><a><li className={styles.navItem}>Home</li></a></Link>
              <li onClick={handleMyList} className={styles.navItem}>My List</li>
            </ul>
        </div>
        <nav className={styles.navContainer}>
                {state.email && <button onClick={handleUserInfo} className={styles.usernameBtn}>
                    <p className={styles.username}>{state.email}</p>
                    <div className={styles.expandIconWrapper}>
                        <Image src={"https://img.icons8.com/small/16/FFFFFF/expand-arrow.png"} width={20} height={20} />  
                    </div> 
                </button>}
                {state.user && expandDropdown && 
                  <ul className={styles.navDropdown}>
                    <li className={styles.dropDownItem}>
                      <button className={styles.signOutButton} onClick={handleSignOut} type='button' >Sign Out</button>
                    </li>
                    <li className={styles.dropDownItem}>
                      <Link href={`/dashboard/${state.user}`}><a>Dashboard</a></Link>
                    </li>
                  </ul>}
        </nav>
    </div>
  )
}

export default NavBar