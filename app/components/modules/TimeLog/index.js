import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
  fetchFilteredProjectLogs,
  fetchProjectLogsFilteredByAuthorAndLogType,
} from 'redux/projectLog/projectLogAction'
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

function TimeLog({ estimatedHours }) {
  let logs = []
  const [developersIds, setDevelopersId] = useState([])
  const [DesignersIds, setDesignersId] = useState([])

  const {
    projectLogs,
    logTypes,
    totalLogsOfProject,
    projectDetailForTimeLog,
    loading,
  } = useSelector((state) => state.projectLog, shallowEqual)
  const cleanLogTypes = logTypes?.reduce(
    (obj, log) => ({ ...obj, [log.id]: log?.name }),
    {},
  )
  const {
    filterType: { developers, designers },
  } = useSelector((state) => state.commonData, shallowEqual)

  const dispatch = useDispatch()
  const [logAuthorFiltered, setLogAuthorFiltered] = useState({
    label: 'Log Author',
    value: '',
  })
  const [logTypeFiltered, setLogTypeFiltered] = useState({
    label: 'Log Type',
    value: '',
  })
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

  const handleResetLogsTable = () => {
    setLogTypeFiltered({
      label: 'Log Type',
      value: '',
    })
    setLogAuthorFiltered({
      label: 'Log Author',
      value: '',
    })
    setPage(1)
    setPerPage(10)
  }

  useDidMountEffect(() => {
    if (logAuthorFiltered.value !== '' || logTypeFiltered.value !== '') {
      dispatch(
        fetchProjectLogsFilteredByAuthorAndLogType(id, logTypeFiltered.value),
      )
    } else {
      dispatch(fetchFilteredProjectLogs(id, page, perPage))
    }
  }, [logTypeFiltered.value, logAuthorFiltered.value, page, perPage])

  useEffect(() => {
    const DevelopersIds = developers
      .filter(
        (dv) =>
          Array.isArray(projectDetailForTimeLog.acf_fields.developers) &&
          projectDetailForTimeLog.acf_fields.developers?.indexOf(dv.id) > -1,
      )
      .map((d) => ({ label: d.name, value: d.name }))

    const designersIds = designers
      .filter(
        (dv) =>
          Array.isArray(projectDetailForTimeLog.acf_fields.designers) &&
          projectDetailForTimeLog.acf_fields.designers.indexOf(dv.id) > -1,
      )
      .map((d) => ({ label: d.name, value: d.name }))
    setDesignersId(designersIds)
    setDevelopersId(DevelopersIds)
  }, [developers, designers, projectDetailForTimeLog])

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
        }
      : {
          ...rowDataForEdit,
          date: moment(rowDataForEdit.date, 'YYYY-MM-DD'),
          hours: rowDataForEdit.hours.split('.')[0],
          minutes: rowDataForEdit.hours.includes('.')
            ? ((+rowDataForEdit.hours.split('.')[1] / 100) * 60).toString()
            : '0',
          remarks: rowDataForEdit?.remarks[0]?.props?.children,
          log_type: logTypes.find((log) => log.name === rowDataForEdit.log_type)
            .id,
        }

  if (logAuthorFiltered.value !== '') {
    logs = dataSource.filter((data) =>
      new RegExp(logAuthorFiltered.value, 'gi').test(data.added_by),
    )
  } else {
    logs = dataSource
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
            {
              id: '1',
              name: 'Estimated Hours',
              time: estimatedHours,
            },
            ...TimeSummaryTableData,
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
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
              onChange={handleChangeChartType}
            />
          </div>
          <div className={styles.chart_log_type}>
            <Choose
              value={ChartLogType}
              mode="multiple"
              placeholder="Select Log Types To Generate Bar Chart"
              options={chartLogTypesOptions}
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
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
              value={logAuthorFiltered}
              options={[
                { label: 'Log Author', value: '' },
                ...developersIds,
                ...DesignersIds,
              ]}
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
              onChange={(value) => {
                setLogAuthorFiltered(value)
              }}
            />
            <Select
              value={logTypeFiltered}
              options={[
                { label: 'Log Type', value: '' },
                ...logTypesForDropDown,
              ]}
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
              onChange={(value) => {
                setLogTypeFiltered(value)
              }}
            />
            <Button btnText="Reset" danger onClick={handleResetLogsTable} />
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
                  dataSource={logs}
                  tableBodyStyle={{ backgroundColor: '#fff' }}
                  pagination={false}
                />
                {logAuthorFiltered.value === '' &&
                  logTypeFiltered.value === '' && (
                    <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLog
