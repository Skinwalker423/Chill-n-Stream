import styles from './Banner.module.css';
import Image from 'next/image';


const Banner = ({title, subTitle, buttonName, imgUrl}) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerDetails}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
              <p className={styles.firstLetter}>N</p>
              <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.buttonWrapper}>
            <button type='button' className={styles.bannerButton}><span className={styles.buttonNameWrapper}><Image src={'/static/play-arrow.svg'} width={35} height={35} alt='Play Icon' />{buttonName}</span></button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  )
}

export default Banner