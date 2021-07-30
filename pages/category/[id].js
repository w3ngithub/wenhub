import React from 'react'
import CategoryDetail from 'components/templates/CategoryDetail'
import { wrapper } from 'redux/store'
import { fetchCategories, fetchCategoryById } from 'redux/common/commonActions'
import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'
import { fetchBlogsByCategory } from 'redux/blog/blogActions'

function CategoryDetailPage() {
  return <CategoryDetail />
}

export default CategoryDetailPage

export const getStaticPaths = async () => {
  const res = await restClient.get(`${API_URL}/categories?_field=id`)
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
      await dispatch(fetchCategoryById(params.id))
      await dispatch(fetchCategories())
      await dispatch(fetchBlogsByCategory(params.id))
    },
)
