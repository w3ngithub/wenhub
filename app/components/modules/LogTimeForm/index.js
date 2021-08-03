import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Alert, Select } from 'antd'
import PropTypes from 'prop-types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  fetchProjectsOfUser,
  fetchLogTypes,
  fetchFilteredProjectLogs,
} from 'redux/projectLog/projectLogAction'
import FormField from 'components/elements/Form'
import Button from 'components/elements/Button'
import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'
import { FetchLogTImeOfUser } from 'redux/logTime/logTimeActions'
import styles from './styles.module.css'

function LogTimeForm({ isAdmin, initialValues, setFormType, formType }) {
  const [visible, setVisible] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()
  const { query } = useRouter()

  const dispatch = useDispatch()
  const { projectsOfUser, logTypes } = useSelector(
    (state) => state.projectLog,
    shallowEqual,
  )

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchProjectsOfUser())
      dispatch(fetchLogTypes())
    }
  }, [isAdmin])

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
    setSubmitting(true)
    const projectId = isAdmin ? values.project_name || '' : +query.id
    const cleanValues = {
      status: 'publish',
      title: '',
      content: values.remarks,
      meta: {
        hours: values.hours.concat(
          `${
            +values.minutes >= 15
              ? `.${(values.minutes / 60).toString().split('.')[1]}`
              : ''
          }`,
        ),
        date: values.date.format('YYYYMMDD'),
        project_id: projectId,
      },
      log_type: [values.log_type],
    }

    restClient
      .post(`${API_URL}/timelogs`, cleanValues, true)
      .then((res) => {
        if (!isAdmin) {
          dispatch(fetchFilteredProjectLogs(projectId))
        } else {
          dispatch(FetchLogTImeOfUser())
        }
        resetForm()
        setVisible(true)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response.data.message))
      .finally(() => setSubmitting(false))

    setFormType('Add')
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
            options={logTypes.map((log) => ({
              label: log.name,
              value: log.id,
            }))}
            style={{
              width: '100%',
              textAlign: 'left',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            }}
          />
        </Form.Item>
        {isAdmin && (
          <Form.Item label="Project Name" name="project_name">
            <Select
              placeholder={
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                  Choose Project
                </div>
              }
              showSearch
              options={projectsOfUser.map((project) => ({
                label: project.title.rendered,
                value: project.id,
              }))}
              style={{
                width: '100%',
                textAlign: 'left',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}
            />
          </Form.Item>
        )}
        <Form.Item label="Remarks" name="remarks" rules={[{ required: true }]}>
          <FormField component="TextAreaField" rows={5} />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button
              isDisabled={isSubmitting}
              btnText={isSubmitting ? 'Submitting...' : 'Submit'}
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
