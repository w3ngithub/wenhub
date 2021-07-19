import React from 'react'
import { wrapper } from 'redux/store'
import { fetchProjects } from 'redux/project/projectActions'
import HomePage from 'components/templates/HomePage/HomePage'
import { fetchFilterOptionLists } from 'redux/common/commonActions'

function MyProjectsPage() {
  return <HomePage />
}

export default MyProjectsPage

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch } = store
  await dispatch(fetchFilterOptionLists())
  const data = await dispatch(fetchProjects('designer', 31))
  if (data.length === 0) {
    await dispatch(fetchProjects('developer', 31))
  }
})
