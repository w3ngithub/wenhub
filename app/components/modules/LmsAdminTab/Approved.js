import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getLeaveDetail } from 'utils/commonFunctions'
import ButtonComponent from 'components/elements/Button'
import Loader from 'components/elements/Loader'
import {
  fetchLmsApproved,
  cancelLmsLeave,
  filteredLeaveFetch,
} from 'redux/lms/lmsActions'
import { lmsAdminConstants } from 'constants/lmsAdminConstants'
import styles from './styles.module.css'
import ModalDetail from '../ModalDetail'
import MessageModal from '../MessageModal'
import PaginateTable from '../PaginateTable'

const Approved = ({
  lmsApproved,
  totalApproved,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
  lmsAdminForm,
  ...props
}) => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [messageModal, setShowMessageModal] = useState({
    leaveId: '',
    status: false,
  })
  const [reasonText, setReasonText] = useState('')
  const [page, setPage] = useState({ pageNo: 1, postPerPage: 10 })
  const [data, setData] = useState([])

  useEffect(() => {
    const da = !isLeaveFiltered
      ? lmsApproved?.map((x) => {
          const dates = x?.meta?.leave_dates.map((d) => (
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
                      approve_message: x?.meta?.leave_approved_message,
                    })
                  }
                />
                <ButtonComponent
                  btnText="Cancel"
                  className={styles.cancelButton}
                  onClick={() => handleCancel(x?.id)}
                />
              </div>
            ),
          }
        })
      : filteredLeaves
          ?.filter((x) => x.status === 'Approved')
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
                        approve_message: x?.leave_approved_message,
                      })
                    }
                  />
                  <ButtonComponent
                    btnText="Cancel"
                    className={styles.cancelButton}
                    onClick={() => handleCancel(x?.leave_id)}
                  />
                </div>
              ),
            }
          })
    setData(da)
  }, [lmsApproved, isLeaveFiltered, filteredLeaves])

  const handleDetailModal = (d) => {
    if (showDetail) {
      setShowDetail(false)
      setDetail({})
    } else {
      setShowDetail(true)
      setDetail(d)
    }
  }

  const handleCloseModal = () => {
    setReasonText('')
    setShowMessageModal({ leaveId: '', status: false })
  }

  const handleCancel = (id) => {
    setShowDetail(false)
    setShowMessageModal({ leaveId: id, status: true })
  }

  const handleCancelLeave = async () => {
    if (reasonText.length > 0) {
      await props.cancelLmsLeave(messageModal.leaveId, {
        meta: {
          leave_cancelled_message: reasonText,
        },
        leave_status: [152],
      })
      if (isLeaveFiltered) await props.filteredLeaveFetch(lmsAdminForm)
      handleCloseModal()
    }
  }

  const handlePagination = (p, s) => {
    setPage({ pageNo: p, postPerPage: s })
    props.fetchLmsApproved(p, s)
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
        totalData={isLeaveFiltered ? 0 : totalApproved}
      />
      <ModalDetail
        title="Approved Leave Detail"
        visible={showDetail}
        detail={detail}
        handleCancel={() => setShowDetail(false)}
        columns={[
          { title: 'Applicant', keyIndex: 'applicant' },
          { title: 'Reason', keyIndex: 'reason' },
          { title: 'Dates', keyIndex: 'dates' },
          { title: 'Leave Type', keyIndex: 'leave_type' },
          { title: 'Approve Message', keyIndex: 'approve_message' },
          { title: 'Team Leads', keyIndex: 'team_leads' },
        ]}
        footer={[
          <ButtonComponent
            key="cancel"
            btnText="Cancel"
            className={styles.cancelButton}
            onClick={() => handleCancel(detail.key)}
          />,
          <ButtonComponent
            key="close"
            btnText="Close"
            onClick={handleDetailModal}
            className={styles.closeButton}
            style={{ color: 'black' }}
          />,
        ]}
      />
      <MessageModal
        loading={lmsLoading}
        title="Cancel Leave"
        bodyText="Reason For Cancelling Leave"
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal.status}
        handleCancel={handleCloseModal}
        footer={[
          <ButtonComponent
            key="cancel_leave"
            btnText="Cancel Leave"
            className={styles.cancelButton}
            onClick={handleCancelLeave}
          />,
          <ButtonComponent
            key="close_leave"
            btnText="Close"
            className={styles.closeButton}
            style={{ color: 'black' }}
            onClick={handleCloseModal}
          />,
        ]}
      />
    </>
  )
}

const mapStateToProps = ({
  lmsData: {
    lmsApproved,
    totalApproved,
    lmsLoading,
    isLeaveFiltered,
    filteredLeaves,
    lmsAdminForm,
  },
  commonData: { leaveFields },
}) => ({
  lmsApproved,
  totalApproved,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
  lmsAdminForm,
})

export default connect(mapStateToProps, {
  fetchLmsApproved,
  cancelLmsLeave,
  filteredLeaveFetch,
})(Approved)
