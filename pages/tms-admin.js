import TMSAdmin from 'components/templates/TmsAdmin'
import React from 'react'
import { wrapper } from 'redux/store'

function TmsAdmin() {
  return <TMSAdmin />
}

export const getStaticProps = wrapper.getStaticProps(() => () => ({
  props: { noCard: true },
}))

export default TmsAdmin
