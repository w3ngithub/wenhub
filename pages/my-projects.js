import React from 'react'
import { wrapper } from 'redux/store'
import { fetchProjects } from 'redux/project/projectActions'
import HomePage from 'components/templates/HomePage/HomePage'
import { fetchFilterOptionLists } from 'redux/common/commonActions'
import useTokenValidation from 'hooks/useTokenValidation'

function MyProjectsPage() {
  useTokenValidation()

  return <HomePage />
}

export default MyProjectsPage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { dispatch, getState } = store
    const {
      commonData: {
        filterType: { designers, developers },
      },
      userData: { userDetail },
    } = getState()
    if (Object.values(userDetail).length === 0) {
      return {
        redirect: {
          destination: '/wp-login',
        },
      }
    }
    await dispatch(fetchFilterOptionLists())
    if (designers.some((x) => x.id === userDetail.user_id)) {
      await dispatch(fetchProjects('designer', userDetail.user_id))
    }
    if (developers.some((x) => x.id === userDetail.user_id)) {
      await dispatch(fetchProjects('developer', userDetail.user_id))
    }
    return { props: {} }
  },
)
