import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const { Column } = Table
const ListTable = ({ columns, data, loading }) => (
  <Table loading={loading} dataSource={data} pagination={false}>
    {columns.map(({ title, keyIndex, style, ...col }) => (
      <Column
        title={title}
        dataIndex={keyIndex}
        key={keyIndex}
        {...col}
        render={(text) => ({
          props: {
            style,
          },
          children: text,
        })}
      />
    ))}
  </Table>
)

ListTable.defaultProps = {
  columns: [
    {
      title: 'Name',
      keyIndex: 'name',
    },
    {
      title: 'Age',
      keyIndex: 'age',
    },
    {
      title: 'Address',
      keyIndex: 'address',
    },
    {
      title: 'Actions',
      keyIndex: 'edit',
    },
  ],
  data: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      edit: (
        <button type="button" onClick={() => {}}>
          Edit
        </button>
      ),
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      edit: (
        <button type="button" onClick={() => {}}>
          Edit
        </button>
      ),
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      edit: (
        <button type="button" onClick={() => {}}>
          Edit
        </button>
      ),
    },
  ],
}

ListTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.object,
}

export default ListTable
