import React from 'react'
import Lms from 'components/templates/Lms'
import { wrapper } from 'redux/store'
import { fetchLeaveFields } from 'redux/common/commonActions'
import {
  fetchLmsArchiveTypes,
  fetchLmsFaq,
  fetchLmsLeave,
} from 'redux/lms/lmsActions'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'

function LmsPage({ teamLeads }) {
  return (
    <>
      <Lms teamLeads={teamLeads} />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { dispatch, getState } = store
    const {
      userData: { userDetail },
    } = getState()
    if (Object.values(userDetail).length === 0) {
      return {
        redirect: {
          destination: '/wp-login',
        },
      }
    }
    await dispatch(fetchLeaveFields())
    const teamLeads = await restClient.get(`${API_URL}/users/team_leads`)
    await dispatch(fetchLmsLeave(1, 10, userDetail.user_id))
    await dispatch(fetchLmsFaq())
    await dispatch(fetchLmsArchiveTypes())
    return { props: { teamLeads: teamLeads.data } }
  },
)

export default LmsPage
