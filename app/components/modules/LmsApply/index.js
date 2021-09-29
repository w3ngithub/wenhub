import React, { useEffect, useState } from 'react'
import { Form, Checkbox } from 'antd'
import FormField from 'components/elements/Form'
import Select from 'components/elements/Select'
import Button from 'components/elements/Button'
import moment from 'moment'
import { connect } from 'react-redux'
import { putLmsLeave } from 'redux/lms/lmsActions'
import { calenderDate, changeDate } from 'utils/date'
import { getAllDatesInRange } from 'react-multi-date-picker'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import Loader from 'components/elements/Loader'
import styles from './styles.module.css'

function LmsApply({
  teamLeads,
  setAlertVisible,
  leaveFields,
  userDetail,
  lmsLoading,
  lmsLeaves,
  ...props
}) {
  const [form] = Form.useForm()
  const [isHallfLeave, setHalfLeave] = useState(false)
  const [dates, setDates] = useState([])
  const [selectedLeaveTypes, setSelectedLeaveTypes] = useState()

  useEffect(() => {
    const fetchDates = async () => {
      const res = await restClient.get(
        `${API_URL}/lms/disable_dates/${userDetail?.user_id}`,
        true,
      )

      setDates(res.data?.map((x) => moment(x).format('YYYY-MM-DD')))
    }
    fetchDates()
  }, [lmsLeaves])

  const handleLeaveTypeChange = (e) => {
    setSelectedLeaveTypes(e.value)
    if (e.label === 'Half Day') setHalfLeave(true)
    else setHalfLeave(false)
  }

  const onSubmit = async (values) => {
    const leaveDates = []
    const teamLead = []
    // eslint-disable-next-line no-param-reassign
    values.leave_dates = getAllDatesInRange(values.leave_dates)
    for (let i = 0; i <= values.leave_dates.length - 1; i += 1) {
      const changed = changeDate(values.leave_dates[i]).split('-').join('')
      leaveDates.push(changed)
    }
    for (let i = 0; i <= values.teams_leads.length - 1; i += 1)
      teamLead.push(values.teams_leads[i])

    const data = {
      status: 'publish',
      comment_status: 'closed',
      title: `${
        userDetail.user_display_name
      } Leave Application ${moment().format('YYYY-MM-DD')}`,
      content: values.leave_reason,
      meta: {
        wen_leave_user_relation: `${userDetail.user_id}`,
        half_day_leave_type: values.Half_day_type
          ? values.Half_day_type.label
          : '',
        leave_approved_message: '',
        team_leads: teamLead,
      },
      leave_type: [values.leave_type.value],
      leave_status: [150],
      leave_dates: leaveDates.join(','),
    }

    await props.putLmsLeave(data)
    handleReset()
    setAlertVisible(true)
  }
  const handleReset = () => {
    form.resetFields()
    setHalfLeave(false)
  }

  const copmareDatesForLeaveTypesCalendar = (currentDate, requiredDate) => {
    if (selectedLeaveTypes === 154 || typeof selectedLeaveTypes === 'undefined')
      return new Date(requiredDate) <= new Date(currentDate)
    if (selectedLeaveTypes === 153)
      return new Date(requiredDate) < new Date(currentDate)
    return false
  }

  return (
    <div className={styles.lms_apply_container}>
      {lmsLoading && <Loader />}
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <div className={styles.lms_apply_form}>
          <div className={styles.calendar_form}>
            <Form.Item
              label="Select Leave Dates"
              name="leave_dates"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
              style={{ marginLeft: '3px' }}
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
                  const comparedDate = copmareDatesForLeaveTypesCalendar(
                    currentDate,
                    requiredDate,
                  )

                  if (dates.includes(requiredDate) || weekend || comparedDate) {
                    return {
                      disabled: true,
                      style: { color: '#ccc' },
                    }
                  }
                  return {}
                }}
              />
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
                  rules={[{ required: true, message: 'Required' }]}
                  style={{ width: '100%' }}
                >
                  <Select
                    placeholder="Select Leave Type"
                    options={leaveFields.leave_type.map((x) => ({
                      label: x.name,
                      value: x.id,
                    }))}
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
                    rules={[{ required: true, message: 'Required' }]}
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      placeholder="select half leave type"
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
                rules={[{ required: true, message: 'Required' }]}
                style={{ width: '100%' }}
              >
                <Checkbox.Group
                  options={teamLeads.map((x) => ({
                    label: x.user_name,
                    value: x.user_email,
                  }))}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Leave Reason"
              name="leave_reason"
              rules={[{ required: true, message: 'Required' }]}
            >
              <FormField
                component="TextAreaField"
                rows={13}
                borderRadius="3px"
              />
            </Form.Item>
            <div className={styles.form_btns}>
              <Button
                btnText={`${lmsLoading ? 'Submitting' : 'Apply'}`}
                htmlType="submit"
                isDisabled={lmsLoading}
              />
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

const mapStateToProps = ({
  userData: { userDetail },
  lmsData: { lmsLoading, lmsLeaves, teamLeads },
  commonData: { leaveFields },
}) => ({ userDetail, leaveFields, lmsLoading, lmsLeaves, teamLeads })

export default connect(mapStateToProps, { putLmsLeave })(LmsApply)
