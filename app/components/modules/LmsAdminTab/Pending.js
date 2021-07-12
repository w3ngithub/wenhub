import React, { useState } from 'react'
import ListTable from 'components/elements/Table'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'
import ModalDetail from '../ModalDetail'
import MessageModal from '../MessageModal'
import {
  pendingLeaveDetailColumns,
  userLeaveColumns,
} from 'constants/lmsAdminConstants'

const Pending = () => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [messageModal, setShowMessageModal] = useState(false)
  const [reasonText, setReasonText] = useState('')
  const [leaveAction, setLeaveAction] = useState({ id: '', action: '' })

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

  const handleApproveCancelLeave = () => {
    console.log(reasonText)
    // dispatch api for apply leave or cancel leave
  }

  let action = leaveAction.action === 'approve'

  return (
    <>
      <ListTable
        columns={userLeaveColumns}
        data={[
          {
            key: 1,
            applicant: 'Ashok Ganika',
            leave_dates: '07-07-21',
            leave_type: 'Casual',
            action: (
              <div style={{ display: 'flex', gap: 5 }}>
                <ButtonComponent
                  btnText="View Details"
                  className={styles.viewButton}
                  onClick={() =>
                    handleDetailModal({
                      key: 1,
                      applicant: 'Ashok Ganika',
                      dates: '07-07-21',
                      leave_type: 'Casual',
                      reason: 'sjdlfksjdfl',
                      team_leads: 'Rujal Sapkota',
                    })
                  }
                />
                <ButtonComponent
                  btnText="Approve"
                  className={styles.approveButton}
                  onClick={() => handleApproveCancel(1, 'approve')}
                />
                <ButtonComponent
                  btnText="Cancel"
                  className={styles.cancelButton}
                  onClick={() => handleApproveCancel(1, 'cancel')}
                />
              </div>
            ),
          },
        ]}
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
            onClick={() => handleApproveCancel(detail.id, 'approve')}
          />,
          <ButtonComponent
            key="cancel"
            btnText="Cancel"
            className={styles.cancelButton}
            onClick={() => handleApproveCancel(detail.id, 'cancel')}
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
        title={`${action ? 'Approve' : 'Cancel'} Leave`}
        bodyText={`Reason For ${action ? 'Approval' : 'Cancel'}`}
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal}
        handleCancel={() => setShowMessageModal(false)}
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
            onClick={() => setShowMessageModal(false)}
          />,
        ]}
      />
    </>
  )
}

export default Pending
