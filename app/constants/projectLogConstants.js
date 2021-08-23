import { formatData } from 'utils/formatData'
import { tableBodyStyle } from './constants'

export const TimeSummaryTableData = (
  estimatedHours,
  totalTimeSpent,
  weeklyTimeSpent,
) => [
  {
    id: '1',
    name: 'Estimated Hours',
    time: formatData(estimatedHours) || '',
  },
  {
    id: '2',
    name: 'Time Spent',
    time: formatData(totalTimeSpent) || '',
  },
  {
    id: '3',
    name: 'Time Spent This Week',
    time: formatData(weeklyTimeSpent) || '',
  },
]

export const logTimeTableColumns = (handlesetRowDataForEdit, styles) => [
  {
    key: 'date',
    title: 'DATE',
    keyIndex: 'date',
    dataIndex: 'date',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
  },
  {
    key: 'hours',
    title: 'HOURS',
    keyIndex: 'hours',
    dataIndex: 'hours',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
  },
  {
    key: 'log_type',
    title: 'LOG TYPE',
    keyIndex: 'log_type',
    dataIndex: 'log_type',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
  },
  {
    key: 'remarks',
    title: 'REMARKS/DESCRIPTION',
    keyIndex: 'remarks',
    dataIndex: 'remarks',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
  },
  {
    key: 'added_by',
    title: 'ADDED BY',
    keyIndex: 'added_by',
    dataIndex: 'added_by',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
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
]
