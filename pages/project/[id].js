import React from 'react'
import { wrapper } from 'redux/store'
import ProjectLog from 'components/templates/ProjectLog'
import httpCall from 'api/restClient'
import {
  fetchProjectLogs,
  fetchProjectDetailForTimeLog,
  fetchWeeklyTimeSpent,
  fetchTotalTimeSpent,
} from 'redux/projectLog/projectLogAction'
import { fetchFilterOptionLists } from 'redux/common/commonActions'
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
      await store.dispatch(fetchProjectDetailForTimeLog(params.id))
      await store.dispatch(fetchFilterOptionLists())
      await store.dispatch(fetchTotalTimeSpent(params.id))
      await store.dispatch(fetchWeeklyTimeSpent(params.id))

      return {
        revalidate: 1,
      }
    },
)

export default GotoLogPage
