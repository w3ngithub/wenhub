import React, { useState } from 'react'
import WeeklyReportForm from 'components/modules/weeklyReportForm'
import WeeklyReportTable from 'components/modules/WeeklyReportTable'
import WeeklyReportHeading from './WeeklyReportHeading'
import styles from './styles.module.css'

function WeeklyReport() {
  const [searchedPorject, setSearchedProject] = useState('')

  const handleSearchProject = (e) => {
    setSearchedProject(e.target.value)
  }

  const searchReset = () => {
    setSearchedProject('')
  }
  return (
    <div className={styles.weekly_report_container}>
      <WeeklyReportHeading />
      <WeeklyReportForm searchReset={searchReset} />
      <WeeklyReportTable
        searchedPorject={searchedPorject}
        handleSearchProject={handleSearchProject}
      />
    </div>
  )
}

export default WeeklyReport
