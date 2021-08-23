import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Alert, Select } from 'antd'
import PropTypes from 'prop-types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  fetchProjectsOfUser,
  fetchLogTypes,
  fetchFilteredProjectLogs,
  fetchTotalTimeSpent,
  fetchWeeklyTimeSpent,
} from 'redux/projectLog/projectLogAction'
import FormField from 'components/elements/Form'
import Button from 'components/elements/Button'
import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'
import {
  FetchLogTImeOfUser,
  fetchUserTimeSpentToday,
  fetchWeeklyTimeSpentOfUser,
} from 'redux/logTime/logTimeActions'
import styles from './styles.module.css'

function LogTimeForm({
  isAdmin,
  initialValues,
  setFormType,
  formType,
  timeLogId,
}) {
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
    let cleanValues
    if (formType === 'Add') {
      cleanValues = {
        status: 'publish',
        title: '',
        content: values.remarks,
        meta: {
          hours: values.hours.concat(
            `${
              +values.minutes >= 15
                ? `.${(values.minutes / 60)
                    .toString()
                    .split('.')[1]
                    .substring(0, 2)}`
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
        .then(() => {
          if (!isAdmin) {
            dispatch(fetchFilteredProjectLogs(projectId))
            dispatch(fetchTotalTimeSpent(projectId))
            dispatch(fetchWeeklyTimeSpent(projectId))
          } else {
            dispatch(
              FetchLogTImeOfUser(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
            dispatch(
              fetchWeeklyTimeSpentOfUser(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
            dispatch(
              fetchUserTimeSpentToday(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
          }
          resetForm()
          setVisible(true)
        })
        .catch((err) => console.log(err.response.data.message))
        .finally(() => setSubmitting(false))
    } else {
      cleanValues = {
        content: values.remarks,
        meta: {
          hours: values.hours.concat(
            `${
              +values.minutes >= 15
                ? `.${(values.minutes / 60)
                    .toString()
                    .split('.')[1]
                    .substring(0, 2)}`
                : ''
            }`,
          ),
          date: values.date.format('YYYYMMDD'),
          project_id: projectId,
        },
        log_type: [values.log_type],
      }
      restClient
        .put(`${API_URL}/timelogs/${timeLogId}`, cleanValues, true)
        .then(() => {
          if (!isAdmin) {
            dispatch(fetchFilteredProjectLogs(projectId))
            dispatch(fetchTotalTimeSpent(projectId))
            dispatch(fetchWeeklyTimeSpent(projectId))
          } else {
            dispatch(
              FetchLogTImeOfUser(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
            dispatch(
              fetchWeeklyTimeSpentOfUser(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
            dispatch(
              fetchUserTimeSpentToday(
                JSON.parse(localStorage.getItem('userDetail'))?.user_id,
              ),
            )
          }
          resetForm()
          setVisible(true)
        })
        .catch((err) => console.log(err.response.data.message))
        .finally(() => setSubmitting(false))
    }
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
              message: 'Required',
            },
          ]}
        >
          <FormField
            component="DatePicker"
            style={{ width: '100%', borderRadius: '3px', padding: '7px' }}
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              (current &&
                current < moment().subtract(1, 'days').startOf('day')) ||
              current > moment().endOf('day')
            }
          />
        </Form.Item>
        <div className={styles.hours_minutes}>
          <Form.Item
            label="Hours"
            name="hours"
            rules={[
              {
                required: true,
                message: 'Required',
                validateTrigger: 'onSubmit',
              },
              {
                validator: (_, value) => {
                  try {
                    if (value <= 9 || value === 0) {
                      return Promise.resolve()
                    }
                    throw new Error('Value must be less than or equal to 9')
                  } catch (err) {
                    return Promise.reject(err)
                  }
                },
                validateTrigger: 'onSubmit',
              },
            ]}
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
            rules={[
              {
                required: true,
                message: 'Required',
                validateTrigger: 'onSubmit',
              },
              {
                validator: (_, value) => {
                  try {
                    if (value) {
                      if (+value === 0) return Promise.resolve()
                      if (value > 60)
                        throw new Error(
                          'Value must be less than or equal to 60',
                        )
                      if (value < 15)
                        throw new Error(
                          'Value must be more than or equal to 15',
                        )
                    }

                    return Promise.resolve()
                  } catch (err) {
                    return Promise.reject(err)
                  }
                },
                validateTrigger: 'onSubmit',
              },
            ]}
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
        <Form.Item
          label="Type"
          name="log_type"
          rules={[{ required: true, message: 'Required' }]}
        >
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
        <Form.Item
          label="Remarks"
          name="remarks"
          rules={[{ required: true, message: 'Required' }]}
        >
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
            <Button btnText="Cancel" onClick={resetForm} danger />
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
  timeLogId: PropTypes.any,
}

LogTimeForm.defaultProps = {
  isAdmin: false,
  formType: 'Add',
}

export default LogTimeForm
