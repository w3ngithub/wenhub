import React, { useState } from 'react'
import { Form, Checkbox } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { GiAlarmClock } from '@react-icons/all-files/gi/GiAlarmClock'
import { IoIosFingerPrint } from '@react-icons/all-files/io/IoIosFingerPrint'
import moment from 'moment'
import LiveTime from 'components/elements/LiveTime'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import {
  setfirstPunchIn,
  setfirstPunchOut,
  setPunchIn,
  setPunchOut,
} from 'redux/tms/tmsActions'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

function TmsTimeAttendanceForm() {
  const { firstPunchIn, firstPunchOut, punchIn, punchOut } = useSelector(
    (state) => state.tms,
    shallowEqual,
  )
  const dispatch = useDispatch()

  const [midayExit, setMidayExit] = useState(false)
  const [punchInForm] = Form.useForm()
  const [punchOutForm] = Form.useForm()

  const handlePunchInSubmit = (values) => {
    if (!firstPunchIn) dispatch(setfirstPunchIn())
    dispatch(setPunchIn())
    console.log(values)
    openNotification({ type: 'success', message: 'Punched In Successfull' })
    punchInForm.resetFields()
  }

  const handlePunchOutSubmit = (values) => {
    if (!firstPunchOut) dispatch(setfirstPunchOut())
    dispatch(setPunchOut())
    console.log(values, midayExit)
    openNotification({ type: 'success', message: 'Punched Out Successfull' })
    setMidayExit(false)
    punchOutForm.resetFields()
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
          <Form form={punchInForm} onFinish={handlePunchInSubmit}>
            <label className={styles.form_label} htmlFor="punchInNote">
              Punch-in-note
            </label>
            <Form.Item
              name="date"
              rules={[
                {
                  validateTrigger: 'onSubmit',
                },
                {
                  validator: (_, value) => {
                    try {
                      if (firstPunchOut) {
                        if (!value) throw new Error('Reason Required')
                      }
                      return Promise.resolve()
                    } catch (err) {
                      return Promise.reject(err)
                    }
                  },
                  validateTrigger: 'onSubmit',
                },
              ]}
            >
              <FormField
                component="TextAreaField"
                rows={4}
                styles={{
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  marginTop: '5px',
                  borderRadius: '3px',
                }}
              />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                btnText={punchIn ? 'Update' : 'PUNCH IN'}
                htmlType="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
                icon={
                  punchIn ? (
                    ''
                  ) : (
                    <IoIosFingerPrint style={{ fontSize: '22px' }} />
                  )
                }
              />
            </Form.Item>
          </Form>
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
                <Checkbox
                  checked={midayExit}
                  onChange={(e) => {
                    setMidayExit(e.target.checked)
                  }}
                >
                  Mid-day Exit
                </Checkbox>
              </div>
            )}
            <Form form={punchOutForm} onFinish={handlePunchOutSubmit}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <Form.Item
                name="date"
                rules={[
                  {
                    validateTrigger: 'onSubmit',
                  },
                  {
                    validator: (_, value) => {
                      try {
                        if (firstPunchOut) {
                          if (!value) throw new Error('Reason Required')
                        }
                        return Promise.resolve()
                      } catch (err) {
                        return Promise.reject(err)
                      }
                    },
                    validateTrigger: 'onSubmit',
                  },
                ]}
              >
                <FormField
                  component="TextAreaField"
                  rows={4}
                  styles={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    marginTop: '5px',
                    borderRadius: '3px',
                  }}
                />
              </Form.Item>
              <Form.Item>
                <ButtonComponent
                  btnText={punchOut ? 'Update' : 'PUNCH OUT'}
                  htmlType="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  icon={
                    punchOut ? (
                      ''
                    ) : (
                      <IoIosFingerPrint style={{ fontSize: '22px' }} />
                    )
                  }
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}
export default TmsTimeAttendanceForm
