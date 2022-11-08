import React from 'react'
import styles from './SectionCards.module.css'
import Card from './card'
import Link from 'next/link'

const SectionCards = ({section = 'Section', moviesArray = [], size, shouldWrap = false }) => {


  return (
    <section className={styles.container}>
        <h2 className={styles.title}>{section}</h2>
        <div className={shouldWrap ? styles.myListCardContainer : styles.cardListContainer}>
            {moviesArray.map((movie) => {

              return(
                <Link href={`/video/${movie.id.videoId || movie.id}`  } passHref key={movie.id.videoId || movie.id}><a><Card disableScale={shouldWrap} size={size} imgUrl={movie.imgUrl} key={movie.id.videoId || movie.id} /></a></Link>
              )
            })}
        </div>
    </section>
  )
}

export default SectionCards