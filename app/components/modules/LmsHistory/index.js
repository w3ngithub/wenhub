import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchLmsLeave, cancelLmsLeave } from 'redux/lms/lmsActions'
import Button from 'components/elements/Button'
import HTMLReactParser from 'html-react-parser'
import MessageModal from 'components/modules/MessageModal'
import { Paginate } from 'components/elements/Pagination'
import useDidMountEffect from 'hooks/useDidMountEffect'
import Loader from 'components/elements/Loader'
import { userLeaveColumns } from 'constants/lmsAdminConstants'
import styles from './styles.module.css'

function LmsHistory({
  lmsLeaves,
  totalLeaves,
  userDetail,
  lmsLoading,
  leaveFields,
  ...props
}) {
  const [messageModal, setShowMessageModal] = useState({
    lmsId: null,
    status: false,
  })
  const [reasonText, setReasonText] = useState('')
  const [page, setPage] = useState({ pageNo: 1, perPage: 10 })
  const [data, setData] = useState([])

  useDidMountEffect(
    () => props.fetchLmsLeave(page.pageNo, page.perPage, userDetail.user_id),
    [page],
  )

  useEffect(() => {
    const da = lmsLeaves.map((x) => {
      const dates = x?.meta?.leave_dates.map((d) => (
        <p key={d?.id}>{moment(d?.leave_date).format('YYYY-MM-DD')}</p>
      ))
      const leaveType = leaveFields?.leave_type.find((y) =>
        x?.leave_type?.includes(y.id),
      )
      const leaveStatus = leaveFields?.leave_status.find((y) =>
        x?.leave_status?.includes(y.id),
      )

      return {
        key: x?.id,
        dates,
        reason: HTMLReactParser(x?.content?.rendered),
        leave_type: leaveType?.name,
        status: leaveStatus?.name,
        action: leaveStatus?.name === 'Pending' && (
          <Button
            htmlType="button"
            btnText="Cancel"
            size="large"
            danger
            onClick={() => setShowMessageModal({ lmsId: x?.id, status: true })}
          />
        ),
      }
    })
    setData(da)
  }, [lmsLeaves])

  const handleClose = () => {
    setShowMessageModal({ lmsId: null, status: false })
    setReasonText('')
  }

  const handleCancelLeave = async () => {
    if (reasonText.length > 0) {
      await props.cancelLmsLeave(messageModal.lmsId, {
        meta: {
          leave_cancelled_message: reasonText,
        },
        leave_status: [152],
      })
      setShowMessageModal({ lmsId: null, status: false })
      setReasonText('')
      props.fetchLmsLeave(page.pageNo, page.perPage, userDetail.user_id)
    }
  }

  return (
    <>
      <div className={styles.lms_history_container}>
        <Table
          tableBodyStyle={{ backgroundColor: '#fff' }}
          pagination={false}
          columns={userLeaveColumns}
          dataSource={data}
          loading={{ spinning: lmsLoading, indicator: <Loader /> }}
        />
      </div>
      <div style={{ marginTop: 12 }}></div>
      <Paginate
        handlePageChange={(pageNo, perPage) => setPage({ pageNo, perPage })}
        length={+totalLeaves}
        pageSize={page.perPage}
        currentPage={page.pageNo}
      />
      <MessageModal
        loading={lmsLoading}
        title="Cancel Leave"
        bodyText="Reason for Cancelling Leave"
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal.status}
        handleCancel={() =>
          setShowMessageModal((th) => ({ ...th, status: false }))
        }
        footer={[
          <Button
            key="action_leave"
            btnText="Cancel Leave"
            onClick={handleCancelLeave}
          />,

          <Button
            key="close_leave"
            btnText="Close"
            style={{
              backgroundColor: '#fff',
              borderColor: '#ccc',
              color: '#000',
            }}
            onClick={handleClose}
          />,
        ]}
      />
    </>
  )
}

const mapStateToProps = ({
  lmsData: { lmsLeaves, totalLeaves, lmsLoading },
  userData: { userDetail },
  commonData: { leaveFields },
}) => ({ lmsLeaves, totalLeaves, userDetail, leaveFields, lmsLoading })

export default connect(mapStateToProps, { fetchLmsLeave, cancelLmsLeave })(
  LmsHistory,
)
