import React from 'react'
import ListTable from 'components/elements/Table'

const Users = () => {
  return (
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
          user: 'Rujal',
          joined_date: '17/12/2018',
          dob: '17/12/1994',
          review_date: '17/12/2019',
        },
        {
          key: '2',
          user: 'Ujjwal',
          joined_date: '17/12/2019',
          dob: '17/12/1993',
          review_date: '17/12/2019',
        },
      ]}
    />
  )
}

export default Users
