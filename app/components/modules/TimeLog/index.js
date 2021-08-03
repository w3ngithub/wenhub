import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { fetchFilteredProjectLogs } from 'redux/projectLog/projectLogAction'
import { Pagination, Select as Choose, Table } from 'antd'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import useDidMountEffect from 'hooks/useDidMountEffect'
import moment from 'moment'
import Select from 'components/elements/Select'
import Button from 'components/elements/Button'
import TimeSummaryTable from 'components/elements/TimeSummaryTable'
import LogTimeForm from 'components/modules/LogTimeForm'
import Loader from 'components/elements/Loader'
import {
  backGroundColorOfChartItems,
  chartLogTypesOptions,
  labels,
  logTimeTableColumns,
  TimeSummaryTableData,
  values,
} from 'constants/projectLogConstants'
import Chart from './LogtimeChart'
import styles from './styles.module.css'

function TimeLog() {
  const { projectLogs, logTypes, totalLogsOfProject, loading } = useSelector(
    (state) => state.projectLog,
    shallowEqual,
  )
  const cleanLogTypes = logTypes?.reduce(
    (obj, log) => ({ ...obj, [log.id]: log.name }),
    {},
  )
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const {
    query: { id },
  } = useRouter()

  const logTypesForDropDown = logTypes?.map((log) => ({
    label: log.name,
    value: log.id,
  }))

  const dataSource = projectLogs?.map((log) => ({
    key: log.id,
    date: moment(log?.meta?.date, 'YYYYMMDD').format('YYYY-MM-DD'),
    hours: log?.meta?.hours,
    log_type: cleanLogTypes[log?.log_type],
    remarks: parse(log?.content?.rendered),
    added_by: log?.meta?.display_name,
  }))

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

  useDidMountEffect(() => {
    dispatch(fetchFilteredProjectLogs(id, page, perPage))
  }, [page, perPage])

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
    <div className={styles.timelog_container}>
      <div className={styles.add_time_log}>
        <LogTimeForm
          initialValues={initialValues}
          setFormType={setFormType}
          formType={formType}
        />
      </div>
      <div className={styles.time_summary}>
        <TimeSummaryTable data={TimeSummaryTableData} />
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
              options={chartLogTypesOptions}
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
                    backgroundColor: backGroundColorOfChartItems,
                  },
                ],
              }}
            />
          </div>
        )}
        <div className="time_log_table">
          <div className={styles.filter_table}>
            <span style={{ minWidth: '65px' }}>Filter By:</span>
            <Select
              placeholder="Log Author"
              options={[
                { label: 'Log Author', value: '1' },
                { label: 'Subir Sakya', value: '2' },
                { label: 'Biraj Dahal', value: '3' },
              ]}
              style={{ textAlign: 'left', width: '100%' }}
            />
            <Select
              placeholder="Log Type"
              options={logTypesForDropDown}
              style={{ textAlign: 'left', width: '100%' }}
            />
            <Button btnText="Reset" danger />
          </div>
          <div className={styles.project_detail_table}>
            {loading ? (
              <div style={{ marginTop: '10%' }}>
                {' '}
                <Loader />
              </div>
            ) : (
              <>
                <Table
                  columns={logTimeTableColumns(handlesetRowDataForEdit, styles)}
                  dataSource={dataSource}
                  tableBodyStyle={{ backgroundColor: '#fff' }}
                  pagination={false}
                />
                <div style={{ marginTop: 25 }}></div>
                <Pagination
                  current={page}
                  total={totalLogsOfProject}
                  showSizeChanger
                  pageSize={perPage}
                  pageSizeOptions={[5, 10, 20]}
                  onChange={(pageNo, perPageNo) => {
                    setPage(pageNo)
                    setPerPage(perPageNo)
                  }}
                  defaultPageSize={10}
                  responsive
                  hideOnSinglePage
                />
                <div style={{ marginTop: 25 }}></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLog
