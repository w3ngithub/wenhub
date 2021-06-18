import React from 'react'
import Table from 'components/elements/Table'
import { Paginate, listData } from 'components/elements/Pagination'

const PaginateTable = ({ columns, data, tableBodyStyle }) => {
  const [pageNumber, setPageNumber] = React.useState(1)
  const [postPerPage, setPostPerPage] = React.useState(5)

  const changePage = (pageNo, pageSize) => {
    setPageNumber(pageNo)
    setPostPerPage(pageSize)
  }
  const finalData = listData(data, postPerPage, pageNumber)

  return (
    <div>
      <Table
        columns={columns}
        data={finalData}
        tableBodyStyle={tableBodyStyle}
      />
      <div style={{ marginTop: 10 }}></div>
      <Paginate
        handlePageChange={changePage}
        length={data.length}
        pageSize={postPerPage}
      />
    </div>
  )
}

PaginateTable.defaultProps = {
  tableBodyStyle: {
    background: '#ddd',
  },
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
      edit: <button onClick={() => console.log(1)}>Edit</button>,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      edit: <button onClick={() => console.log(2)}>Edit</button>,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      edit: <button onClick={() => console.log(3)}>Edit</button>,
    },
  ],
}

export default PaginateTable
