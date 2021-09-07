import ButtonComponent from 'components/elements/Button'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from '@react-icons/all-files/io/IoIosAddCircleOutline'
import FormField from 'components/elements/Form'
import moment from 'moment'
import SelectComponent from 'components/elements/Select'
import { selectedDates } from 'utils/getSelectedDays'
import Modals from 'components/elements/Modal'
import { GiAlarmClock } from '@react-icons/all-files/gi/GiAlarmClock'
import LiveTime from 'components/elements/LiveTime'
import styles from './styles.module.css'

function TmsAdminHeader() {
  const [isModelOpenView, setOpenModelView] = useState(false)
  const [weekOrMonth, setweekOrMonth] = useState({
    label: 'This Week',
    value: '1',
  })
  const [dates, setDates] = useState([
    moment().startOf('isoWeek'),
    moment().startOf('isoWeek').add('4', 'days'),
  ])
  const [user, setUser] = useState({})

  useEffect(() => {
    setDates(selectedDates(weekOrMonth))
  }, [weekOrMonth.value])

  const handleReset = () => {
    setweekOrMonth({
      label: 'This Week',
      value: '1',
    })
    setDates([
      moment().startOf('isoWeek'),
      moment().startOf('isoWeek').add('4', 'days'),
    ])
    setUser({})
  }
  const handleFilter = () => {
    console.log(weekOrMonth, dates, user)
  }

  return (
    <>
      <div className={styles.header}>
        <h4 className={styles.tms_heading}>Attendance Record</h4>
        <div className={styles.header_actions}>
          <ButtonComponent
            htmlType="button"
            btnText="Add Time"
            icon={<IoIosAddCircleOutline style={{ fontSize: '18px' }} />}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
            onClick={() => setOpenModelView(true)}
          />
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
          />{' '}
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
          <SelectComponent
            value={user}
            placeholder="Select User"
            options={[
              { label: 'All', value: '1' },
              { label: 'Ashok Ganika', value: '2' },
              { label: 'Mukesh Dhungana', value: '3' },
              { label: 'Rujal Sapkota', value: '4' },
              { label: 'Sagar Shrestha', value: '5' },
              { label: 'Pariskrit Moktan', value: '6' },
            ]}
            onChange={(val) => setUser(val)}
            style={{
              minWidth: '150px',
              textAlign: 'left',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            }}
          />
          <div className={styles.actions_btn}>
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
      <Modals
        title={
          <div className={styles.time_attendance_header}>
            <div className={styles.time_attendance_time}>
              <GiAlarmClock style={{ fontSize: '26px' }} />
              <LiveTime />
            </div>
            {moment().format('dddd, MMMM D, YYYY')}
          </div>
        }
        visible={isModelOpenView}
        handleCancel={() => setOpenModelView(false)}
        variant="large"
      >
        <h2>Modela</h2>
        <h2>Modela</h2>
        <h2>Modela</h2>
        <h2>Modela</h2>
        <h2>Modela</h2>
        <h2>Modela</h2>

        <h2>Modela</h2>
        <h2>Modela</h2>
      </Modals>
    </>
  )
}

export default TmsAdminHeader
