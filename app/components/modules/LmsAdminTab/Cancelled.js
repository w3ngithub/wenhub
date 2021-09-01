import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchLmsCancelled } from 'redux/lms/lmsActions'
import { getLeaveDetail } from 'utils/commonFunctions'
import { lmsAdminConstants } from 'constants/lmsAdminConstants'
import ButtonComponent from 'components/elements/Button'
import Loader from 'components/elements/Loader'
import PaginateTable from '../PaginateTable'
import ModalDetail from '../ModalDetail'
import styles from './styles.module.css'

const Cancelled = ({
  lmsCancelled,
  totalCancelled,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
  ...props
}) => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState({ pageNo: 1, postPerPage: 10 })
  const [data, setData] = useState([])
  useEffect(() => {
    const da = !isLeaveFiltered
      ? lmsCancelled?.map((x) => {
          const dates = x?.meta?.leave_dates?.map((d) => (
            <p key={d?.id}>{moment(d?.leave_date).format('YYYY-MM-DD')}</p>
          ))
          const leaveType = leaveFields?.leave_type.find((y) =>
            x?.leave_type?.includes(y.id),
          )
          // eslint-disable-next-line dot-notation
          const applicant = x['_embedded']?.author[0]?.name

          return {
            key: x?.id,
            applicant,
            dates,
            leave_type: leaveType?.name,
            action: (
              <div style={{ display: 'flex', gap: 5 }}>
                <ButtonComponent
                  btnText="View Details"
                  className={styles.viewButton}
                  onClick={() =>
                    handleDetailModal({
                      ...getLeaveDetail(x, dates, leaveType, applicant),
                      cancel_message: x?.meta?.leave_cancelled_message,
                    })
                  }
                />
              </div>
            ),
          }
        })
      : filteredLeaves
          ?.filter((x) => x.status === 'Cancelled')
          ?.map((x) => {
            const dates = x?.leave_dates?.map((d) => (
              <p key={d}>{moment(d).format('YYYY-MM-DD')}</p>
            ))

            // eslint-disable-next-line dot-notation
            const applicant = x?.applicant_name

            return {
              key: x?.leave_id,
              applicant,
              dates,
              leave_type: x?.leave_type,
              action: (
                <div style={{ display: 'flex', gap: 5 }}>
                  <ButtonComponent
                    btnText="View Details"
                    className={styles.viewButton}
                    onClick={() =>
                      handleDetailModal({
                        ...getLeaveDetail(
                          x,
                          dates,
                          x?.leave_type,
                          applicant,
                          isLeaveFiltered,
                        ),
                        cancel_message: x?.leave_cancelled_message,
                      })
                    }
                  />
                </div>
              ),
            }
          })
    setData(da)
  }, [lmsCancelled, isLeaveFiltered, filteredLeaves])

  const handleDetailModal = (d) => {
    if (showDetail) {
      setShowDetail(false)
      setDetail({})
    } else {
      setShowDetail(true)
      setDetail(d)
    }
  }

  const handlePagination = (p, s) => {
    setPage({ pageNo: p, postPerPage: s })
    props.fetchLmsCancelled(p, s)
  }

  return (
    <>
      <PaginateTable
        columns={lmsAdminConstants}
        data={data}
        handlePagination={handlePagination}
        loading={{ spinning: lmsLoading, indicator: <Loader /> }}
        currentPage={page.pageNo}
        postPerPage={page.postPerPage}
        totalData={isLeaveFiltered ? 0 : totalCancelled}
      />
      <ModalDetail
        title="Cancelled Leave Details"
        visible={showDetail}
        detail={detail}
        handleCancel={() => setShowDetail(false)}
        columns={[
          { title: 'Applicant', keyIndex: 'applicant' },
          { title: 'Reason', keyIndex: 'reason' },
          { title: 'Dates', keyIndex: 'dates' },
          { title: 'Leave Type', keyIndex: 'leave_type' },
          { title: 'Cancel Message', keyIndex: 'cancel_message' },
          { title: 'Team Leads', keyIndex: 'team_leads' },
        ]}
        footer={[
          <ButtonComponent
            key="Close"
            btnText="Close"
            onClick={() => setShowDetail(false)}
            className={styles.closeButton}
            style={{ color: 'black' }}
          />,
        ]}
      />
    </>
  )
}

const mapStateToProps = ({
  lmsData: {
    lmsCancelled,
    totalCancelled,
    lmsLoading,
    isLeaveFiltered,
    filteredLeaves,
  },
  commonData: { leaveFields },
}) => ({
  lmsCancelled,
  totalCancelled,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
})

export default connect(mapStateToProps, { fetchLmsCancelled })(Cancelled)
