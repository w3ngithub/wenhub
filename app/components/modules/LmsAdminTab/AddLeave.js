import React from 'react'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { Form } from 'antd'
import styles from './styles.module.css'

const AddLeave = () => {
  const [form] = Form.useForm()
  const [values, setValues] = React.useState({})

  const onSubmit = (data) => {
    console.log(data.leave_type, data.user, data.leave_date.format())
  }

  const resetForm = () => {
    setValues({})
    form.resetFields()
  }

  return (
    <Form
      layout="vertical"
      form={form}
      className={styles.addLeaveForm}
      onFinish={onSubmit}
      onValuesChange={(value) => setValues((th) => ({ ...th, ...value }))}
    >
      <div className={styles.addLeaveInputs}>
        <div className={styles.selectNText}>
          <div className={styles.addLeaveSelect}>
            <div className={styles.labelInputField}>
              <Form.Item
                label="Leave Type"
                name="leave_type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectComponent
                  style={{ width: '100%' }}
                  placeholder="Select Leave Type"
                  options={[
                    { label: 'All', value: 0 },
                    { label: 'Rujal', value: 1 },
                    { label: 'Ujjwal', value: 2 },
                  ]}
                />
              </Form.Item>
            </div>
            <div className={styles.labelInputField}>
              <Form.Item
                label="Select User"
                name="user"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectComponent
                  style={{ width: '100%' }}
                  placeholder="Select User"
                  options={[
                    { label: 'Rujal', value: 1 },
                    { label: 'Ujjwal', value: 2 },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles.labelInputField}>
            <Form.Item
              label="Leave Reason"
              name="leave_reason"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <FormField component="TextAreaField" rows={12} />
            </Form.Item>
          </div>
        </div>

        {values?.user?.value && (
          <div className={styles.addLeaveCalendar}>
            <Form.Item
              label="Select Leave Date"
              name="leave_date"
              style={{ marginLeft: 3 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <FormField component="MultiSelectCalendar" />
            </Form.Item>
            <span style={{ color: 'red', margin: '-10px 12px' }}>
              *Disabled dates are holidays
            </span>
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <ButtonComponent
          htmlType="submit"
          btnText="Apply"
          className={styles.approveButton}
        />
        <ButtonComponent
          btnText="Reset"
          htmlType="button"
          danger
          onClick={resetForm}
        />
      </div>
    </Form>
  )
}

export default AddLeave
