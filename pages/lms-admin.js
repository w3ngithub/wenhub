import React from 'react'
import LmsAdmin from 'components/templates/LmsAdmin'
import { wrapper } from 'redux/store'
import { fetchLeaveFields } from 'redux/common/commonActions'
import { lmsAdminServerDataFetch } from 'redux/lms/lmsActions'
import useTokenValidation from 'hooks/useTokenValidation'

function LmsAdminPage() {
  useTokenValidation()
  return <LmsAdmin />
}

export default LmsAdminPage

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch } = store

  await dispatch(fetchLeaveFields())
  await dispatch(lmsAdminServerDataFetch())

  return { props: {}, revalidate: 60 }
})
