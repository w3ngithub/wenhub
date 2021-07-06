import React, { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { Table } from 'antd'
import LogTimeForm from 'components/modules/LogTimeForm'
import TimeSummaryTable from 'components/elements/TimeSummaryTable'
import styles from './styles.module.css'

function LogTime() {
  const [rowDataForEdit, setRowDataForEdit] = useState(null)
  const [formType, setFormType] = useState('Add')

  const handlesetRowDataForEdit = (rowData) => {
    setRowDataForEdit(rowData)
    setFormType('Edit')
  }

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
          date: moment(rowDataForEdit.date, 'DD/MM/YYYY'),
          hours: rowDataForEdit.hours.split('.')[0],
          minutes: rowDataForEdit.hours.split('.')[1] || '',
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
          />
        </div>
        <div className={styles.time_summary}>
          <TimeSummaryTable
            data={[
              {
                id: '1',
                name: 'Time Spent This Week',
                time: 30,
              },
              {
                id: '2',
                name: 'Time Spent Today',
                time: 0,
                backgroundColor: '#f2dede',
                color: '#a94442',
              },
            ]}
          />
          <div className="time_log_table">
            <div className={styles.project_detail_table}>
              <Table
                columns={[
                  {
                    key: 'project_name',
                    title: 'Project',
                    keyIndex: 'prproject_nameoject',
                    dataIndex: 'project_name',
                  },
                  {
                    key: 'date',
                    title: 'DATE',
                    keyIndex: 'date',
                    dataIndex: 'date',
                  },
                  {
                    key: 'hours',
                    title: 'HOURS',
                    keyIndex: 'hours',
                    dataIndex: 'hours',
                  },
                  {
                    key: 'log_type',
                    title: 'LOG TYPE',
                    keyIndex: 'log_type',
                    dataIndex: 'log_type',
                  },
                  {
                    key: 'remarks',
                    title: 'REMARKS/DESCRIPTION',
                    keyIndex: 'remarks',
                    dataIndex: 'remarks',
                  },
                  {
                    key: 'added_by',
                    title: 'ADDED BY',
                    keyIndex: 'added_by',
                    dataIndex: 'added_by',
                  },
                  {
                    key: '6',
                    title: 'EDIT',
                    keyIndex: 'edit',
                    dataIndex: 'edit',
                    render: (_, rowData) => (
                      <span
                        onClick={() => handlesetRowDataForEdit(rowData)}
                        onKeyDown={() => handlesetRowDataForEdit(rowData)}
                        role="button"
                        tabIndex="0"
                        className={styles.edit_table_row_data}
                      >
                        Edit
                      </span>
                    ),
                  },
                ]}
                dataSource={[
                  {
                    key: '1',
                    date: '06/03/2020',
                    hours: '8.25',
                    log_type: 'Migration',
                    remarks: 'test saturday 1 hr log time,test  1 hr log time,',
                    added_by: 'Bijen Kumar',
                    project_name: 'Kisok',
                  },
                  {
                    key: '2',
                    date: '06/03/2020',
                    hours: '8.25',
                    log_type: 'Migration',
                    remarks: 'test saturday 1 hr log time',
                    added_by: 'Bijen Kumar',
                    project_name: 'Idonize',
                  },
                  {
                    key: '3',
                    date: '06/03/2020',
                    hours: '8.25',
                    log_type: 'Migration',
                    remarks: 'test saturday 1 hr log time',
                    project_name: 'Idonize',
                    added_by: 'Bijen Kumar',
                  },
                  {
                    key: '4',
                    date: '06-03-2020',
                    hours: '8.25',
                    log_type: 'Migration',
                    remarks: 'test saturday 1 hr log time',
                    project_name: 'Idonize',
                    added_by: 'Bijen Kumar',
                  },
                  {
                    key: '5',
                    date: '06-03-2020',
                    hours: '8.25',
                    log_type: 'Migration',
                    remarks: 'test saturday 1 hr log time',
                    project_name: 'Idonize',
                    added_by: 'Bijen Kumar',
                  },
                ]}
                tableBodyStyle={{ backgroundColor: '#fff' }}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogTime
