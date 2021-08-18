import React, { useState } from 'react'
import ListTable from 'components/elements/Table'
import ButtonComponent from 'components/elements/Button'
import { userLeaveColumns } from 'constants/lmsAdminConstants'
import styles from './styles.module.css'
import ModalDetail from '../ModalDetail'
import MessageModal from '../MessageModal'

const Approved = () => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [messageModal, setShowMessageModal] = useState(false)
  const [reasonText, setReasonText] = useState('')

  const handleDetailModal = (d) => {
    if (showDetail) {
      setShowDetail(false)
      setDetail({})
    } else {
      setShowDetail(true)
      setDetail(d)
    }
  }

  const handleCancel = () => {
    setShowDetail(false)
    setShowMessageModal(true)
  }

  const handleCancelLeave = () => {
    console.log(reasonText)
    // dispatch api for apply leave or cancel leave
  }

  return (
    <>
      <div className={styles.responsiveLmsAdminTable}>
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
                        approve_message: 'Anything',
                        team_leads: 'Rujal Sapkota',
                      })
                    }
                  />
                  <ButtonComponent
                    btnText="Cancel"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
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
            onClick={handleCancel}
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
        title="Cancel Leave"
        bodyText="Reason For Cancelling Leave"
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal}
        handleCancel={() => setShowMessageModal(false)}
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
            onClick={() => setShowMessageModal(false)}
          />,
        ]}
      />
    </>
  )
}

export default Approved
