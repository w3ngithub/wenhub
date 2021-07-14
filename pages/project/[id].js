import React from 'react'
import { wrapper } from 'redux/store'
import ProjectLog from 'components/templates/ProjectLog'
import httpCall from 'api/restClient'
import { fetchProjectLogs } from 'redux/projectLog/projectLogAction'
import { API_URL } from 'constants/constants'

function GotoLogPage() {
  return (
    <>
      <ProjectLog />
    </>
  )
}

export const getStaticPaths = async () => {
  const data = await httpCall.get(`${API_URL}/projects`)
  const paths = data.data?.map((project) => ({
    params: { id: `${project.id}` },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchProjectLogs(params.id))
      return {
        revalidate: 60,
      }
    },
)

export default GotoLogPage
