import React from 'react'
import styles from './styles.module.scss'

function Loader() {
  return (
    <div className={styles.book}>
      <div className={styles.book__page}></div>
      <div className={styles.book__page}></div>
      <div className={styles.book__page}></div>
    </div>
  )
}

export default Loader
