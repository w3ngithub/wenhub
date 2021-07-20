import React from 'react'
import Login from 'components/templates/Login'

function LoginPage() {
  return (
    <>
      <Login />
    </>
  )
}

export const getStaticProps = () => ({
  props: { noHeader: true, noCard: true, isLogin: true },
})

export default LoginPage
