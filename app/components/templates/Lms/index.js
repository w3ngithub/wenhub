import React, { useState } from 'react'
import classNames from 'classnames'
import { Alert } from 'antd'
import Tabs from 'components/elements/Tabs'
import { shallowEqual, useSelector } from 'react-redux'
import Apply from 'components/modules/LmsApply'
import History from 'components/modules/LmsHistory'
import Archive from 'components/modules/LmsArchive'
import FAQ from './LmsFaq'
import styles from './styles.module.css'

function Lms({ leaveFields }) {
  const [alertVisible, setAlertVisible] = useState(false)

  const { userLeaveDaysApplied, userLeaveDaysRemaning } = useSelector(
    (state) => state.lmsData,
    shallowEqual,
  )

  return (
    <div className={styles.lms_container}>
      <div className={styles.leave_days_detail}>
        <h4
          className={classNames(
            styles.leave_days_item,
            styles.leave_days_remaining,
          )}
        >
          Leave Days Remaining: {userLeaveDaysRemaning}
        </h4>
        <h4
          className={classNames(
            styles.leave_days_item,
            styles.leave_days_applied,
          )}
        >
          Leave Days Applied: {userLeaveDaysApplied}
        </h4>
      </div>
      {alertVisible && (
        <Alert
          message="Application has been sent"
          type="success"
          showIcon
          closable
          afterClose={() => setAlertVisible(false)}
        />
      )}
      <div className={styles.tab_container}>
        <Tabs
          type="card"
          tabBarStyle={{
            background: '#fff',
            width: 'auto',
            overFlowX: 'scroll',
            whiteSpace: 'nowrap',
          }}
          tabs={[
            {
              id: '1',
              tab: 'Apply',
              content: <Apply setAlertVisible={setAlertVisible} />,
            },
            {
              id: '2',
              tab: 'History',
              content: <History leaveFields={leaveFields} />,
            },
            { id: '3', tab: 'FAQ', content: <FAQ /> },
            { id: '4', tab: 'Archive', content: <Archive /> },
          ]}
          getKey={() => {}}
        />
      </div>
    </div>
  )
}

export default Lms
