import React from 'react'
import Lms from 'components/templates/Lms'
import { wrapper } from 'redux/store'
import { fetchLeaveFields } from 'redux/common/commonActions'
import { lmsServerFetch } from 'redux/lms/lmsActions'

function LmsPage() {
  return (
    <>
      <Lms />
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
    await dispatch(lmsServerFetch(userDetail.user_id))
    return { props: {} }
  },
)

export default LmsPage
