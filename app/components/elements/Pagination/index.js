import React from 'react'
import { Pagination } from 'antd';

export const Paginate = ({
    handlePageChange,
    length
}) => {

    return <Pagination total={length} onChange={handlePageChange} itemRender />
}

export const listData = (array = [], page_size, page_number) => {
    const indexOfLastPost = page_size * page_number
    const indexOfFirstPost = indexOfLastPost - page_size
    return array.slice(indexOfFirstPost, indexOfLastPost)
}