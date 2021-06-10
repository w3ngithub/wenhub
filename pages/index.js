import React from 'react'
import Table from 'components/elements/Table'
import { Paginate, listData } from 'components/elements/Pagination'
const columns = [
  {
    title: "Name",
    keyIndex: "name",
    sorting: (a, b) => a.name > b.name
  },
  {
    title: "Age",
    keyIndex: "age",
    sorting: (a, b) => a.age - b.age
  },
  {
    title: "Address",
    keyIndex: "address",
    sorting: (a, b) => a.address > b.address
  },
  {
    title: "Actions",
    keyIndex: "edit",
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    edit: <button onClick={() => console.log(1)}>Edit</button>
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    edit: <button onClick={() => console.log(2)}>Edit</button>
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(3)}>Edit</button>
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(4)}>Edit</button>
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(5)}>Edit</button>
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(6)}>Edit</button>
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(7)}>Edit</button>
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(8)}>Edit</button>
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(9)}>Edit</button>
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(10)}>Edit</button>
  },
  {
    key: '11',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    edit: <button onClick={() => console.log(11)}>Edit</button>
  },
]

function Home() {

  const [pageNumber, setPageNumber] = React.useState(1)
  const [postPerPage, setPostPerPage] = React.useState(5)

  const changePage = (pageNo, pageSize) => {
    setPageNumber(pageNo)
    setPostPerPage(pageSize)
  }
  const finalData = listData(data, postPerPage, pageNumber)
  return (
    <div>
      <Table data={finalData} columns={columns} />
      <Paginate
        handlePageChange={changePage}
        length={data.length}
        pageSize={postPerPage}
      />
    </div>
  )
}

export default Home
