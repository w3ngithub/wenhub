import React, { useState } from 'react'
import { Table } from 'antd'
import { tableBodyStyle } from 'constants/constants'
import Select from 'components/elements/Select'
import styles from './styles.module.css'

function LmsArchive() {
  const [archive, setArchive] = useState({})
  const [archiveData] = useState([])
  const handleArchiveChange = (e) => {
    setArchive(e)
  }
  return (
    <div className={styles.lsm_archive_container}>
      <div className={styles.archive_filter}>
        <label htmlFor="view_archive">View Archive</label>
        <Select
          id="view_archive"
          value={archive}
          placeholder="Select From Past Archive"
          options={[{ label: 'Archived 07-15-19', value: 'Archived 07-15-19' }]}
          onChange={handleArchiveChange}
        />
      </div>
      {archive.value && archiveData && (
        <div className={styles.archive_table}>
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
            ]}
            dataSource={[
              {
                key: '1',
                dates: ['07-07-21'],
                leave_type: 'Sick',
                reason: 'test again again test again againtestagain',
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
              },
              {
                key: '3',
                dates: ['07-15-21', '07-16-21'],
                leave_type: 'Sick',
                reason: 'test again again',
              },
              {
                key: '4',
                dates: ['07-15-21'],
                leave_type: 'Sick',
                reason: 'test again again',
              },
            ]}
          />
        </div>
      )}
      {archive.value && !archiveData && <h3>No Leaves Taken till now</h3>}
    </div>
  )
}

export default LmsArchive
