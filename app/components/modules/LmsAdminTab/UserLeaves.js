import ListTable from 'components/elements/Table'
import React from 'react'
import styles from './styles.module.css'

const UserLeaves = () => (
  <div className={styles.responsiveLmsAdminTable}>
    <ListTable
      columns={[
        {
          title: 'Users',
          keyIndex: 'user',
        },
        {
          title: 'Days Remaining',
          keyIndex: 'remaining',
        },
      ]}
      data={[
        {
          key: '1',
          user: 'Rujal',
          remaining: 12,
        },
        {
          key: '2',
          user: 'Ujjwal',
          remaining: 12,
        },
      ]}
    />
  </div>
)

export default UserLeaves
