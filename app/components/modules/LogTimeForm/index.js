import React, { useState } from 'react'
import { Form, Alert, Select } from 'antd'
import PropTypes from 'prop-types'
import FormField from 'components/elements/Form'
import Button from 'components/elements/Button'
import styles from './styles.module.css'

function LogTimeForm({ isAdmin, initialValues, setFormType, formType }) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.resetFields()
  }, [formType, initialValues])

  const handleClose = () => {
    setVisible(false)
  }

  const resetForm = () => {
    form.resetFields()
  }

  const onSubmit = (values) => {
    const formatedValues = values
    formatedValues.date = formatedValues.date.format('DD/MM/YYYY')
    setFormType('Add')
    setVisible(true)
  }

  return (
    <>
      <h3>Add Time Log</h3>
      {visible && (
        <Alert
          message="Time Log sucessfully Added"
          type="success"
          showIcon
          closable
          afterClose={handleClose}
        />
      )}
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormField
            component="DatePicker"
            style={{ width: '100%', borderRadius: '3px', padding: '7px' }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <div className={styles.hours_minutes}>
          <Form.Item
            label="Hours"
            name="hours"
            rules={[{ required: true }]}
            style={{ width: '100%' }}
          >
            <FormField
              component="InputField"
              width="100%"
              borderRadius="3px"
              padding="7px"
            />
          </Form.Item>
          <Form.Item
            label="Minutes"
            name="minutes"
            rules={[{ required: true }]}
            style={{ width: '100%' }}
          >
            <FormField
              component="InputField"
              width="100%"
              borderRadius="3px"
              padding="7px"
            />
          </Form.Item>
        </div>
        <Form.Item label="Type" name="log_type" rules={[{ required: true }]}>
          <Select
            placeholder={
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                Select Log Type
              </div>
            }
            allowClear
            options={[
              { label: 'Bug', value: 'Bug' },
              { label: 'Change Request', value: 'Change Request' },
              { label: 'Data Entry', value: 'Data Entry' },
              { label: 'Debugging', value: 'Debugging' },
              { label: 'Fixing', value: 'Fixing' },
              { label: 'Maintenance', value: 'Maintenance' },
              { label: 'Migration', value: 'Migration' },
              { label: 'New Request', value: 'New Request' },
              { label: 'QA', value: 'QA' },
              { label: 'QA Fixing', value: 'AQ Fixing' },
              { label: 'Research', value: 'Research' },
              { label: 'RFE', value: 'RFE' },
            ]}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </Form.Item>
        {isAdmin && (
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[{ required: true }]}
          >
            <Select
              placeholder={
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                  Choose Project
                </div>
              }
              options={[
                { label: 'kisok', value: 'Kisok' },
                { label: 'Idonize', value: 'idonize' },
              ]}
              style={{ width: '100%', textAlign: 'left' }}
            />
          </Form.Item>
        )}
        <Form.Item label="Remarks" name="remarks" rules={[{ required: true }]}>
          <FormField component="TextAreaField" rows={5} />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button
              btnText="Submit"
              style={{ marginRight: '5px' }}
              htmlType="submit"
            />
            <Button
              btnText="Cancel"
              onClick={resetForm}
              htmlType="button"
              isDisabled={formType === 'Edit'}
              danger
            />
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

LogTimeForm.propTypes = {
  isAdmin: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  setFormType: PropTypes.func,
  formType: PropTypes.string,
}

LogTimeForm.defaultProps = {
  isAdmin: false,
  formType: 'Add',
}

export default LogTimeForm
