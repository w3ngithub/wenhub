import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Checkbox, TimePicker, Form } from 'antd'
import { TiCancel } from '@react-icons/all-files/ti/TiCancel'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiSave } from '@react-icons/all-files/bi/BiSave'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const TmsAdminEditPunch = ({ details }) => {
  const [EditPunchInform] = Form.useForm()
  const [EditPunchOutform] = Form.useForm()

  const [changeEditPunchInTime, setChangeEditPunchInTime] = useState(false)
  const [changeEditPunchOutTime, setChangeEditPunchOutTime] = useState(false)

  const [punchInInitialState, setPunchInInitialState] = useState()
  const [punchOutInitialState, setPunchOutInitialState] = useState()

  const handlePunchInSubmit = (values) => {
    openNotification({
      type: 'success',
      message: 'punch in sucessfully updated',
    })
    console.log(values)
  }

  const handlePunchOutSubmit = (values) => {
    openNotification({
      type: 'success',
      message: 'punch out sucessfully updated',
    })
    console.log(values)
  }

  useEffect(() => {
    setChangeEditPunchInTime(false)
    setChangeEditPunchOutTime(false)
    setPunchInInitialState({
      punchouttime: details.punchOutTime
        ? moment(details.punchOutTime, 'h:mm:ss A')
        : '',
      middayexit: false,
      punchoutnote: details.punchOutTime
        ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem expedita.'
        : '',
    })
    setPunchOutInitialState({
      punchouttime: details.punchOutTime
        ? moment(details.punchOutTime, 'h:mm:ss A')
        : '',
      middayexit: false,
      punchoutnote: details.punchOutTime
        ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur nulla at eveniet, minus laboriosam nostrum odio eos repudiandae ullam veniam ipsum. Nesciunt impedit dicta cumque cupiditate consectetur voluptatem expedita.'
        : '',
    })
  }, [details.punchOutTime, details.punchInTime])

  return (
    <div className={styles.container}>
      <div className={styles.punch}>
        <Form
          form={EditPunchInform}
          onFinish={handlePunchInSubmit}
          style={{ width: '100%' }}
          initialValues={punchInInitialState}
        >
          <div className={styles.punch_in}>
            <div className={styles.action}>
              {changeEditPunchInTime && (
                <Form.Item
                  name="punchintime"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <TimePicker use12Hours format="h:mm:ss A" />
                </Form.Item>
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
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-in-note
              </label>
              <Form.Item
                name="punchinnote"
                rules={[{ required: true, message: 'Required' }]}
              >
                <FormField
                  component="TextAreaField"
                  rows={4}
                  styles={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    borderRadius: '3px',
                  }}
                />
              </Form.Item>

              <div className={styles.submit_form}>
                <Form.Item>
                  <ButtonComponent
                    btnText="Update"
                    htmlType="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    icon={<BiSave style={{ fontSize: '18px' }} />}
                  />
                </Form.Item>
                {changeEditPunchInTime && (
                  <Form.Item>
                    <ButtonComponent
                      btnText="Cancel"
                      htmlType="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                      danger
                      icon={<TiCancel style={{ fontSize: '18px' }} />}
                      onClick={() => {
                        setChangeEditPunchInTime(false)
                      }}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          </div>
        </Form>
        <Form
          form={EditPunchOutform}
          onFinish={handlePunchOutSubmit}
          style={{ width: '100%' }}
          initialValues={punchOutInitialState}
        >
          <div className={styles.punch_in}>
            <div className={styles.action}>
              {!details.punchOutTime && (
                <>
                  <Form.Item
                    name="punchouttime"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <TimePicker use12Hours format="h:mm:ss A" />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox valuePropName="checked" name="middayexit">
                      Mid-day Exit
                    </Checkbox>
                  </Form.Item>
                </>
              )}
              {details.punchOutTime && (
                <>
                  {changeEditPunchOutTime && (
                    <Form.Item
                      name="punchouttime"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <TimePicker use12Hours format="h:mm:ss A" />
                    </Form.Item>
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
                  {changeEditPunchOutTime && (
                    <Form.Item name="middayexit" valuePropName="checked">
                      <Checkbox>Mid-day Exit</Checkbox>
                    </Form.Item>
                  )}
                </>
              )}
            </div>
            <div className={styles.input}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <Form.Item
                name="punchoutnote"
                rules={[{ required: true, message: 'Required' }]}
              >
                <FormField
                  component="TextAreaField"
                  rows={4}
                  styles={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    borderRadius: '3px',
                  }}
                />
              </Form.Item>
              <div className={styles.submit_form}>
                <Form.Item>
                  <ButtonComponent
                    btnText="Update"
                    htmlType="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    icon={<BiSave style={{ fontSize: '18px' }} />}
                  />
                </Form.Item>
                {changeEditPunchOutTime && (
                  <Form.Item>
                    <ButtonComponent
                      btnText="Cancel"
                      htmlType="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                      danger
                      icon={<TiCancel style={{ fontSize: '18px' }} />}
                      onClick={() => {
                        setChangeEditPunchOutTime(false)
                      }}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TmsAdminEditPunch
