import { tableBodyStyle } from './constants'

export const labels = [
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
export const values = [12, 9, 5, 5, 6, 3, 3, 4, 6, 7, 4, 5, 7]

export const TimeSummaryTableData = [
  { id: '1', name: 'Estimated Hours', time: 50 },
  {
    id: '2',
    name: 'Time Spent',
    time: 30,
  },
  { id: '3', name: 'Time Spent This Weeks', time: 10 },
]

export const chartLogTypesOptions = [
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
]

export const backGroundColorOfChartItems = [
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
