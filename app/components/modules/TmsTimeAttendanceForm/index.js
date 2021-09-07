import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { GiAlarmClock } from '@react-icons/all-files/gi/GiAlarmClock'
import { IoIosFingerPrint } from '@react-icons/all-files/io/IoIosFingerPrint'
import moment from 'moment'
import LiveTime from 'components/elements/LiveTime'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import {
  setfirstPunchIn,
  setfirstPunchOut,
  setPunchIn,
  setPunchOut,
} from 'redux/tms/tmsActions'
import styles from './styles.module.css'

function TmsTimeAttendanceForm() {
  const { firstPunchIn, firstPunchOut, punchIn, punchOut } = useSelector(
    (state) => state.tms,
    shallowEqual,
  )
  const dispatch = useDispatch()

  const handlePunchInSubmit = (e) => {
    e.preventDefault()
    if (!firstPunchIn) dispatch(setfirstPunchIn())
    dispatch(setPunchIn())
  }

  const handlePunchOutSubmit = (e) => {
    e.preventDefault()
    if (!firstPunchOut) dispatch(setfirstPunchOut())
    dispatch(setPunchOut())
  }
  return (
    <div
      className={styles.time_attendance_container}
      style={{ width: firstPunchIn ? '100%' : '50%' }}
    >
      <div className={styles.time_attendance_header}>
        <div className={styles.time_attendance_time}>
          <GiAlarmClock style={{ fontSize: '26px' }} />
          <LiveTime />
        </div>
        {moment().format('dddd, MMMM D, YYYY')}
      </div>
      <div className={styles.time_attendance_body}>
        <div className={styles.time_attendance_punch_in_form}>
          {firstPunchIn && (
            <div className={styles.punch_list}>
              <span>
                <BiCheckCircle style={{ fontSize: '16px' }} />
              </span>
              <span>11:40:22 PM</span>
              <span>Punched-in</span>
            </div>
          )}
          <form onSubmit={handlePunchInSubmit}>
            <label className={styles.form_label} htmlFor="punchInNote">
              Punch-in-note
            </label>
            <FormField
              component="InputField"
              padding="15px"
              styles={{ marginTop: '5px', width: '100%' }}
            />
            <ButtonComponent
              btnText={punchIn ? 'Update' : 'PUNCH IN'}
              htmlType="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
              icon={
                punchIn ? '' : <IoIosFingerPrint style={{ fontSize: '22px' }} />
              }
            />
          </form>
        </div>
        {firstPunchIn && (
          <div className={styles.time_attendance_punch_in_form}>
            {punchOut && (
              <div className={styles.punch_list}>
                <span>
                  <BiCheckCircle style={{ fontSize: '16px' }} />
                </span>
                <span>11:40:22 PM</span>
                <span>Punched-out</span>
              </div>
            )}
            {punchIn && firstPunchIn && (
              <div className={styles.punch_list}>
                <Checkbox>Mid-day Exit</Checkbox>
              </div>
            )}
            <form onSubmit={handlePunchOutSubmit}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <FormField
                component="InputField"
                padding="15px"
                styles={{ marginTop: '5px', width: '100%' }}
              />
              <ButtonComponent
                btnText={punchOut ? 'Update' : 'PUNCH OUT'}
                htmlType="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '20px',
                }}
                icon={
                  punchOut ? (
                    ''
                  ) : (
                    <IoIosFingerPrint style={{ fontSize: '22px' }} />
                  )
                }
              />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
export default TmsTimeAttendanceForm
