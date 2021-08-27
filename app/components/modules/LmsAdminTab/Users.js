import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import ListTable from 'components/elements/Table'
import useDidMountEffect from 'hooks/useDidMountEffect'
import { allUserFetch } from 'redux/lms/lmsActions'
import Loader from 'components/elements/Loader'
import { Pagination } from 'antd'
import styles from './styles.module.css'

const Users = () => {
  const { allUsers, allUsersTotal, lmsLoading } = useSelector(
    (state) => state.lmsData,
    shallowEqual,
  )
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  useDidMountEffect(() => {
    dispatch(allUserFetch(perPage, page))
  }, [page, perPage])
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
          data={
            allUsers?.map((user) => ({
              key: user?.id,
              user: user?.name,
              joined_date:
                user?.meta?.user_joined_date &&
                moment(user?.meta?.user_joined_date, 'YYYYMMDD').format(
                  'YYYY-MM-DD',
                ),
              dob:
                user?.meta?.user_date_of_birth &&
                moment(user?.meta?.user_date_of_birth, 'YYYYMMDD').format(
                  'YYYY-MM-DD',
                ),
              review_date:
                user?.meta?.user_review_date &&
                moment(user?.meta?.user_review_date, 'YYYYMMDD').format(
                  'YYYY-MM-DD',
                ),
            })) || []
          }
        />
      </div>
      <div style={{ marginTop: 25 }}></div>
      <Pagination
        current={page}
        total={allUsersTotal}
        showSizeChanger
        pageSize={perPage}
        pageSizeOptions={[5, 10, 20]}
        onChange={(pageNo, perPageNo) => {
          setPage(pageNo)
          setPerPage(perPageNo)
        }}
        defaultPageSize={10}
        responsive
        hideOnSinglePage
      />
      <div style={{ marginTop: 25 }}></div>
    </>
  )
}

export default Users
