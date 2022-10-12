import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './card.module.css'
import {motion} from 'framer-motion'
import cls from 'classnames'

export const classMap = {
  'small': styles.smItem,
  'medium': styles.mdItem,
  'large': styles.lgItem,

}


const Card = ({imgUrl = 'https://images.unsplash.com/photo-1554403333-39f4efbcdaf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1884&q=80', size = 'medium'}) => {

  const [imgSrc, setImgSrc] = useState(imgUrl);

  useEffect(() => {
    setImgSrc(imgUrl);
  }, [imgUrl])


  const handleError = () => {
    setImgSrc('https://images.unsplash.com/photo-1554403333-39f4efbcdaf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1884&q=80');
  }

  return (
    <div className={styles.container}>
      <motion.div className={cls(styles.imgMotionWrapper, size)} whileHover={{scale: 1.125}}>
        <Image 
          placeholder='blur' 
          blurDataURL='/static/netflix.svg' 
          className={styles.cardImg} 
          layout='fill' src={imgSrc} 
          alt={'pic of movie'}
          onError={handleError}
          />
      </motion.div>
    </div>
  )
}

export default Card