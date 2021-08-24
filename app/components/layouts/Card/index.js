import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { setDetailUser } from 'redux/user/userActions'
import styles from './styles.module.css'

function CardComponent(props) {
  return (
    <div className={styles.container}>
      <Card className={styles.cardResponsive}>{props.children}</Card>
    </div>
  )
}

export default connect(null, { setDetailUser })(CardComponent)
