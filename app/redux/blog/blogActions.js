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

    try {
      const res = await requestFromServer.filterBlogs(
        searchBlog,
        pageNo,
        pageSize,
      )
      dispatch(
        blogsFetchSuccess({
          data: res.data,
          totalData: res.headers['x-wp-total'],
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

export const fetchBlogsByCategory = (categoryId) => (dispatch) => {
  dispatch(blogsFetching())
  return requestFromServer
    .getBlogByCategory(categoryId)
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
