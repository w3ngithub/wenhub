import React, { useState } from 'react'
import { Checkbox, TimePicker } from 'antd'
import { TiCancel } from '@react-icons/all-files/ti/TiCancel'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiSave } from '@react-icons/all-files/bi/BiSave'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const TmsAdminEditPunch = ({ details }) => {
  const [changeEditPunchInTime, setChangeEditPunchInTime] = useState(false)
  const handlePunchInSubmit = (e) => {
    e.preventDefault()
  }
  const handlePunchOutSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={styles.container}>
      <div className={styles.punch}>
        <div className={styles.punch_in}>
          <div className={styles.action}>
            {changeEditPunchInTime && (
              <TimePicker use12Hours format="h:mm:ss A" />
            )}
            <div className={styles.punch_list}>
              <span>
                <BiCheckCircle style={{ fontSize: '16px' }} />
              </span>
              <span>11:40:22 PM</span>
              <span>Punched-in</span>
              {!changeEditPunchInTime && (
                <span
                  className={styles.change_punch_time}
                  aria-hidden
                  onClick={() => {
                    setChangeEditPunchInTime(true)
                  }}
                >
                  Change
                </span>
              )}
            </div>
          </div>
          <div className={styles.input}>
            <form onSubmit={handlePunchInSubmit}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-in-note
              </label>
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
              <div className={styles.submit_form}>
                <ButtonComponent
                  btnText="Update"
                  htmlType="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '20px',
                  }}
                  icon={<BiSave style={{ fontSize: '18px' }} />}
                />
                {changeEditPunchInTime && (
                  <ButtonComponent
                    btnText="Cancel"
                    htmlType="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '20px',
                    }}
                    danger
                    icon={<TiCancel style={{ fontSize: '18px' }} />}
                    onClick={() => {
                      setChangeEditPunchInTime(false)
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
        <div className={styles.punch_in}>
          <div className={styles.action}>
            <TimePicker use12Hours format="h:mm:ss A" />
            <Checkbox>Mid-day Exit</Checkbox>
          </div>
          <div className={styles.input}>
            <form onSubmit={handlePunchOutSubmit}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <FormField
                component="TextAreaField"
                rows={4}
                styles={{
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  borderRadius: '3px',
                  marginTop: '5px',
                }}
              />
              <ButtonComponent
                btnText="Update"
                htmlType="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '20px',
                }}
                icon={<BiSave style={{ fontSize: '18px' }} />}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TmsAdminEditPunch
