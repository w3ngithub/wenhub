import React from 'react'
import Login from 'components/templates/Login'

function LoginPage({ history }) {
  return (
    <>
      <Login history={history} />
    </>
  )
}

export const getStaticProps = () => ({
  props: { noHeader: true, noCard: true, isLogin: true },
})

export default LoginPage
