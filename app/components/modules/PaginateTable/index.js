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

export default PaginateTable
