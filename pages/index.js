import React from 'react'
import { wrapper } from 'redux/store'
import { fetchProjects } from 'redux/project/projectActions'
import HomePage from 'components/templates/HomePage/HomePage'
import { fetchFilterOptionLists } from 'redux/common/commonActions'
// import { useDispatch } from 'react-redux'

function Home() {
  // const dispatch = useDispatch()
  // React.useEffect(() => () => dispatch(resetProject()), [dispatch])
  return <HomePage />
}

export default Home

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch } = store
  await dispatch(fetchFilterOptionLists())
  await dispatch(fetchProjects())
  return {
    revalidate: 60,
  }
})
