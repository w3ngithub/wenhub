import React, { useEffect, useState } from 'react'
import FormField from 'components/elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import moment from 'moment'
import styles from './styles.module.css'

function TmsAttendanceRecordHeader({ children }) {
  const [weekOrMonth, setweekOrMonth] = useState({
    label: 'This Week',
    value: '1',
  })
  const [dates, setDates] = useState([moment().startOf('isoWeek'), moment()])

  useEffect(() => {
    const selectedDates = () => {
      if (weekOrMonth.value === '1')
        return [
          moment().startOf('isoWeek'),
          moment().startOf('isoWeek').add('4', 'days'),
        ]
      if (weekOrMonth.value === '2')
        return [
          moment().startOf('isoWeek').subtract('7', 'days'),
          moment().startOf('isoWeek').subtract('7', 'days').add('4', 'days'),
        ]
      if (weekOrMonth.value === '3')
        return [moment().startOf('month'), moment()]

      return [
        moment().startOf('month').subtract('1', 'month'),
        moment().startOf('month').subtract('1', 'month').endOf('month'),
      ]
    }
    setDates(selectedDates)
  }, [weekOrMonth.value])

  const handleReset = () => {
    setweekOrMonth({
      label: 'This Week',
      value: '1',
    })
    setDates([moment().startOf('isoWeek'), moment()])
  }

  const handleFilter = () => {
    console.log(dates, weekOrMonth)
  }

  return (
    <div className={styles.tms_attendance_record_container}>
      {children}
      <div className={styles.record_filter_container}>
        <FormField
          value={dates}
          isRange
          component="DatePicker"
          style={{
            borderRadius: '3px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
          }}
          format="DD/MM/YYYY"
          onChange={(e) => {
            setDates(e)
          }}
        />
        <SelectComponent
          showSearch={false}
          value={weekOrMonth}
          options={[
            { label: 'This Week', value: '1' },
            { label: 'Last week', value: '2' },
            { label: 'This month', value: '3' },
            { label: 'Last month', value: '4' },
          ]}
          style={{
            minWidth: '120px',
            textAlign: 'left',
            fontSize: '0.7rem',
            fontWeight: 'bold',
          }}
          onChange={(val) => setweekOrMonth(val)}
        />
        <div className={styles.actions}>
          <ButtonComponent
            btnText="Filter"
            htmlType="button"
            onClick={handleFilter}
          />
          <ButtonComponent
            btnText="Reset"
            htmlType="button"
            danger
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  )
}

export default TmsAttendanceRecordHeader
