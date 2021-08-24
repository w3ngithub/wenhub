import HTMLReactParser from 'html-react-parser'
import React from 'react'
import { connect } from 'react-redux'

function LmsFaq({ faq }) {
  return <div style={{ color: 'black' }}>{HTMLReactParser(faq)}</div>
}

const mapStateToProps = ({ lmsData: { faq } }) => ({ faq })

export default connect(mapStateToProps)(LmsFaq)
