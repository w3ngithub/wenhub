import React from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'

export const Paginate = ({
  handlePageChange,
  length,
  pageSize,
  style,
  currentPage,
  pageSizeOptions,
  showSizeChanger,
}) => (
  <Pagination
    total={length}
    onChange={handlePageChange}
    pageSizeOptions={pageSizeOptions}
    pageSize={pageSize}
    responsive
    style={style}
    current={currentPage}
    showSizeChanger={showSizeChanger}
  />
)

Paginate.defaultProps = {
  pageSizeOptions: [5, 10, 20],
  currentPage: 1,
  showSizeChanger: false,
}

Paginate.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  style: PropTypes.object,
  currentPage: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  showSizeChanger: PropTypes.bool,
}

// export const listData = (array = [], pageSize = 5, pageNumber = 1) => {
//   const indexOfLastPost = pageSize * pageNumber
//   const indexOfFirstPost = indexOfLastPost - pageSize
//   return array.slice(indexOfFirstPost, indexOfLastPost)
// }
