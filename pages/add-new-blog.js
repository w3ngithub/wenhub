import React from 'react'
import AddBlog from 'components/templates/AddBlog'
import { wrapper } from 'redux/store'
import { fetchCategories } from 'redux/common/commonActions'
import useTokenValidation from 'hooks/useTokenValidation'

function AddBlogPage() {
  useTokenValidation()
  return <AddBlog />
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchCategories())
  return { props: {} }
})
export default AddBlogPage
