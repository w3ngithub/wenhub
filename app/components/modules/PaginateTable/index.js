import React from 'react'
import Table from 'components/elements/Table'
import { Paginate } from 'components/elements/Pagination'
import styles from './styles.module.css'

const PaginateTable = ({
  columns,
  data,
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
      <div className={styles.homePage_table}>
        <Table columns={columns} data={data} />
      </div>
      <div style={{ marginTop: 25 }}></div>
      {data.length > 0 && (
        <Paginate
          handlePageChange={changePage}
          length={+totalData}
          pageSize={postPerPage}
          currentPage={currentPage}
        />
      )}
    </>
  )
}

PaginateTable.defaultProps = {
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
