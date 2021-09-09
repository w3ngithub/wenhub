import React, { useEffect, useState } from 'react'
import { Checkbox, TimePicker } from 'antd'
import { TiCancel } from '@react-icons/all-files/ti/TiCancel'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiSave } from '@react-icons/all-files/bi/BiSave'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import moment from 'moment'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const TmsAdminEditPunch = ({ details }) => {
  const [changeEditPunchInTime, setChangeEditPunchInTime] = useState(false)
  const [changeEditPunchOutTime, setChangeEditPunchOutTime] = useState(false)

  const [punchInNote, setPunchInNote] = useState(
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem expedita.',
  )
  const [punchOutNote, setPunchOutNote] = useState(
    details.punchOutTime
      ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem expedita.'
      : '',
  )
  const [statePunchInTime, setStatePunchInTime] = useState(details.punchInTime)
  const [statePunchOutTime, setStatePunchOutTime] = useState(
    details.punchOutTime,
  )

  const handlePunchInSubmit = (e) => {
    e.preventDefault()
    openNotification({
      type: 'success',
      message: 'punch in sucessfully edited',
    })
  }
  const handlePunchOutSubmit = (e) => {
    e.preventDefault()
    openNotification({
      type: 'success',
      message: 'punch out sucessfully edited',
    })
  }
  useEffect(() => {
    setPunchOutNote(
      details.punchOutTime
        ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem expedita.'
        : '',
    )
    setChangeEditPunchInTime(false)
    setChangeEditPunchOutTime(false)
    setStatePunchOutTime(details.punchOutTime)
    setStatePunchInTime(details.punchInTime)
  }, [details.punchOutTime, details.punchInTime])

  return (
    <div className={styles.container}>
      <div className={styles.punch}>
        <div className={styles.punch_in}>
          <div className={styles.action}>
            {changeEditPunchInTime && (
              <TimePicker
                use12Hours
                format="h:mm:ss A"
                value={moment(statePunchInTime, 'h:mm:ss A')}
              />
            )}
            <div className={styles.punch_list}>
              <span>
                <BiCheckCircle style={{ fontSize: '16px' }} />
              </span>
              <span>{details.punchInTime}</span>
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
                value={punchInNote}
                onChange={(e) => setPunchInNote(e.target.value)}
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
            {!details.punchOutTime && (
              <>
                <TimePicker use12Hours format="h:mm:ss A" />
                <Checkbox>Mid-day Exit</Checkbox>
              </>
            )}
            {details.punchOutTime && (
              <>
                {changeEditPunchOutTime && (
                  <TimePicker
                    use12Hours
                    format="h:mm:ss A"
                    value={moment(statePunchOutTime, 'h:mm:ss A')}
                  />
                )}
                <div className={styles.punch_list}>
                  <span>
                    <BiCheckCircle style={{ fontSize: '16px' }} />
                  </span>
                  <span>{details.punchOutTime}</span>
                  <span>Punched-in</span>
                  {!changeEditPunchOutTime && (
                    <span
                      className={styles.change_punch_time}
                      aria-hidden
                      onClick={() => {
                        setChangeEditPunchOutTime(true)
                      }}
                    >
                      Change
                    </span>
                  )}
                </div>
                <Checkbox>Mid-day Exit</Checkbox>
              </>
            )}
          </div>
          <div className={styles.input}>
            <form onSubmit={handlePunchOutSubmit}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <FormField
                component="TextAreaField"
                value={punchOutNote}
                onChange={(e) => setPunchOutNote(e.target.value)}
                rows={4}
                styles={{
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  borderRadius: '3px',
                  marginTop: '5px',
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
                {changeEditPunchOutTime && (
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
                      setChangeEditPunchOutTime(false)
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TmsAdminEditPunch
