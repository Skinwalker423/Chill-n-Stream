import React from 'react'
import styles from './SectionCards.module.css'
import Card from './card'
import { classMap } from './card'

const SectionCards = ({section = 'Section', moviesArray, size }) => {
  return (
    <section className={styles.container}>
        <h2 className={styles.title}>{section}</h2>
        <div className={styles.cardListContainer}>
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
            <Card imgUrl={'/static/clifford.webp'} size={size} />
        </div>
    </section>
  )
}

export default SectionCards