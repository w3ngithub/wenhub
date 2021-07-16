import axios from 'axios'
import { blogSlice } from './blogSlice'
import * as requestFromServer from './blogCrud'

const {
  setPage,
  blogsFetching,
  blogsFetchSuccess,
  blogsFetchError,
  blogDetailFetching,
  blogDetailFetchSuccess,
  blogDetailFetchError,
} = blogSlice.actions

export const changePage = (data) => (dispatch) => dispatch(setPage({ data }))

export const fetchBlogs = () => (dispatch) => {
  dispatch(blogsFetching())
  return requestFromServer
    .getBlogs()
    .then((res) => {
      dispatch(
        blogsFetchSuccess({
          data: res.data,
          totalData: res.headers['x-wp-total'],
        }),
      )
    })
    .catch((err) => {
      dispatch(blogsFetchError({ error: 'Sending Error' }))
      console.log(err)
    })
}

export const fetchFilteredBlogs =
  (searchBlog, pageNo, pageSize) => async (dispatch) => {
    dispatch(blogsFetching())
    const params = new URLSearchParams()
    if (searchBlog?.length > 0) params.append('search_blog', searchBlog)
    params.append('page', pageNo)
    params.append('perPage', pageSize)
    const request = { params }
    try {
      const response = await axios('/api/blog', request)
      dispatch(
        blogsFetchSuccess({
          data: response.data.data,
          totalData: response.data.totalData,
        }),
      )
    } catch (err) {
      dispatch(blogsFetchError({ error: 'Sending Error' }))
      console.log(err)
    }
  }

export const fetchDetailBlog = (id) => (dispatch) => {
  dispatch(blogDetailFetching())
  return requestFromServer
    .getDetailBlog(id)
    .then((res) => {
      dispatch(blogDetailFetchSuccess({ data: res.data }))
    })
    .catch((err) => {
      dispatch(blogDetailFetchError({ error: 'Sending Error' }))
      console.log(err)
    })
}
