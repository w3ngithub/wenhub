import React from 'react'
import { wrapper } from 'redux/store'
import { fetchProjects } from 'redux/project/projectActions'
import HomePage from 'components/templates/HomePage/HomePage'
import { connect } from 'react-redux'
import { fetchFilterOptionLists } from 'redux/common/commonActions'

function Home(props) {
  return (
    <div>
      <HomePage projects={props.projects} filterType={props.filterType} />
    </div>
  )
}

const mapStateToProps = ({
  projectData: { projects, loading, error },
  commonData: { filterType },
}) => ({
  projects,
  loading,
  error,
  filterType,
})

export default connect(mapStateToProps)(Home)

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch } = store
  await dispatch(fetchFilterOptionLists())
  await dispatch(fetchProjects())
})
