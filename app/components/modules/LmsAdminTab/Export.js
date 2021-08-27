import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Table } from 'antd'
import { connect } from 'react-redux'
import { CSVLink } from 'react-csv'
import moment from 'moment'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import { API_URL } from 'constants/constants'
import { openNotification } from 'utils/notification'
import restClient from 'api/restClient'
import Loader from 'components/elements/Loader'
import styles from './styles.module.css'

const Export = () => {
  const [form] = Form.useForm()

  const [allUsers, setAllUsers] = useState([])
  const [dataToExport, setDataToexport] = useState([])
  const [loading, setLoading] = useState(false)
  const [popData, setTotalandFileName] = useState({})

  const handleSubmit = (values) => {
    setLoading(true)
    const cleanValues = {
      date_from:
        values.Date !== '' ? moment(values.Date[0]).format('YYYYMMDD') : '',
      date_to:
        values.Date !== '' ? moment(values.Date[1]).format('YYYYMMDD') : '',
      user_id: values?.user.value || '',
      status: values?.status?.value || '',
    }
    restClient
      .post(`${API_URL}/lms/search_filter`, cleanValues)
      .then((response) => {
        const epxortedData = response.data
        setTotalandFileName(epxortedData.pop())
        setDataToexport(
          epxortedData
            .map((d) =>
              d.leave_dates.length > 1
                ? d.leave_dates.map((l) => ({
                    user_id: d.user_id,
                    applicant_name: d.applicant_name,
                    leave_dates: l,
                    leave_reason: d.leave_reason,
                    leave_type: d.leave_type,
                    status: d.status,
                    team_leads: d.team_leads,
                  }))
                : d,
            )
            .flat(),
        )
      })
      .catch((err) => {
        console.log(err)
        openNotification({
          type: 'error',
          message: err?.response?.data?.message || 'something went wrong!',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
  }, [])

  const handleReset = () => {
    form.resetFields()
    setDataToexport([])
    setTotalandFileName({})
  }

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            Date: '',
            status: { label: 'All', value: '' },
            user: { label: 'All', value: '' },
          }}
        >
          <div className={styles.exportForm}>
            <Form.Item label="Date" name="Date">
              <FormField
                component="DatePicker"
                isRange
                style={{
                  textAlign: 'left',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minWidth: '150px',
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item label="Status" name="status">
              <SelectComponent
                placeholder="All"
                options={[
                  { label: 'All', value: '' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Approved', value: 'approved' },
                  { label: 'Cancelled', value: 'cancelled' },
                ]}
                style={{
                  textAlign: 'left',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minWidth: '150px',
                }}
              />
            </Form.Item>

            <Form.Item label="User" name="user">
              <SelectComponent
                placeholder="All"
                options={[{ label: 'All', value: '' }, ...allUsers]}
                style={{
                  textAlign: 'left',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minWidth: '190px',
                }}
              />
            </Form.Item>
            <div className={styles.exportFormAction}>
              <ButtonComponent htmlType="submit" btnText="Filter" />
              <CSVLink
                filename={popData?.file_name}
                data={[
                  [
                    'Applicants name',
                    'Leave Type',
                    'Leave Date',
                    'Leave Reason',
                    'Leave Status',
                  ],
                  ...dataToExport?.map((d) => [
                    d?.applicant_name,
                    d?.leave_type,
                    d?.leave_dates?.toString(),
                    d?.leave_reason,
                    d?.status,
                  ]),
                  ['Total :', popData?.total],
                ]}
              >
                <ButtonComponent
                  htmlType="button"
                  btnText="Export"
                  isDisabled={dataToExport.length === 0}
                />
              </CSVLink>
              <ButtonComponent
                htmlType="button"
                btnText="Reset"
                onClick={handleReset}
                danger
              />
            </div>
          </div>
        </Form>
      </Col>
      {loading && <Loader />}

      {dataToExport.length && (
        <div className={styles.responsiveLmsAdminTable}>
          <Table
            footer={() => <strong>Total: {popData?.total}</strong>}
            pagination={false}
            columns={[
              {
                key: 'ApplicantsName',
                title: 'Applicants name',
                keyIndex: 'ApplicantsName',
                dataIndex: 'ApplicantsName',
              },
              {
                key: 'LeaveType',
                title: 'Leave Type',
                keyIndex: 'LeaveType',
                dataIndex: 'LeaveType',
              },
              {
                key: 'LeaveDate',
                title: 'Leave Date',
                keyIndex: 'LeaveDate',
                dataIndex: 'LeaveDate',
              },
              {
                key: 'LeaveReason',
                title: 'Leave Reason',
                keyIndex: 'LeaveReason',
                dataIndex: 'LeaveReason',
              },
              {
                key: 'LeaveStatus',
                title: 'Leave Status',
                keyIndex: 'LeaveStatus',
                dataIndex: 'LeaveStatus',
              },
            ]}
            tableBodyStyle={{ backgroundColor: '#fff' }}
            dataSource={dataToExport?.map((d, i) => ({
              key: i,
              ApplicantsName: d?.applicant_name,
              LeaveType: d?.leave_type,
              LeaveReason: d?.leave_reason,
              LeaveStatus: d?.status,
              LeaveDate: d?.leave_dates?.toString(),
            }))}
          />
        </div>
      )}
    </Row>
  )
}

const mapStateToProps = ({ lmsData: { lmsLoading } }) => ({
  lmsLoading,
})

export default connect(mapStateToProps)(Export)
