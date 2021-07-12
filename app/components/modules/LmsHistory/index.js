import React, { useState } from 'react'
import { Table } from 'antd'
import { tableBodyStyle } from 'constants/constants'
import Button from 'components/elements/Button'
import MessageModal from 'components/modules/MessageModal'
import styles from './styles.module.css'

function LmsHistory() {
  const [messageModal, setShowMessageModal] = useState(false)
  const [reasonText, setReasonText] = useState('')

  const handleCancelLeave = () => {
    console.log(reasonText)
  }
  return (
    <>
      <div className={styles.lms_history_container}>
        <Table
          tableBodyStyle={{ backgroundColor: '#fff' }}
          pagination={false}
          columns={[
            {
              key: 'dates',
              title: 'DATES',
              keyIndex: 'dates',
              dataIndex: 'dates',
              render: (texts) => ({
                props: {
                  style: tableBodyStyle,
                },
                children: texts.map((text) => <p key={text}>{text}</p>),
              }),
            },
            {
              key: 'leave_type',
              title: 'LEAVE TYPE',
              keyIndex: 'leave_type',
              dataIndex: 'leave_type',
              render: (text) => ({
                props: {
                  style: tableBodyStyle,
                },
                children: text,
              }),
            },
            {
              key: 'reason',
              title: 'REASON',
              keyIndex: 'reason',
              dataIndex: 'reason',
              render: (text) => ({
                props: {
                  style: tableBodyStyle,
                },
                children: text,
              }),
            },
            {
              key: 'status',
              title: 'STATUS',
              keyIndex: 'status',
              dataIndex: 'status',
              render: (text) => ({
                props: {
                  style: tableBodyStyle,
                },
                children: text,
              }),
            },
            {
              key: 'action',
              title: 'ACTION',
              keyIndex: 'action',
              dataIndex: 'action',
              render: (_, rowData) => ({
                props: {
                  style: tableBodyStyle,
                },
                children: rowData.status === 'pending' && (
                  <Button
                    htmlType="button"
                    btnText="Cancel"
                    size="large"
                    danger
                    onClick={() => setShowMessageModal(true)}
                  />
                ),
              }),
            },
          ]}
          dataSource={[
            {
              key: '1',
              dates: ['07-07-21'],
              leave_type: 'Sick',
              reason: 'test again again test again againtestagain',
              status: 'cancel',
            },
            {
              key: '2',
              dates: [
                '07-07-21',
                '07-08-21',
                '07-09-21',
                '07-12-21',
                '07-13-21',
              ],
              leave_type: 'Sick',
              reason:
                'Dear All I am writing this lettere examination of MCIS. ',
              status: 'pending',
            },
            {
              key: '3',
              dates: ['07-15-21', '07-16-21'],
              leave_type: 'Sick',
              reason: 'test again again',
              status: 'cancel',
            },
            {
              key: '4',
              dates: ['07-15-21'],
              leave_type: 'Sick',
              reason: 'test again again',
              status: 'pending',
            },
          ]}
        />
      </div>
      <MessageModal
        title="Cancel Leave"
        bodyText="Reason for Cancelling Leave"
        value={reasonText}
        onTextChange={(e) => setReasonText(e.target.value)}
        visible={messageModal}
        handleCancel={() => setShowMessageModal(false)}
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
            onClick={() => setShowMessageModal(false)}
          />,
        ]}
      />
    </>
  )
}

export default LmsHistory
