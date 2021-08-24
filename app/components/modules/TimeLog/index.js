import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
  fetchFilteredProjectLogs,
  fetchProjectChartData,
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
import { formatData } from 'utils/formatData'
import useTokenValidation from 'hooks/useTokenValidation'
import {
  logTimeTableColumns,
  TimeSummaryTableData,
} from 'constants/projectLogConstants'
import { openNotification } from 'utils/notification'
import formatedChartData from './formatedChartData'
import Chart from './LogtimeChart'
import styles from './styles.module.css'

function TimeLog({ estimatedHours, projectId }) {
  useTokenValidation()
  let logs = []
  const [developersIds, setDevelopersId] = useState([])
  const [DesignersIds, setDesignersId] = useState([])

  const {
    projectLogs,
    logTypes,
    totalLogsOfProject,
    projectDetailForTimeLog,
    loading,
    weeklyTimeSpent,
    totalTimeSpent,
    chart,
    chartLoading,
    error,
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
    hours: formatData(log?.meta?.hours),
    log_type: cleanLogTypes[log?.log_type],
    remarks: parse(log?.content?.rendered),
    added_by: log?.meta?.display_name,
  }))

  const [chartType, setChartType] = useState({
    label: 'Normal',
    value: 'normal',
  })
  const [ChartLogType, setChartLogType] = useState([])
  const [isChartGenerated, setIsChartGenerated] = useState(false)

  const [rowDataForEdit, setRowDataForEdit] = useState(null)
  const [formType, setFormType] = useState('Add')
  const [chartTypeForChart, setChartTypeForChart] = useState({
    label: 'Normal',
    value: 'normal',
  })

  const handleChangeChartType = (a) => {
    setChartType(a)
  }
  const handleChangeChartLogType = (a) => {
    setChartLogType([...a])
  }
  const handleGenerateChart = () => {
    setIsChartGenerated(true)
    setChartTypeForChart(chartType)
    dispatch(
      fetchProjectChartData({
        project_id: projectId,
        log_types: ChartLogType.includes('all')
          ? 'all'
          : ChartLogType.join(','),
        graph_type: chartType.value,
      }),
    )
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

  if (logAuthorFiltered.value !== '') {
    logs = dataSource.filter((data) =>
      new RegExp(logAuthorFiltered.value, 'gi').test(data.added_by),
    )
  } else {
    logs = dataSource
  }

  if (error !== null) {
    openNotification({
      type: 'error',
      message: error,
    })
  }

  return (
    <div className={styles.timelog_container}>
      <div className={styles.add_time_log}>
        <LogTimeForm
          initialValues={initialValues}
          setFormType={setFormType}
          formType={formType}
          timeLogId={rowDataForEdit?.key || ''}
          projectName={projectDetailForTimeLog.title?.rendered}
        />
      </div>
      <div className={styles.time_summary}>
        <TimeSummaryTable
          data={TimeSummaryTableData(
            estimatedHours,
            totalTimeSpent,
            weeklyTimeSpent,
          )}
        />
        <div className={styles.chart_container}>
          <div className={styles.chart_type}>
            <Select
              value={chartType}
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Stacked', value: 'stacked' },
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
              options={[{ label: 'All', value: 'all' }, ...logTypesForDropDown]}
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
        {isChartGenerated && !chartLoading && (
          <div className={styles.chart_display}>
            <Chart
              chartType={chartTypeForChart.value}
              data={formatedChartData(chartTypeForChart, chart)}
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
            <Table
              columns={logTimeTableColumns(handlesetRowDataForEdit, styles)}
              dataSource={logs}
              tableBodyStyle={{ backgroundColor: '#fff' }}
              pagination={false}
              loading={{ spinning: loading, indicator: <Loader /> }}
            />
            {logAuthorFiltered.value === '' && logTypeFiltered.value === '' && (
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLog
