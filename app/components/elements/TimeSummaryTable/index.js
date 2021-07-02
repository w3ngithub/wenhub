import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

function TimeSummaryTable({ data }) {
  return (
    <table className={`${styles.table}`}>
      <thead>
        <tr>
          <th className={`${styles.tableHeader1}`}>TIME SUMMARY</th>
          <th className={`${styles.tableHeader2}`}>TIME</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            style={{
              backgroundColor: item.backgroundColor || '',
              color: item.color || '',
            }}
          >
            <td className={`${styles.tableHead}`}>{item.name}</td>
            <td className={`${styles.tableData}`}>{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

TimeSummaryTable.propTypes = {
  data: PropTypes.array,
}

TimeSummaryTable.defaultProps = {
  data: [],
}

export default TimeSummaryTable
