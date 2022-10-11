import Image from 'next/image'
import styles from './card.module.css'

const Card = ({imgUrl, size}) => {


  return (
    <div className={styles.container} style={{...size}}>
        <Image src={imgUrl} width={size.width} height={size.height} />
        {/* <div
            className={styles.cardImg}
            style={{backgroundImage: `url(${imgUrl}`,
            }}
        >
        </div>
        <div>
            <h2>Title</h2>
            <button>Play</button>
        </div> */}

    </div>
  )
}

export default Card