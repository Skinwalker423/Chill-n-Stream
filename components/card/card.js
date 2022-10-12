import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './card.module.css'

export const classMap = {
  'small': styles.smItem,
  'medium': styles.mdItem,
  'large': styles.lgItem,

}


const Card = ({imgUrl, size = 'medium'}) => {

  const [imgSrc, setImgSrc] = useState(imgUrl);

  useEffect(() => {
    setImgSrc(imgUrl);
  }, [imgUrl])

  const handleError = () => {
    setImgSrc('/static/netflix.svg');
  }

  return (
    <div className={styles.container}>
      <div className={size}>
        <Image 
          placeholder='blur' 
          blurDataURL='/static/netflix.svg' 
          className={styles.cardImg} 
          layout='fill' src={imgSrc} 
          alt={'pic of movie'}
          onError={handleError}
          />
      </div>
    </div>
  )
}

export default Card