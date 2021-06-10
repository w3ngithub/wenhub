import React from 'react'
import { Pagination } from 'antd';

export const Paginate = ({
    handlePageChange,
    length,
    pageSize
}) => {

    return <Pagination
        total={length}
        onChange={handlePageChange}
        pageSizeOptions={[5, 10, 20]}
        pageSize={pageSize}
        responsive={true}
    />
}

export const listData = (array = [], page_size = 5, page_number = 1) => {
    const indexOfLastPost = page_size * page_number
    const indexOfFirstPost = indexOfLastPost - page_size
    return array.slice(indexOfFirstPost, indexOfLastPost)
}