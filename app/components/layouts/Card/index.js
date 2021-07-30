import React, { useEffect } from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { setDetailUser } from 'redux/user/userActions'
import styles from './styles.module.css'

function CardComponent(props) {
  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem('userDetail'))
    if (detail) {
      props.setDetailUser(detail)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Card className={styles.cardResponsive}>{props.children}</Card>
    </div>
  )
}

export default connect(null, { setDetailUser })(CardComponent)
