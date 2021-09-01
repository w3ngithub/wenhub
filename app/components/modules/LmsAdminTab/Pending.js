import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getLeaveDetail } from 'utils/commonFunctions'
import ButtonComponent from 'components/elements/Button'
import {
  lmsAdminConstants,
  pendingLeaveDetailColumns,
} from 'constants/lmsAdminConstants'
import Loader from 'components/elements/Loader'
import {
  fetchLmsPending,
  cancelLmsLeave,
  approveLmsLeave,
  filteredLeaveFetch,
} from 'redux/lms/lmsActions'
import MessageModal from '../MessageModal'
import ModalDetail from '../ModalDetail'
import styles from './styles.module.css'
import PaginateTable from '../PaginateTable'

const defaultPage = { pageNo: 1, postPerPage: 10 }

const Pending = ({
  lmsPending,
  totalPending,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
  lmsAdminForm,

  ...props
}) => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [messageModal, setShowMessageModal] = useState(false)
  const [reasonText, setReasonText] = useState('')
  const [leaveAction, setLeaveAction] = useState({ id: '', action: '' })
  const [page, setPage] = useState(defaultPage)
  const [data, setData] = useState([])

  useEffect(() => {
    const da = !isLeaveFiltered
      ? lmsPending.map((x) => {
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
                    handleDetailModal(
                      getLeaveDetail(x, dates, leaveType, applicant),
                    )
                  }
                />
                <ButtonComponent
                  btnText="Approve"
                  className={styles.approveButton}
                  onClick={() => handleApproveCancel(x?.id, 'approve')}
                />
                <ButtonComponent
                  btnText="Cancel"
                  className={styles.cancelButton}
                  onClick={() => handleApproveCancel(x?.id, 'cancel')}
                />
              </div>
            ),
          }
        })
      : filteredLeaves
          ?.filter((x) => x.status === 'Pending')
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
                      handleDetailModal(
                        getLeaveDetail(
                          x,
                          dates,
                          x?.leave_type,
                          applicant,
                          isLeaveFiltered,
                        ),
                      )
                    }
                  />
                  <ButtonComponent
                    btnText="Approve"
                    className={styles.approveButton}
                    onClick={() => handleApproveCancel(x?.leave_id, 'approve')}
                  />
                  <ButtonComponent
                    btnText="Cancel"
                    className={styles.cancelButton}
                    onClick={() => handleApproveCancel(x?.leave_id, 'cancel')}
                  />
                </div>
              ),
            }
          })
    setData(da)
  }, [lmsPending, isLeaveFiltered, filteredLeaves])

  const handleDetailModal = (d) => {
    if (showDetail) {
      setShowDetail(false)
      setDetail({})
    } else {
      setShowDetail(true)
      setDetail(d)
    }
  }

  const handleApproveCancel = (id, action) => {
    setShowDetail(false)
    setShowMessageModal(true)
    setLeaveAction({ id, action })
  }

  const handleCloseModal = () => {
    setReasonText('')
    setShowMessageModal(false)
    setLeaveAction({ id: '', action: '' })
  }

  const handleApproveCancelLeave = async () => {
    if (reasonText.length > 0) {
      if (leaveAction.action === 'approve') {
        await props.approveLmsLeave(leaveAction.id, {
          meta: {
            leave_approved_message: reasonText,
          },
          leave_status: [151],
        })
      }
      if (leaveAction.action === 'cancel') {
        await props.cancelLmsLeave(leaveAction.id, {
          meta: {
            leave_cancelled_message: reasonText,
          },
          leave_status: [152],
        })
      }
      if (isLeaveFiltered) await props.filteredLeaveFetch(lmsAdminForm)
      handleCloseModal()
    }
  }

  const handlePagination = (p, s) => {
    setPage({ pageNo: p, postPerPage: s })
    props.fetchLmsPending(p, s)
  }

  const action = leaveAction.action === 'approve'

  return (
    <>
      <PaginateTable
        columns={lmsAdminConstants}
        data={data}
        handlePagination={handlePagination}
        loading={{ spinning: lmsLoading, indicator: <Loader /> }}
        currentPage={page.pageNo}
        postPerPage={page.postPerPage}
        totalData={isLeaveFiltered ? 0 : totalPending}
      />

      <ModalDetail
        title="Pending Leave Detail"
        visible={showDetail}
        detail={detail}
        handleCancel={() => setShowDetail(false)}
        columns={pendingLeaveDetailColumns}
        footer={[
          <ButtonComponent
            key="approve"
            btnText="Approve"
            className={styles.approveButton}
            onClick={() => handleApproveCancel(detail.key, 'approve')}
          />,
          <ButtonComponent
            key="cancel"
            btnText="Cancel"
            className={styles.cancelButton}
            onClick={() => handleApproveCancel(detail.key, 'cancel')}
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
        title={`${action ? 'Approve' : 'Cancel'} Leave`}
        bodyText={`Reason For ${action ? 'Approval' : 'Cancel'}`}
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal}
        handleCancel={handleCloseModal}
        footer={[
          <ButtonComponent
            key="action_leave"
            btnText={`${action ? 'Approve' : 'Cancel'} Leave`}
            className={`${action ? styles.approveButton : styles.cancelButton}`}
            onClick={handleApproveCancelLeave}
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
    lmsPending,
    totalPending,
    lmsLoading,
    isLeaveFiltered,
    filteredLeaves,
    lmsAdminForm,
  },
  commonData: { leaveFields },
}) => ({
  lmsPending,
  totalPending,
  lmsLoading,
  leaveFields,
  isLeaveFiltered,
  filteredLeaves,
  lmsAdminForm,
})

export default connect(mapStateToProps, {
  fetchLmsPending,
  cancelLmsLeave,
  approveLmsLeave,
  filteredLeaveFetch,
})(Pending)
