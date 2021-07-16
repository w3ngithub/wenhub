import React, { useState } from 'react'
import ListTable from 'components/elements/Table'
import { userLeaveColumns } from 'constants/lmsAdminConstants'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'
import ModalDetail from '../ModalDetail'

const Cancelled = () => {
  const [detail, setDetail] = useState({})
  const [showDetail, setShowDetail] = useState(false)

  const handleDetailModal = (d) => {
    if (showDetail) {
      setShowDetail(false)
      setDetail({})
    } else {
      setShowDetail(true)
      setDetail(d)
    }
  }

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
              <>
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
                      cancel_message: 'sdfjsdhfksdfhsdf',
                    })
                  }
                />
              </>
            ),
          },
        ]}
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
      />
    </>
  )
}

export default Cancelled
