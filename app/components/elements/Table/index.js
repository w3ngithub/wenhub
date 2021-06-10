import React from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd'
import styles from './table.module.css'
import { Paginate, listData } from '../Pagination';

const { Column } = Table


const ListTable = ({
    columns,
    data,
}) => {


    // const [pageNumber, setPageNumber] = React.useState(1)
    // const [postPerPage, setPostPerPage] = React.useState(10)

    // const changePage = (pageNo, pageSize) => {
    //     setPageNumber(pageNo)
    //     setPostPerPage(pageSize)
    // }


    // const finalData = listData(data, postPerPage, pageNumber)

    return (
        <div>
            <Table
                dataSource={data}
                pagination={false}
            >
                {
                    columns.map(col => (
                        <Column
                            title={col.title}
                            dataIndex={col.keyIndex}
                            key={col.keyIndex}
                            render={(text) => text} />
                    ))
                }
            </Table>
            {/* <Paginate
                handlePageChange={changePage}
                length={data.length}
            /> */}
        </div>
    )
}

ListTable.defaultProps = {
    columns: [
        {
            title: "Name",
            keyIndex: "name"
        },
        {
            title: "Age",
            keyIndex: "age"
        },
        {
            title: "Address",
            keyIndex: "address"
        }
    ],
    data: [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '5',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '6',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '7',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '8',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '9',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '10',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '11',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }
    ]
}

ListTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

export default ListTable
