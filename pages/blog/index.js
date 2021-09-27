import React from 'react'
import Blog from 'components/templates/Blog'
import { wrapper } from 'redux/store'
import { fetchBlogs } from 'redux/blog/blogActions'
import { fetchCategories } from 'redux/common/commonActions'

function BlogPage() {
  return <Blog />
}

export default BlogPage

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch } = store
  await dispatch(fetchCategories())
  await dispatch(fetchBlogs())
  return { props: { revalidate: 60 } }
})
