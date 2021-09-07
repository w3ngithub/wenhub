import React, { useState } from 'react'
import { Pagination, Table } from 'antd'
import TmsTimeAttendanceForm from 'components/modules/TmsTimeAttendanceForm'
import TmsAttendanceRecordHeader from 'components/modules/TmsAttendanceRecordHeader'
import AttendaceRecordDetail from 'components/modules/AttendanceRecordDetail'
import {
  AttendanceRecordColumns,
  AttendanceRecordData,
} from 'constants/tmsConstants'
import Modals from 'components/elements/Modal'
import styles from './styles.module.css'

function TMS() {
  const [isModelOpen, setIsModelOPen] = useState(false)
  const [modelContent, setModeldContent] = useState({})
  const handleViewPunchDetail = (rowKey = {}, parentRow = {}) => {
    setIsModelOPen(true)
    setModeldContent({
      type: parentRow.type,
      date: parentRow.date,
      day: parentRow.day,
      punchInTime: rowKey.punchintime,
      punchOutTime: rowKey.punchouttime,
      officeHour: rowKey.officehour,
    })
  }

  const expandedRowRender = (parentRow) => {
    const columns = [
      {
        title: 'Punch-in Time',
        dataIndex: 'punchintime',
        key: 'punchintime',
      },
      {
        title: 'Punch-out Time',
        dataIndex: 'punchouttime',
        key: 'punchouttime',
      },
      {
        title: 'Office Hour',
        dataIndex: 'officehour',
        key: 'officehour',
        render: (item) =>
          +item < 9 ? (
            <span style={{ color: '#FF4D4F' }}>{item}hr</span>
          ) : (
            <span>{item}hr</span>
          ),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, rowKey) => (
          <span
            aria-hidden
            className={styles.viewDetailOfPunchTime}
            onClick={() => {
              handleViewPunchDetail(rowKey, parentRow)
            }}
          >
            View
          </span>
        ),
      },
    ]
    const data = [
      {
        key: 1,
        punchouttime: '12:17:06 AM',
        punchintime: '12:17:06 AM',
        officehour: '8',
      },
      {
        key: 2,
        punchouttime: '12:17:06 AM',
        punchintime: '12:17:06 AM',
        officehour: '9',
      },
      {
        key: 3,
        punchouttime: '12:17:06 AM',
        punchintime: '12:17:06 AM',
        officehour: '9',
      },
      {
        key: 4,
        punchouttime: '12:17:06 AM',
        punchintime: '12:17:06 AM',
        officehour: '9',
      },
    ]

    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  return (
    <>
      <div className={styles.tms_container}>
        <h4 className={styles.tms_heading}>Time Attendance</h4>
        <TmsTimeAttendanceForm />
        <TmsAttendanceRecordHeader>
          <h4 className={styles.tms_heading}>Attendance Record</h4>
        </TmsAttendanceRecordHeader>
        <div className={styles.record_table}>
          <Table
            columns={AttendanceRecordColumns}
            expandable={{ expandedRowRender }}
            dataSource={AttendanceRecordData}
            pagination={false}
          />
          <div style={{ marginTop: 25 }}></div>
          <Pagination
            current={1}
            total={20}
            showSizeChanger
            pageSize={10}
            pageSizeOptions={[5, 10, 20]}
            // onChange={(pageNo, perPageNo) => {
            //   setPage(pageNo)
            //   setPerPage(perPageNo)
            // }}
            defaultPageSize={10}
            responsive
            // hideOnSinglePage
          />
          <div style={{ marginTop: 25 }}></div>
        </div>
      </div>
      <Modals
        title=""
        visible={isModelOpen}
        handleCancel={() => setIsModelOPen(false)}
        variant="large"
      >
        <AttendaceRecordDetail details={modelContent} />
      </Modals>
    </>
  )
}

export default TMS
