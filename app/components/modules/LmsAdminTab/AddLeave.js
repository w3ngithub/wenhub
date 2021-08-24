import React, { useState } from 'react'
import moment from 'moment'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import { putLmsLeave } from 'redux/lms/lmsActions'
import { connect } from 'react-redux'
import { Form } from 'antd'
import useDidMountEffect from 'hooks/useDidMountEffect'
import { getAllDatesInRange } from 'react-multi-date-picker'
import Loader from 'components/elements/Loader'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import { calenderDate, changeDate } from 'utils/date'
import styles from './styles.module.css'

const AddLeave = ({
  leaveFields,
  developers,
  designers,
  lmsLoading,
  ...props
}) => {
  const [form] = Form.useForm()
  const [values, setValues] = useState({
    leave_type: { label: '', value: '' },
    user: { label: '', value: '' },
    leave_reason: '',
    leave_dates: '',
  })
  const [loading, setLoading] = useState(false)
  const [dates, setDates] = useState([])

  // Fetching applied dates of selected user
  useDidMountEffect(() => {
    const fetchDates = async () => {
      setLoading(true)
      const res = await restClient.get(
        `${API_URL}/lms_leave?filter[meta_key]=wen_leave_user_relation&filter[meta_value]=${values.user.value}&_fields=leave_status,meta.leave_dates`,
      )
      const ddd = res.data
        .filter((x) => !x.leave_status.includes(152))
        .map((da) =>
          da.meta.leave_dates.map((x) =>
            moment(x.leave_date).format('YYYY-MM-DD'),
          ),
        )
        .flat()
      setDates(ddd)
      setLoading(false)
    }
    fetchDates()
  }, [values.user])

  // Combined options of developers and designers
  const options = [
    ...developers.map((x) => ({ label: x.name, value: x.id })),
    ...designers.map((x) => ({ label: x.name, value: x.id })),
  ].sort((a, b) => a.value - b.value)

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
      leave_status: [150],
      leave_dates: leaveDates.join(','),
    }

    await props.putLmsLeave(data)
    resetForm()
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
      {lmsLoading || loading ? (
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
                  options={options}
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
            {!loading && (
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
                    mapDays={({ date, today }) => {
                      // Check whether weekday is Sunday or Saturday
                      const weekend =
                        date.weekDay.number === 1 || date.weekDay.number === 7

                      const currentDate = calenderDate(today)
                      const requiredDate = calenderDate(date)

                      // Compare today all dates with todaydate
                      const comparedDate =
                        new Date(requiredDate) <= new Date(currentDate)

                      if (
                        dates.includes(requiredDate) ||
                        weekend ||
                        comparedDate
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
            )}
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
  commonData: {
    leaveFields,
    filterType: { developers, designers },
  },
  lmsData: { lmsLoading },
}) => ({
  leaveFields,
  developers,
  designers,
  lmsLoading,
})

export default connect(mapStateToProps, { putLmsLeave })(AddLeave)
