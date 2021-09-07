import React, { useState } from 'react'
import { Pagination, Table } from 'antd'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { HiOutlineViewGrid } from '@react-icons/all-files/hi/HiOutlineViewGrid'
import TmsAdminHeader from 'components/modules/TmsAdminHeader'
import {
  AdminAttendanceRecordColumns,
  AdminAttendanceRecordData,
} from 'constants/tmsConstants'
import { navBarBackgroundColor } from 'constants/constants'
import Modals from 'components/elements/Modal'
import AttendanceRecordDetail from 'components/modules/AttendanceRecordDetail'
import moment from 'moment'
import styles from './styles.module.css'

function TMSAdmin() {
  const [isModelOpenView, setIsModelOPenView] = useState(false)
  const [modelContent, setModeldContent] = useState({})

  const handleViewPunchDetail = (rowKey = {}, parentRow = {}) => {
    setIsModelOPenView(true)
    setModeldContent({
      user: parentRow.user,
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
          <div className={styles.actions}>
            <span className={styles.action}>
              <BiEdit
                style={{ color: navBarBackgroundColor, fontSize: '18px' }}
              />
              <span className={styles.action_name}>Edit</span>
            </span>
            <span
              className={styles.action}
              aria-hidden
              onClick={() => {
                handleViewPunchDetail(rowKey, parentRow)
              }}
            >
              <HiOutlineViewGrid
                style={{ color: navBarBackgroundColor, fontSize: '15px' }}
              />
              <span className={styles.action_name}>View</span>
            </span>
          </div>
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
      <div className={styles.tms_admin_container}>
        <TmsAdminHeader />
        <div className={styles.tms_admin_table}>
          <Table
            columns={AdminAttendanceRecordColumns}
            expandable={{ expandedRowRender }}
            dataSource={AdminAttendanceRecordData}
            pagination={false}
          />
          <div style={{ marginTop: 25 }}></div>
          <Pagination
            current={1}
            total={20}
            showSizeChanger
            pageSize={10}
            pageSizeOptions={[5, 10, 20]}
            onChange={(pageNo, perPageNo) => {
              // setPage(pageNo)
              // setPerPage(perPageNo)
            }}
            defaultPageSize={10}
            responsive
            // hideOnSinglePage
          />
          <div style={{ marginTop: 25 }}></div>
        </div>
      </div>
      <Modals
        title={modelContent?.user || ''}
        visible={isModelOpenView}
        handleCancel={() => setIsModelOPenView(false)}
        variant="large"
      >
        <AttendanceRecordDetail details={modelContent} />
      </Modals>
    </>
  )
}

export default TMSAdmin
