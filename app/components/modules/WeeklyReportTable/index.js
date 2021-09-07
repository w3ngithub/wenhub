import React from 'react'
import { useRouter } from 'next/router'
import { shallowEqual, useSelector } from 'react-redux'
import FormField from 'elements/Form'
import { Table } from 'antd'
import { tableBodyStyle } from 'constants/constants'
import Loader from 'components/elements/Loader'
import { GO_TO_LOG_PATH } from 'constants/routePath'
import styles from './styles.module.css'

function WeeklyReportTable({ searchedPorject, handleSearchProject }) {
  const router = useRouter()

  const handlesetGotoDetails = (projectId) => {
    router.push(`${GO_TO_LOG_PATH}/${projectId}`)
  }
  const {
    weeklyReport: { loading, weeklyReports },
  } = useSelector((state) => state, shallowEqual)

  const filteredReports = weeklyReports?.filter((r) =>
    new RegExp(searchedPorject, 'gi').test(r.project_name),
  )

  return (
    <div className={styles.weekly_report_table_container}>
      <FormField
        component="InputField"
        placeholder="Search Project..."
        value={searchedPorject}
        onChange={handleSearchProject}
        borderRadius="3px"
        width="190px"
        padding="7px"
        styles={{ marginBottom: '15px' }}
      />
      <Table
        loading={{ spinning: loading, indicator: <Loader /> }}
        columns={[
          {
            key: 'id',
            title: '#',
            keyIndex: 'id',
            dataIndex: 'id',
            render: (text) => ({
              props: {
                style: tableBodyStyle,
              },
              children: text,
            }),
          },
          {
            key: 'project',
            title: 'PROJECT',
            keyIndex: 'project',
            dataIndex: 'project',
            render: (text) => ({
              props: {
                style: tableBodyStyle,
              },
              children: text,
            }),
          },
          {
            key: 'client',
            title: 'CLIENT',
            keyIndex: 'client',
            dataIndex: 'client',
            render: (text) => ({
              props: {
                style: tableBodyStyle,
              },
              children: text,
            }),
          },
          {
            key: 'time_spent',
            title: 'TIME SPENT',
            keyIndex: 'time_spent',
            dataIndex: 'time_spent',
            render: (text) => ({
              props: {
                style: tableBodyStyle,
              },
              children: text,
            }),
          },

          {
            key: '6',
            title: 'DETAILS',
            keyIndex: '6',
            dataIndex: '6',
            render: (_, rowData) => (
              <span
                onClick={() => handlesetGotoDetails(rowData.key)}
                onKeyDown={() => handlesetGotoDetails(rowData.key)}
                role="button"
                tabIndex="0"
                className={styles.weekly_details}
              >
                Details
              </span>
            ),
          },
        ]}
        dataSource={[
          ...filteredReports?.map((report, i) => ({
            id: i + 1,
            key: report.project_id,
            project: report.project_name,
            client: report.client,
            time_spent: report.time_spent,
          })),
        ]}
        pagination={false}
      />
    </div>
  )
}

export default WeeklyReportTable
