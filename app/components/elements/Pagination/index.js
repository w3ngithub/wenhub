import React from 'react'
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

export const Paginate = ({
    handlePageChange,
    length,
    pageSize,
    style
}) => {

    return <Pagination
        total={length}
        onChange={handlePageChange}
        pageSizeOptions={[5, 10, 20]}
        pageSize={pageSize}
        responsive={true}
        style={style}
    />
}

Paginate.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    style: PropTypes.object
}

export const listData = (array = [], page_size = 5, page_number = 1) => {
    const indexOfLastPost = page_size * page_number
    const indexOfFirstPost = indexOfLastPost - page_size
    return array.slice(indexOfFirstPost, indexOfLastPost)
}