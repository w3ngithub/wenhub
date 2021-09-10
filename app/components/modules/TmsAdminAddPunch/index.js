import React, { useState } from 'react'
import { Checkbox, TimePicker, Form } from 'antd'
import { VscSaveAs } from '@react-icons/all-files/vsc/VscSaveAs'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

function TmsAdminAddPunch() {
  const [user, setUser] = useState({})
  const [punchOutDate, setPunchOutDate] = useState('')

  const [userError, setuserError] = useState(false)
  const [punchOutDateError, setPunchOutDateError] = useState(false)

  const [punchOutPermitted, setpunchOutPermitted] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [punchInForm] = Form.useForm()
  const [punchOutForm] = Form.useForm()

  const handlePunchInSubmit = (values) => {
    openNotification({
      type: 'success',
      message: 'punch in saved successfully',
    })
    console.log(values)
    punchInForm.resetFields()
    setpunchOutPermitted(true)
    setPunchOutDateError(false)
    setuserError(false)
  }

  const handlePunchOutSubmit = (values) => {
    console.log(values)
    punchOutForm.resetFields()
    openNotification({
      type: 'success',
      message: 'punch in saved successfully',
    })
    setpunchOutPermitted(false)
    setPunchOutDateError(false)
    setuserError(false)
  }

  return (
    <div className={styles.add_punch_container}>
      <div className={styles.header_form_punch}>
        <div className={styles.manaulForm}>
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
            onChange={(val) => {
              setUser(val)
              if (isFormSubmitted) {
                if (!val.value) {
                  setuserError(true)
                } else {
                  setuserError(false)
                }
              }
            }}
            style={{
              minWidth: '150px',
              textAlign: 'left',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            }}
          />
          <small className={styles.error}>{userError && 'Required'}</small>
        </div>
        <div className={styles.manaulForm}>
          <FormField
            component="DatePicker"
            placeholder="Select Date"
            value={punchOutDate}
            onChange={(e) => {
              setPunchOutDate(e)
              if (isFormSubmitted) {
                if (!e) {
                  setPunchOutDateError(true)
                } else {
                  setPunchOutDateError(false)
                }
              }
            }}
          />
          <small className={styles.error}>
            {punchOutDateError && 'Required'}
          </small>
        </div>
      </div>
      <div className={styles.punch}>
        <Form
          form={punchInForm}
          onFinish={handlePunchInSubmit}
          style={{ width: '100%' }}
        >
          <div className={styles.punch_in}>
            <div className={styles.action}>
              <Form.Item
                name="punchintime"
                rules={[{ required: true, message: 'Required' }]}
              >
                <TimePicker use12Hours format="h:mm:ss A" />
              </Form.Item>
            </div>
            <div className={styles.input}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-in-note
              </label>
              <Form.Item
                name="punchin"
                rules={[
                  {
                    validateTrigger: 'onSubmit',
                  },
                  {
                    validator: (_, value) => {
                      try {
                        if (!value) throw new Error('Reason Required')
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
                  btnText="Save"
                  htmlType="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  icon={<VscSaveAs style={{ fontSize: '16px' }} />}
                  onClick={() => {
                    setIsFormSubmitted(true)
                    if (!user.value || !punchOutDate) {
                      if (!user.value) setuserError(true)
                      if (!punchOutDate) setPunchOutDateError(true)
                    }
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>

        <Form
          form={punchOutForm}
          onFinish={handlePunchOutSubmit}
          style={{ width: '100%' }}
        >
          <div className={styles.punch_in}>
            <div className={styles.action}>
              <Form.Item
                name="punchouttime"
                rules={[{ required: true, message: 'Required' }]}
              >
                <TimePicker use12Hours format="h:mm:ss A" />
              </Form.Item>
              <Form.Item name="midDay" valuePropName="checked">
                <Checkbox>Mid-day Exit</Checkbox>
              </Form.Item>
            </div>
            <div className={styles.input}>
              <label className={styles.form_label} htmlFor="punchInNote">
                Punch-out-note
              </label>
              <Form.Item
                name="punchout"
                rules={[
                  {
                    validateTrigger: 'onSubmit',
                  },
                  {
                    validator: (_, value) => {
                      try {
                        if (!value) throw new Error('Reason Required')
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
                    borderRadius: '3px',
                    marginTop: '5px',
                  }}
                />
              </Form.Item>
              <Form.Item>
                <ButtonComponent
                  btnText="Save"
                  htmlType="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  isDisabled={!punchOutPermitted}
                  icon={<VscSaveAs style={{ fontSize: '16px' }} />}
                  onClick={() => {
                    if (!user.value || !punchOutDate) {
                      if (!user.value) setuserError(true)
                      if (!punchOutDate) setPunchOutDateError(true)
                    }
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TmsAdminAddPunch
