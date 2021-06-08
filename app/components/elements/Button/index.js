import React from 'react'
import { Button } from 'antd'
import styles from './button.module.css'

function ButtonComponent() {
  return (
    <Button type="primary" className={styles.btn}>
      Primary Button
    </Button>
  )
}

export default ButtonComponent
