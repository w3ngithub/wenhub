import React from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd'

const { Column } = Table

const ListTable = ({
    columns,
    data,
    tableBodyStyle
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
                                        style: tableBodyStyle
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
    tableBodyStyle: {
        background: "ccff33"
    },
    columns: [
        {
            title: "Name",
            keyIndex: "name",
            sorting: (a, b) => a.name > b.name
        },
        {
            title: "Age",
            keyIndex: "age"
        },
        {
            title: "Address",
            keyIndex: "address"
        },
        {
            title: "Actions",
            keyIndex: "edit",
        }
    ],
    data: [
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
        }
    ]
}

ListTable.propTypes = {
    tableBodyStyle: PropTypes.object,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
}

export default ListTable
