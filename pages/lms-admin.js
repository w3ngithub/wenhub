import React from 'react'
import LmsAdmin from 'components/templates/LmsAdmin'
import { wrapper } from 'redux/store'
import { fetchLeaveFields } from 'redux/common/commonActions'
import {
  allLeavesCalendarFetch,
  allUserFetch,
  allUsersLeavvesRemainingFetch,
  fetchLmsApproved,
  fetchLmsCancelled,
  fetchLmsPending,
} from 'redux/lms/lmsActions'

function LmsAdminPage() {
  return <LmsAdmin />
}

export default LmsAdminPage

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
    await dispatch(fetchLmsPending(1, 10, 150))
    await dispatch(fetchLmsApproved(1, 10, 151))
    await dispatch(fetchLmsCancelled(1, 10, 152))
    await dispatch(allUsersLeavvesRemainingFetch())
    await dispatch(allUserFetch(100, 1))
    await dispatch(allLeavesCalendarFetch())
    return { props: {} }
  },
)
