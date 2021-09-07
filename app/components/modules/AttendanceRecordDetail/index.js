import React from 'react'
import styles from './styles.module.css'

function AttendanceRecordDetail({ details = {} }) {
  const { type, date, day, punchInTime, punchOutTime, officeHour } = details
  return (
    <div className={styles.model_container}>
      <div className={styles.rowDetail}>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Type</div>
          <div className={styles.itemValue}>{type}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Date</div>
          <div className={styles.itemValue}>{date}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Day</div>
          <div className={styles.itemValue}>{day}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Punch-in Time</div>
          <div className={styles.itemValue}>{punchInTime}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Punch-out Time</div>
          <div className={styles.itemValue}>{punchOutTime}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemHeading}>Office Hour</div>
          <div
            className={styles.itemValue}
            style={
              +officeHour < 9 ? { color: '#FF4D4F' } : { color: '#545454' }
            }
          >
            {officeHour}hr
          </div>
        </div>
      </div>
      <div className={styles.punch_in_note}>
        <div className={styles.itemHeading}>Punch-in Note</div>
        <div className={styles.note}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum
          odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque
          cupiditate consectetur voluptatem expedita. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Exercitationem aspernatur nulla at
          eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam
          ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem
          expedita. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum
          odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque
          cupiditate consectetur voluptatem expedita.
        </div>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.punch_in_note}>
        <div className={styles.itemHeading}>Punch-out Note</div>
        <div className={styles.note}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum
          odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque
          cupiditate consectetur voluptatem expedita. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Exercitationem aspernatur nulla at
          eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam
          ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem
          expedita. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum
          odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque
          cupiditate consectetur voluptatem expedita.
        </div>
      </div>
    </div>
  )
}

export default AttendanceRecordDetail
