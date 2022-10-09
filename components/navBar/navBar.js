import styles from './navBar.module.css';
import Image from 'next/image'


const NavBar = () => {
  return (
    <div className={styles.navContainer}>
        <div className={styles.leftWrapper}>
            <h1 className={styles.header}>Netflix</h1>
            <p>My List</p>
        </div>
        <div>
            <Image src={'/favicon.ico'} width={25} height={25} />
        </div>
    </div>
  )
}

export default NavBar