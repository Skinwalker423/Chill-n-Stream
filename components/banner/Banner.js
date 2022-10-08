import styles from './Banner.module.css';


const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <h2>Title</h2>
      <h3>Subtitle</h3>
      <button className={styles.bannerButton}>Play</button>
    </div>
  )
}

export default Banner