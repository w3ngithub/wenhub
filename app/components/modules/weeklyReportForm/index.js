import React from 'react'
import { Form } from 'antd'
import moment from 'moment'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import FormField from 'components/elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'
import { fectchWeeklyReport } from 'redux/weeklyReport/weeklyReportActions'
import styles from './styles.module.css'

function WeeklyReportForm({ searchReset }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const {
    commonData: {
      filterType: { projectStatus, clients },
    },
    projectLog: { logTypes },
  } = useSelector((state) => state, shallowEqual)

  const handleSubmit = (values) => {
    const cleanValues = {
      date_from:
        values.fromDateToDate?.[0]?.format('YYYYMMDD')?.toString() || '',
      date_to: values.fromDateToDate?.[1]?.format('YYYYMMDD')?.toString() || '',
      project_status: values.projectStatus.value,
      log_type: values.logType.value,
      client: values.client.value,
    }
    dispatch(fectchWeeklyReport(cleanValues))
  }

  const handleReset = () => {
    dispatch(
      fectchWeeklyReport({
        date_from: '',
        date_to: '',
        project_status: '',
        log_type: '',
        client: '',
      }),
    )
    form.resetFields()
    searchReset()
  }
  return (
    <div className={styles.weekly_reprot_form_container}>
      <Form
        form={form}
        initialValues={{
          fromDateToDate: [
            moment().startOf('isoWeek'),
            moment().day() === 0 || moment().day() === 6
              ? moment().startOf('isoWeek').add(4, 'days')
              : moment(),
          ],
          projectStatus: { label: 'Project Status', value: '' },
          logType: { label: 'Log Type', value: '' },
          client: { label: 'By Client', value: '' },
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
                { label: 'Project Status', value: '' },
                ...projectStatus?.map((status) => ({
                  label: status.name,
                  value: status.id,
                })),
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
                { label: 'Log Type', value: '' },
                ...logTypes?.map((log) => ({ label: log.name, value: log.id })),
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
                { label: 'By Client', value: '' },
                ...clients?.map((status) => ({
                  label: status.name,
                  value: status.id,
                })),
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
