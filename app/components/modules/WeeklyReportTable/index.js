import React from 'react'
import { useRouter } from 'next/router'
import FormField from 'elements/Form'
import { Table } from 'antd'
import { tableBodyStyle } from 'constants/constants'
import styles from './styles.module.css'

function WeeklyReportTable({ searchedPorject, handleSearchProject }) {
  const router = useRouter()

  const handlesetGotoDetails = (projectId) => {
    router.push(`/project/${projectId}`)
  }

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
          {
            key: '7000',
            id: 1,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '2',
            id: 2,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '3',
            id: 3,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '4',
            id: 4,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '5',
            id: 5,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '7',
            id: 7,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
          {
            key: '6',
            id: 6,
            project: 'Ido',
            client: 'Kstart',
            time_spent: '44.72',
          },
        ]}
        pagination={false}
      />
    </div>
  )
}

export default WeeklyReportTable
