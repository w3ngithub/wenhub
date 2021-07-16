import React from 'react'
import api from 'api/restClient'
import BlogDetail from 'components/templates/BlogDetail'
import { API_URL } from 'constants/constants'
import { fetchDetailBlog } from 'redux/blog/blogActions'
import { wrapper } from 'redux/store'
import { fetchCategories } from 'redux/common/commonActions'

function BlogDetailPage({ blogs }) {
  return <BlogDetail blogs={blogs} />
}

export default BlogDetailPage

export const getStaticPaths = async () => {
  const res = await api.get(`${API_URL}/posts?_fields=id`)
  const { data } = res
  return {
    paths: data.map((x) => ({ params: { id: `${x.id}` } })),
    fallback: true,
  }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { dispatch } = store
      await dispatch(fetchCategories())
      await dispatch(fetchDetailBlog(params.id))
      const blogs = await api.get(`${API_URL}/posts`)
      return {
        props: {
          blogs: blogs.data,
        },
      }
    },
)
