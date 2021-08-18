import React from 'react'
import LogTime from 'components/templates/LogTime'
import useTokenValidation from 'hooks/useTokenValidation'
import { wrapper } from 'redux/store'

function LogTimePage() {
  useTokenValidation()
  return (
    <>
      <LogTime />
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(() => () => ({
  revalidate: 60,
}))

export default LogTimePage
