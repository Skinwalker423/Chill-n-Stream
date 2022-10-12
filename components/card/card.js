import Image from 'next/image'
import styles from './card.module.css'

const classMap = {
  'small': styles.smItem,
  'medium': styles.mdItem,
  'large': styles.lgItem,

}


const Card = ({imgUrl, size}) => {

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image className={styles.cardImg} layout='fill' src={imgUrl} alt={'pic of movie'}/>
      </div>
    </div>
  )
}

export default Card