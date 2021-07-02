import React, { useEffect, useState } from 'react'
import { Select as Choose, Table } from 'antd'
import moment from 'moment'
import Select from 'components/elements/Select'
import Button from 'components/elements/Button'
import TimeSummaryTable from 'components/elements/TimeSummaryTable'
import LogTimeForm from 'components/modules/LogTimeForm'
import Chart from './LogtimeChart'
import styles from './styles.module.css'

const labels = [
  'Estimated Hours',
  'Bug',
  'Change Request',
  'Data Entry',
  'Debugging',
  'Fixing',
  'Maintenance',
  'Migration',
  'New Request',
  'QA',
  'QA Fixing',
  'Research',
  'RFE',
]
const values = [12, 9, 5, 5, 6, 3, 3, 4, 6, 7, 4, 5, 7]

function TimeLog() {
  const [chartType, setChartType] = useState({ label: 'Normal', value: '1' })
  const [ChartLogType, setChartLogType] = useState([])
  const [isChartGenerated, setIsChartGenerated] = useState(false)

  const [newLabel, setNewLabel] = useState([])
  const [newData, setNewData] = useState([])

  const [rowDataForEdit, setRowDataForEdit] = useState(null)
  const [formType, setFormType] = useState('Add')

  const handleChangeChartType = (a) => {
    setChartType(a)
  }
  const handleChangeChartLogType = (a) => {
    setChartLogType([...a])
  }
  const handleGenerateChart = () => {
    if (!ChartLogType.length) setChartLogType(['0'])
    setIsChartGenerated(true)
  }

  const handlesetRowDataForEdit = (rowData) => {
    setRowDataForEdit(rowData)
    setFormType('Edit')
  }

  useEffect(() => {
    if (!ChartLogType.length) setIsChartGenerated(false)
    if (ChartLogType.includes('0')) {
      setNewLabel(labels)
      setNewData(values)
    } else {
      setNewLabel([labels[0], ...ChartLogType.map((type) => labels[+type - 1])])
      setNewData([values[0], ...ChartLogType.map((type) => values[+type - 1])])
    }
  }, [ChartLogType])

  const initialValues =
    formType === 'Add'
      ? {
          date: moment(Date.now()),
          hours: '',
          minutes: '',
          remarks: '',
          log_type: '',
        }
      : {
          ...rowDataForEdit,
          date: moment(rowDataForEdit.date, 'DD/MM/YYYY'),
          hours: rowDataForEdit.hours.split('.')[0],
          minutes: rowDataForEdit.hours.split('.')[1] || '',
        }

  return (
    <div className={styles.timelog_container}>
      <div className={styles.add_time_log}>
        <LogTimeForm
          initialValues={initialValues}
          setFormType={setFormType}
          formType={formType}
        />
      </div>
      <div className={styles.time_summary}>
        <TimeSummaryTable
          data={[
            { id: '1', name: 'Estimated Hours', time: 50 },
            {
              id: '2',
              name: 'Time Spent',
              time: 30,
            },
            { id: '3', name: 'Time Spent This Weeks', time: 10 },
          ]}
        />
        <div className={styles.chart_container}>
          <div className={styles.chart_type}>
            <Select
              value={chartType}
              options={[
                { label: 'Normal', value: '1' },
                { label: 'Stacked', value: '2' },
              ]}
              style={{ textAlign: 'left', width: '100%' }}
              onChange={handleChangeChartType}
            />
          </div>
          <div className={styles.chart_log_type}>
            <Choose
              value={ChartLogType}
              mode="multiple"
              placeholder="Select Log Types To Generate Bar Chart"
              options={[
                { label: 'All', value: '0' },
                { label: 'Estimated Hours', value: '1' },
                { label: 'Bug', value: '2' },
                { label: 'Change Request', value: '3' },
                { label: 'Data Entry', value: '4' },
                { label: 'Debugging', value: '5' },
                { label: 'Fixing', value: '6' },
                { label: 'Maintenance', value: '7' },
                { label: 'Migration', value: '8' },
                { label: 'New Request', value: '9' },
                { label: 'QA', value: '10' },
                { label: 'QA Fixing', value: '11' },
                { label: 'Research', value: '12' },
                { label: 'RFE', value: '13' },
              ]}
              style={{ textAlign: 'left', width: '100%' }}
              onChange={handleChangeChartLogType}
            />
          </div>
          <Button btnText="Generate Chart" onClick={handleGenerateChart} />
        </div>
        {isChartGenerated && (
          <div className={styles.chart_display}>
            <Chart
              chartType={chartType.value}
              data={{
                labels: newLabel,
                datasets: [
                  {
                    label: 'Hours Spent',
                    data: newData,
                    backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                  },
                ],
              }}
            />
          </div>
        )}
        <div className="time_log_table">
          <div className={styles.filter_table}>
            <span>Filter By:</span>
            <Select
              value={{ label: 'Log Author', value: '1' }}
              options={[
                { label: 'Log Author', value: '1' },
                { label: 'Subir Sakya', value: '2' },
                { label: 'Biraj Dahal', value: '3' },
              ]}
              style={{ textAlign: 'left' }}
            />
            <Select
              value={{ label: 'Log Type', value: '1' }}
              options={[
                { label: 'Log Type', value: '1' },
                { label: 'Subir Sakya', value: '2' },
                { label: 'Biraj Dahal', value: '3' },
              ]}
              style={{ textAlign: 'left' }}
            />
            <Button btnText="Reset" />
          </div>
          <div className={styles.project_detail_table}>
            <Table
              columns={[
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
                },
                {
                  key: '2',
                  date: '06/03/2020',
                  hours: '8.25',
                  log_type: 'Migration',
                  remarks: 'test saturday 1 hr log time',
                  added_by: 'Bijen Kumar',
                },
                {
                  key: '3',
                  date: '06/03/2020',
                  hours: '8.25',
                  log_type: 'Migration',
                  remarks: 'test saturday 1 hr log time',
                  added_by: 'Bijen Kumar',
                },
                {
                  key: '4',
                  date: '06-03-2020',
                  hours: '8.25',
                  log_type: 'Migration',
                  remarks: 'test saturday 1 hr log time',
                  added_by: 'Bijen Kumar',
                },
                {
                  key: '5',
                  date: '06-03-2020',
                  hours: '8.25',
                  log_type: 'Migration',
                  remarks: 'test saturday 1 hr log time',
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
  )
}

export default TimeLog
