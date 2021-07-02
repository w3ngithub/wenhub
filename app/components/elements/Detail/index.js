import React from 'react'
import styles from './styles.module.css'

const Detail = ({ columns, detail }) => (
  <table className={`${styles.detailTable}`}>
    {console.log(detail)}
    <tbody>
      {columns?.map((col) => (
        <tr>
          <th className={`${styles.tableHead}`}>{col.title}</th>
          <td className={`${styles.tableData}`}>{detail[col.keyIndex]}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Detail
