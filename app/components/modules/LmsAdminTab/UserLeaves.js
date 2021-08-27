import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
// import { Pagination } from 'antd'
import Loader from 'components/elements/Loader'
import ListTable from 'components/elements/Table'
import styles from './styles.module.css'

const UserLeaves = () => {
  const { allUsersLeavesRemaining, lmsLoading } = useSelector(
    (state) => state.lmsData,
    shallowEqual,
  )

  // const [page, setPage] = useState(1)
  // const [perPage, setPerPage] = useState(20)
  return (
    <>
      <div className={styles.responsiveLmsAdminTable}>
        <ListTable
          loading={{ spinning: lmsLoading, indicator: <Loader /> }}
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
          data={
            allUsersLeavesRemaining?.map((user) => ({
              key: user.user_name,
              user: user.user_name,
              remaining: user.leaves_remaining_days,
            })) || []
          }
        />
      </div>
      {/* <div style={{ marginTop: 25 }}></div>
      <Pagination
        current={page}
        total={100}
        showSizeChanger
        pageSize={perPage}
        pageSizeOptions={[10, 20, 30]}
        onChange={(pageNo, perPageNo) => {
          setPage(pageNo)
          setPerPage(perPageNo)
        }}
        defaultPageSize={10}
        responsive
        hideOnSinglePage
      />
      <div style={{ marginTop: 25 }}></div> */}
    </>
  )
}

export default UserLeaves
