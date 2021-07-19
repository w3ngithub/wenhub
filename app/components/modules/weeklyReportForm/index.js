import React from 'react'
import { Form } from 'antd'
import moment from 'moment'
import classNames from 'classnames'
import FormField from 'components/elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'
import styles from './styles.module.css'

function WeeklyReportForm({ searchReset }) {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log(values)
  }

  const handleReset = () => {
    form.resetFields()
    searchReset()
  }
  return (
    <div className={styles.weekly_reprot_form_container}>
      <Form
        form={form}
        initialValues={{
          fromDateToDate: [moment().subtract(3, 'days'), moment()],
        }}
        onFinish={handleSubmit}
      >
        <div className={classNames(styles.form, 'weekly-report-form')}>
          <Form.Item name="fromDateToDate">
            <FormField
              isRange
              component="DatePicker"
              style={{
                width: '100%',
                borderRadius: '3px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item name="projectStatus">
            <Select
              placeholder="Project Status"
              options={[
                { label: 'Awaiting Response', value: '1' },
                { label: 'Completed', value: '2' },
                { label: 'Needs Follw Up', value: '3' },
                { label: 'Ongoing', value: '4' },
                { label: 'Hold', value: '5' },
              ]}
              style={{
                width: '100%',
                minWidth: '170px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textAlign: 'left',
              }}
            />
          </Form.Item>
          <Form.Item name="logType">
            <Select
              placeholder="Log Type"
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
              style={{
                width: '100%',
                textAlign: 'left',
                minWidth: '165px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
            />
          </Form.Item>
          <Form.Item name="client">
            <Select
              placeholder="By Client"
              options={[
                { label: 'Frass', value: '1' },
                { label: 'Mustafa', value: '2' },
                { label: 'Bsell Family', value: '3' },
              ]}
              style={{
                width: '100%',
                textAlign: 'left',
                minWidth: '130px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.form_buttons}>
              <Button btnText="Show" htmlType="submit" />
              <Button
                btnText="Reset"
                htmlType="button"
                danger
                onClick={handleReset}
              />
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default WeeklyReportForm
