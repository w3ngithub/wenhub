import React from 'react'
import styles from './styles.module.css'

function WeeklyReportHeading() {
  return (
    <div className={styles.heading_container}>
      <h1>Weekly Project Time Summary</h1>
      <h2>Includes all time, research , bug-fixing etc.</h2>
      <strong>
        <i>
          The times shown are for ALL Project from Monday to Friday this week
        </i>
      </strong>
    </div>
  )
}

export default WeeklyReportHeading
