import React from 'react'
import { Card } from 'antd'
import styles from './styles.module.css'

function CardComponent({ children }) {
  return (
    <div className={styles.container}>
      <Card className={styles.cardResponsive}>{children}</Card>
    </div>
  )
}

export default CardComponent
