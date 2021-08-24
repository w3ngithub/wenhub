import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getLeaveDetail } from 'utils/commonFunctions'
import ButtonComponent from 'components/elements/Button'
import Loader from 'components/elements/Loader'
import { fetchLmsApproved, cancelLmsLeave } from 'redux/lms/lmsActions'
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
    const da = lmsApproved.map((x) => {
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
    setData(da)
  }, [lmsApproved])

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
        totalData={totalApproved}
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
  lmsData: { lmsApproved, totalApproved, lmsLoading },
  commonData: { leaveFields },
}) => ({
  lmsApproved,
  totalApproved,
  lmsLoading,
  leaveFields,
})

export default connect(mapStateToProps, { fetchLmsApproved, cancelLmsLeave })(
  Approved,
)
