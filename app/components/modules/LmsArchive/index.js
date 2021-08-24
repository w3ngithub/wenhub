import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'components/elements/Select'
import { fetchLmsArchives } from 'redux/lms/lmsActions'
import HTMLReactParser from 'html-react-parser'
import moment from 'moment'
import Loader from 'components/elements/Loader'
import useDidMountEffect from 'hooks/useDidMountEffect'
import PaginateTable from '../PaginateTable'
import styles from './styles.module.css'

function LmsArchive({
  archiveTypes,
  lmsLoading,
  archives,
  totalArchives,
  userDetail,
  leaveFields,
  ...props
}) {
  const [archive, setArchive] = useState({})
  const [page, setPage] = useState({ pageNo: 1, perPage: 10 })

  useDidMountEffect(
    () =>
      props.fetchLmsArchives(
        userDetail.user_id,
        page.pageNo,
        page.perPage,
        archive.value,
      ),
    [archive, page],
  )

  const data = archives.map((x) => {
    const dates = x?.meta?.leave_dates.map((d) => (
      <p key={d?.id}>{moment(d?.leave_date).format('YYYY-MM-DD')}</p>
    ))
    const leaveType = leaveFields?.leave_type.find((y) =>
      x?.leave_type?.includes(y.id),
    )

    return {
      key: x.id,
      dates,
      leave_type: leaveType?.name,
      reason: HTMLReactParser(x?.content?.rendered),
    }
  })

  return (
    <div className={styles.lsm_archive_container}>
      <div className={styles.archive_filter}>
        <label htmlFor="view_archive">View Archive</label>
        <Select
          id="view_archive"
          value={archive}
          placeholder="Select From Past Archive"
          options={archiveTypes.map((x) => ({
            label: x.name,
            value: x.id,
          }))}
          onChange={(e) => setArchive(e)}
        />
      </div>
      {archive.value && (
        <div className={styles.archive_table}>
          <PaginateTable
            handlePagination={(pageNo, perPage) => setPage({ pageNo, perPage })}
            postPerPage={page.perPage}
            currentPage={page.pageNo}
            loading={{ spinning: lmsLoading, indicator: <Loader /> }}
            columns={[
              { keyIndex: 'dates', title: 'Dates' },
              { keyIndex: 'leave_type', title: 'Leave Type' },
              { keyIndex: 'reason', title: 'Reason' },
            ]}
            data={data}
            totalData={totalArchives}
          />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({
  lmsData: { archiveTypes, lmsLoading, archives, totalArchives },
  userData: { userDetail },
  commonData: { leaveFields },
}) => ({
  archiveTypes,
  lmsLoading,
  archives,
  totalArchives,
  userDetail,
  leaveFields,
})

export default connect(mapStateToProps, { fetchLmsArchives })(LmsArchive)
