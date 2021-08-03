import { tableBodyStyle } from './constants'

export const logTimeTableColumns = (handlesetRowDataForEdit, styles) => [
  {
    key: 'project_name',
    title: 'Project',
    keyIndex: 'project_name',
    dataIndex: 'project_name',
    render: (text) => ({
      props: {
        style: tableBodyStyle,
      },
      children: text,
    }),
  },
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
