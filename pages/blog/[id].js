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

export const getStaticPaths = async () => {
  const res = await api.get(`${API_URL}/posts?per_page=100&_fields=id`)
  const { data } = res
  return {
    paths: data.map((x) => ({ params: { id: `${x.id}` } })),
    fallback: false,
  }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { dispatch } = store
      await dispatch(fetchCategories())
      await dispatch(fetchDetailBlog(params.id))
      await dispatch(allUserFetch(100, 1))

      const blogs = await api.get(`${API_URL}/posts?per_page=100`)
      return {
        props: {
          blogs: blogs.data,
        },
        revalidate: 3600,
      }
    },
)
