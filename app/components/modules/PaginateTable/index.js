import React from 'react'
import Table from 'components/elements/Table'
import { Paginate } from 'components/elements/Pagination'

const PaginateTable = ({
  columns,
  data,
  tableBodyStyle,
  handlePagination,
  postPerPage,
  totalData,
  currentPage,
}) => {
  const changePage = (pageNo, pageSize) => {
    handlePagination(pageNo, pageSize)
  }

  return (
    <>
      <Table columns={columns} data={data} tableBodyStyle={tableBodyStyle} />
      <div style={{ marginTop: 15 }}></div>
      <Paginate
        handlePageChange={changePage}
        length={+totalData}
        pageSize={postPerPage}
        currentPage={currentPage}
      />
    </>
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
      edit: (
        <button type="button" onClick={() => console.log(1)}>
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
        <button
          type="button"
          onClick={() => {
            console.log(2)
          }}
        >
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
        <button type="button" onClick={() => console.log(3)}>
          Edit
        </button>
      ),
    },
  ],
}

export default PaginateTable
