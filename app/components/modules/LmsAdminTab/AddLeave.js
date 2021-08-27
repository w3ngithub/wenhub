import React, { useState, useEffect } from 'react'
import moment from 'moment'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { putLmsLeave, filteredLeaveFetch } from 'redux/lms/lmsActions'
import { connect } from 'react-redux'
import { Form } from 'antd'
import useDidMountEffect from 'hooks/useDidMountEffect'
import { getAllDatesInRange } from 'react-multi-date-picker'
import Loader from 'components/elements/Loader'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import { calenderDate, changeDate } from 'utils/date'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const AddLeave = ({ leaveFields, lmsLoading, lmsAdminForm, ...props }) => {
  const [form] = Form.useForm()
  const [values, setValues] = useState({
    leave_type: { label: '', value: '' },
    user: { label: '', value: '' },
    leave_reason: '',
    leave_dates: '',
  })

  const [allUsers, setAllUsers] = useState([])
  const [dates, setDates] = useState([])
  const [holidays, setHolidays] = useState([])

  // Fetching applied dates of selected user
  useDidMountEffect(() => {
    const fetchDates = async () => {
      const res = await restClient.get(
        `${API_URL}/lms/disable_dates/${values?.user?.value}`,
        true,
      )
      setDates(res?.data || [])
    }
    if (values?.user?.value) {
      fetchDates()
    }
  }, [values?.user?.value])

  useEffect(() => {
    restClient
      .get(`${API_URL}/users?per_page=${100}&_fields=id,name`, true)
      .then((response) => {
        setAllUsers(
          response.data.map((user) => ({ label: user.name, value: user.id })),
        )
      })
      .catch((err) =>
        openNotification({
          type: 'error',
          message: err.response?.data?.message || 'Could not fetch users',
        }),
      )
    restClient
      .get(`${API_URL}/lms/holidays`)
      .then((res) => {
        setHolidays(res?.data || [])
      })
      .catch((err) =>
        openNotification({
          type: 'error',
          message: err.response?.data?.message || 'something went wrong',
        }),
      )
  }, [])

  // Handle Form Submit
  const onSubmit = async (value) => {
    const leaveDates = []
    // eslint-disable-next-line no-param-reassign
    value.leave_dates = getAllDatesInRange(value.leave_dates)
    for (let i = 0; i <= value.leave_dates.length - 1; i += 1) {
      const changed = changeDate(value.leave_dates[i]).split('-').join('')
      leaveDates.push(changed)
    }

    const data = {
      status: 'publish',
      comment_status: 'closed',
      title: `${value.user.label} Leave Application ${moment().format(
        'YYYY-MM-DD',
      )}`,
      content: values.leave_reason,
      meta: {
        wen_leave_user_relation: `${value.user.value}`,
        leave_approved_message: '',
      },
      leave_type: [values.leave_type.value],
      leave_status: [151],
      leave_dates: leaveDates.join(','),
    }

    await props.putLmsLeave(data)
    await props.filteredLeaveFetch(lmsAdminForm)

    resetForm()
    openNotification({
      type: 'success',
      message: 'leave posted sucessfully for user',
    })
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
      {lmsLoading ? (
        <div
          style={{ position: 'absolute', left: '50%', top: '40%', zIndex: 100 }}
        >
          <Loader />
        </div>
      ) : null}
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
                    message: 'Required',
                  },
                ]}
              >
                <SelectComponent
                  style={{ width: '100%' }}
                  placeholder="Select Leave Type"
                  options={leaveFields.leave_type.map((x) => ({
                    label: x.name,
                    value: x.id,
                  }))}
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
                    message: 'Required',
                  },
                ]}
              >
                <SelectComponent
                  style={{ width: '100%' }}
                  placeholder="Select User"
                  options={allUsers}
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
                  message: 'Required',
                },
              ]}
            >
              <FormField component="TextAreaField" rows={12} />
            </Form.Item>
          </div>
        </div>

        {values?.user?.value && (
          <>
            <div className={styles.addLeaveCalendar}>
              <Form.Item
                label="Select Leave Date"
                name="leave_dates"
                style={{ marginLeft: 3 }}
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <FormField
                  component="MultiSelectCalendar"
                  multiple
                  mapDays={({ date }) => {
                    // Check whether weekday is Sunday or Saturday
                    const weekend =
                      date.weekDay.number === 1 || date.weekDay.number === 7
                    const requiredDate = calenderDate(date)
                    if (
                      [...dates, ...holidays]
                        .map((x) => moment(x).format('YYYY-MM-DD'))
                        .includes(requiredDate) ||
                      weekend
                    ) {
                      return {
                        disabled: true,
                        style: { color: '#ccc' },
                      }
                    }
                    return {}
                  }}
                />
              </Form.Item>
              <span style={{ color: 'red', margin: '-10px 12px' }}>
                *Disabled dates are holidays
              </span>
            </div>
          </>
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

const mapStateToProps = ({
  commonData: { leaveFields },
  lmsData: { lmsLoading, lmsAdminForm },
}) => ({
  leaveFields,
  lmsLoading,
  lmsAdminForm,
})

export default connect(mapStateToProps, { putLmsLeave, filteredLeaveFetch })(
  AddLeave,
)
