import styles from './Banner.module.css';
import Image from 'next/image';


const Banner = ({title, subTitle, buttonName, imgUrl}) => {
  return (
    <div className={styles.bannerContainer} style={{backgroundImage: `url(${imgUrl})`}}>
      <h1 className={styles.header}>Chill'n Stream</h1>
      <div className={styles.bannerDetails}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subTitle}>{subTitle}</h3>
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.bannerButton}>{buttonName}</button>
        </div>
      </div>
    </div>
  )
}

export default Banner