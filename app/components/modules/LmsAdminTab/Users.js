import React from 'react'
import ListTable from 'components/elements/Table'
import styles from './styles.module.css'

const Users = () => (
  <div className={styles.responsiveLmsAdminTable}>
    <ListTable
      columns={[
        {
          title: 'Users',
          keyIndex: 'user',
        },
        {
          title: 'Joined Date',
          keyIndex: 'joined_date',
        },
        {
          title: 'Date of Birth',
          keyIndex: 'dob',
        },
        {
          title: 'Review Date',
          keyIndex: 'review_date',
        },
      ]}
      data={[
        {
          key: '1',
          user: 'Rujal Sapkota',
          joined_date: '17/12/2018',
          dob: '17/12/1994',
          review_date: '17/12/2019',
        },
        {
          key: '2',
          user: 'Ujjwal Chaulagain',
          joined_date: '17/12/2019',
          dob: '17/12/1993',
          review_date: '17/12/2019',
        },
      ]}
    />
  </div>
)

export default Users
