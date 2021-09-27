import React from 'react'
import api from 'api/restClient'
import BlogDetail from 'components/templates/BlogDetail'
import { API_URL } from 'constants/constants'
import { fetchDetailBlog } from 'redux/blog/blogActions'
import { wrapper } from 'redux/store'
import { fetchCategories } from 'redux/common/commonActions'
import { allUserFetch } from 'redux/lms/lmsActions'

function BlogDetailPage({ blogs }) {
  return <BlogDetail blogs={blogs} />
}

export default BlogDetailPage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { dispatch, getState } = store
      const {
        blogData: {
          page: { offset },
        },
      } = getState()
      await dispatch(fetchCategories())
      await dispatch(fetchDetailBlog(params.id))
      await dispatch(allUserFetch(100, 1))

      // Fetching max 3 data only for next and previous along
      // -1 is done to get previous index for previous data
      const blogs = await api.get(
        `${API_URL}/posts?per_page=3&&offset=${offset === 0 ? 0 : offset - 1}`,
      )
      return {
        props: {
          blogs: blogs.data,
        },
      }
    },
)
