import React from 'react'
import TmsAdminHeader from 'components/modules/TmsAdminHeader'
import styles from './styles.module.css'

function TMSAdmin() {
  return (
    <div className={styles.tms_admin_container}>
      <TmsAdminHeader />
    </div>
  )
}

export default TMSAdmin
