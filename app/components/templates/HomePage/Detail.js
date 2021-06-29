import React from 'react'

const Detail = ({ columns, styles, detail }) => (
  <table className={`${styles.detailTable}`}>
    <tbody>
      {columns
        .filter(
          (x) =>
            x.keyIndex !== 'key' &&
            x.keyIndex !== 'name' &&
            x.keyIndex !== 'time_log',
        )
        .map((col) => (
          <tr>
            <th className={`${styles.tableHead}`}>{col.title}</th>
            <td className={`${styles.tableData}`}>{detail[col.keyIndex]}</td>
          </tr>
        ))}
    </tbody>
  </table>
)

export default Detail
