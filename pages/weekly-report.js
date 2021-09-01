import React from 'react'
import WeeklyReport from 'components/templates/WeeklyReport'
import { wrapper } from 'redux/store'
import { clientAndProjectStatusFetch } from 'redux/common/commonActions'
import { fetchLogTypes } from 'redux/projectLog/projectLogAction'
import useTokenValidation from 'hooks/useTokenValidation'

function WeeklyReportPage() {
  useTokenValidation()
  return (
    <>
      <WeeklyReport />
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchLogTypes())
  await store.dispatch(clientAndProjectStatusFetch())
  return { props: {} }
})

export default WeeklyReportPage
