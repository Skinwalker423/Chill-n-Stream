import React from 'react'
import styles from './SectionCards.module.css'
import Card from './card'
import { classMap } from './card'

const SectionCards = ({section = 'Section', moviesArray = [], size }) => {


  return (
    <section className={styles.container}>
        <h2 className={styles.title}>{section}</h2>
        <div className={styles.cardListContainer}>
            {moviesArray.map((movie) => {

              return(
                <Card size={size} imgUrl={movie.imgUrl} key={movie.id} />
              )
            })}
        </div>
    </section>
  )
}

export default SectionCards