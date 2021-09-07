import React from 'react'
import Tms from 'components/templates/Tms'
import { wrapper } from 'redux/store'

function TmsPage() {
  return <Tms />
}

export const getStaticProps = wrapper.getStaticProps(() => () => ({
  props: { noCard: true },
}))

export default TmsPage
