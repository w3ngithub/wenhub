import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import moment from 'moment'
import { Table } from 'antd'
import parse from 'html-react-parser'
import LogTimeForm from 'components/modules/LogTimeForm'
import TimeSummaryTable from 'components/elements/TimeSummaryTable'
import { formatData } from 'utils/formatData'
import {
  FetchLogTImeOfUser,
  fetchUserTimeSpentToday,
  fetchWeeklyTimeSpentOfUser,
} from 'redux/logTime/logTimeActions'
import { logTimeTableColumns } from 'constants/logTimeConstants'
import Loader from 'components/elements/Loader'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

function LogTime() {
  const [rowDataForEdit, setRowDataForEdit] = useState(null)
  const [formType, setFormType] = useState('Add')
  const dispatch = useDispatch()

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userDetail'))?.user_id
    dispatch(FetchLogTImeOfUser(userId))
    dispatch(fetchWeeklyTimeSpentOfUser(userId))
    dispatch(fetchUserTimeSpentToday(userId))
  }, [])

  const handlesetRowDataForEdit = (rowData) => {
    setRowDataForEdit(rowData)
    setFormType('Edit')
  }

  const {
    logsOfUser,
    userTimeSpentThisWeek,
    userTimeSpentToday,
    loading,
    error,
  } = useSelector((state) => state.logTime, shallowEqual)
  const { logTypes, projectsOfUser } = useSelector(
    (state) => state.projectLog,
    shallowEqual,
  )
  const cleanLogTypes = logTypes?.reduce(
    (obj, log) => ({ ...obj, [log.id]: log.name }),
    {},
  )
  const cleanProjectsOfUser = projectsOfUser.reduce(
    (obj, project) => ({ ...obj, [project?.id]: project?.title?.rendered }),
    {},
  )

  if (error !== null) {
    openNotification({ type: 'error', message: error })
  }

  // filtered logs of user showing logs of only 1 week
  const dataSource = logsOfUser
    ?.filter(
      (logs) =>
        moment().startOf('isoWeek') <= moment(logs.meta.date, 'YYYYMMDD'),
    )
    .map((log) => ({
      key: log.id,
      date: moment(log?.meta?.date, 'YYYYMMDD').format('YYYY-MM-DD'),
      hours: formatData(log?.meta?.hours),
      log_type: cleanLogTypes[log?.log_type],
      remarks: parse(log?.content?.rendered),
      added_by: log?.meta?.display_name,
      project_name:
        cleanProjectsOfUser[log?.meta?.project_id] || 'Additional Time',
    }))

  const initialValues =
    formType === 'Add'
      ? {
          date: moment(Date.now()),
          hours: '',
          minutes: '',
          remarks: '',
        }
      : {
          ...rowDataForEdit,
          date: moment(rowDataForEdit.date, 'YYYY-MM-DD'),
          hours: rowDataForEdit.hours.split('.')[0],
          minutes: rowDataForEdit.hours.includes('.')
            ? ((+rowDataForEdit.hours.split('.')[1] / 10) * 60)
                .toString()
                .substring(0, 2)
            : '0',
          remarks: rowDataForEdit?.remarks[0]?.props?.children,
          log_type: logTypes.find((log) => log.name === rowDataForEdit.log_type)
            .id,
        }

  return (
    <div className={styles.time_log_container}>
      <div className={styles.time_log_header}>
        <h3>Log Time</h3>
        <Link href="http://202.166.207.19/wenhub-rt/wp-admin/post.php?post=7285&action=edit">
          <h3 className={styles.timelog_edit}>Edit</h3>
        </Link>
      </div>
      <div className={styles.timelog_container}>
        <div className={styles.add_time_log}>
          <LogTimeForm
            initialValues={initialValues}
            setFormType={setFormType}
            formType={formType}
            isAdmin
            timeLogId={rowDataForEdit?.key || ''}
          />
        </div>
        <div className={styles.time_summary}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <TimeSummaryTable
                data={[
                  {
                    id: '1',
                    name: 'Time Spent This Week',
                    time: formatData(userTimeSpentThisWeek),
                  },
                  {
                    id: '2',
                    name: 'Time Spent Today',
                    time: formatData(userTimeSpentToday),
                    backgroundColor:
                      +userTimeSpentToday === 0 ? '#f2dede' : '#dff0d8',
                    color: +userTimeSpentToday === 0 ? '#a94442' : '#3c763d',
                  },
                ]}
              />
              <div className="time_log_table">
                <div className={styles.project_detail_table}>
                  <Table
                    columns={logTimeTableColumns(
                      handlesetRowDataForEdit,
                      styles,
                    )}
                    dataSource={dataSource}
                    pagination={false}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LogTime
