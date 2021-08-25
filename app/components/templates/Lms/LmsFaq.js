import HTMLReactParser from 'html-react-parser'
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.css'

function LmsFaq({ faq }) {
  return (
    <div style={{ color: 'black' }} className={styles.faq}>
      {HTMLReactParser(faq)}
    </div>
  )
}

const mapStateToProps = ({ lmsData: { faq } }) => ({ faq })

export default connect(mapStateToProps)(LmsFaq)
