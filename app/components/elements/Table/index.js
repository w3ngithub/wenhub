import React from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd'
import styles from './table.module.css'

const { Column } = Table


const ListTable = ({
    columns,
    data
}) => {

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
                            sorter={col.sorting}
                            key={col.keyIndex}
                            render={(text) => {
                                return {
                                    props: {
                                        style:{background:'red'}
                                    },
                                    children: text
                                }
                            }} />
                    ))
                }
            </Table>

        </div>
    )
}

ListTable.defaultProps = {
    // columns: [
    //     {
    //         title: "Name",
    //         keyIndex: "name"
    //     },
    //     {
    //         title: "Age",
    //         keyIndex: "age"
    //     },
    //     {
    //         title: "Address",
    //         keyIndex: "address"
    //     }
    // ],
    // data : [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(1)}>Edit</button>
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(2)}>Edit</button>
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(3)}>Edit</button>
    //     },
    //     {
    //       key: '4',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(4)}>Edit</button>
    //     },
    //     {
    //       key: '5',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(5)}>Edit</button>
    //     },
    //     {
    //       key: '6',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(6)}>Edit</button>
    //     },
    //     {
    //       key: '7',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(7)}>Edit</button>
    //     },
    //     {
    //       key: '8',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(8)}>Edit</button>
    //     },
    //     {
    //       key: '9',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(9)}>Edit</button>
    //     },
    //     {
    //       key: '10',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(10)}>Edit</button>
    //     },
    //     {
    //       key: '11',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       edit: <button onClick={() => console.log(11)}>Edit</button>
    //     },
    //   ]
}

ListTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

export default ListTable
