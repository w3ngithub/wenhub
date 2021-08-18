import React, { useState } from 'react'
import { Form, Checkbox } from 'antd'
import FormField from 'components/elements/Form'
import Select from 'components/elements/Select'
import Button from 'components/elements/Button'
import styles from './styles.module.css'

function LmsApply({ setAlertVisible }) {
  const [form] = Form.useForm()
  const [isHallfLeave, setHalfLeave] = useState(false)

  const handleLeaveTypeChange = (e) => {
    if (e.value === '2') setHalfLeave(true)
    else setHalfLeave(false)
  }

  const onSubmit = (values) => {
    setAlertVisible(true)
    console.log('values', values)
  }
  const handleReset = () => {
    form.resetFields()
    setHalfLeave(false)
  }

  return (
    <div className={styles.lms_apply_container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ label: 'First Half', value: '1' }}
      >
        <div className={styles.lms_apply_form}>
          <div className={styles.calendar_form}>
            <Form.Item
              label="Select Leave Dates"
              name="leave_dates"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ marginLeft: '3px' }}
            >
              <FormField component="MultiSelectCalendar" />
            </Form.Item>
            <small style={{ color: 'red', fontSize: '14px' }}>
              *Disabled dates are holidays
            </small>
          </div>
          <div className={styles.input_form}>
            <div className={styles.leavetypes_leads}>
              <div className={styles.leavetypes}>
                <Form.Item
                  label="Leave Type"
                  name="leave_type"
                  rules={[{ required: true }]}
                  style={{ width: '100%' }}
                >
                  <Select
                    placeholder="Select Leave Type"
                    options={[
                      { label: 'Causal', value: '1' },
                      { label: 'Half Day', value: '2' },
                      { label: 'Sick', value: '3' },
                    ]}
                    style={{
                      width: '100%',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textAlign: 'left',
                    }}
                    onChange={handleLeaveTypeChange}
                  />
                </Form.Item>
                {isHallfLeave && (
                  <Form.Item
                    name="Half_day_type"
                    rules={[{ required: true }]}
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      options={[
                        { label: 'First Half', value: '1' },
                        { label: 'Second Half', value: '2' },
                      ]}
                      style={{
                        width: '100%',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}
                    />
                  </Form.Item>
                )}
              </div>
              <Form.Item
                label="Select Teams Leads"
                name="teams_leads"
                valuePropName="checked"
                rules={[{ required: true }]}
                style={{ width: '100%' }}
              >
                <Checkbox.Group
                  options={[
                    'Ashok Ganika',
                    'Ashis Chettri',
                    'Rujal Sapkota',
                    'Mukesh Dhungana',
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Leave Reason"
              name="leave_reason"
              rules={[{ required: true }]}
            >
              <FormField
                component="TextAreaField"
                rows={13}
                borderRadius="3px"
              />
            </Form.Item>
            <div className={styles.form_btns}>
              <Button btnText="Apply" htmlType="submit" />
              <Button
                btnText="Reset"
                htmlType="button"
                onClick={handleReset}
                danger
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default LmsApply
