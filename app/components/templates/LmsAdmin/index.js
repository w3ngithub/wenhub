import React, { useState } from 'react'
import { Row, Col } from 'antd'
import LmsAdminForm from 'components/modules/LmsAdminForm'
import LmsAdminTab from 'components/modules/LmsAdminTab'
import styles from './style.module.css'

const LmsAdmin = () => {
  const [tabKey, setKey] = useState('')
  return (
    <Row>
      <Col span={24}>
        <div className={styles.lmsAdminDashboard}>
          {tabKey === '1' || tabKey === '2' || tabKey === '3' ? (
            <div className={styles.lmsAdminSearch}>
              <LmsAdminForm />
            </div>
          ) : null}
          <div className={styles.lmsAdminTab}>
            <LmsAdminTab getKey={(key) => setKey(key)} />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default LmsAdmin
