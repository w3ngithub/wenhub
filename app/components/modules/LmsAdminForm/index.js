import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import {
  fetchLmsApproved,
  fetchLmsCancelled,
  fetchLmsPending,
  filteredLeaveFetch,
  lmsAdminFormAction,
  resetIsLeaveFilter,
} from 'redux/lms/lmsActions'
import styles from './styles.module.css'

const LmsAdminForm = () => {
  const { allUsers } = useSelector((state) => state.lmsData, shallowEqual)
  const [filterDate, setFilterDate] = useState([])
  const [filterUser, setFilterUser] = useState({ label: 'All', value: '' })

  const dispatch = useDispatch()

  const handleChangeUser = (e) => {
    setFilterUser(e)
  }
  const handleChangeDate = (e) => {
    setFilterDate(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanValues = {
      date_from:
        filterDate?.length !== 0
          ? moment(filterDate[0]).format('YYYYMMDD')
          : '',
      date_to:
        filterDate?.length !== 0
          ? moment(filterDate[1]).format('YYYYMMDD')
          : '',
      user_id: filterUser?.value || '',
      status: '',
    }
    dispatch(lmsAdminFormAction(cleanValues))
    await dispatch(filteredLeaveFetch(cleanValues))
  }

  const handleReset = () => {
    setFilterDate([])
    setFilterUser({ label: 'All', value: '' })
    dispatch(fetchLmsPending(1, 10, 150))
    dispatch(fetchLmsApproved(1, 10, 151))
    dispatch(fetchLmsCancelled(1, 10, 152))
    dispatch(resetIsLeaveFilter())
  }

  return (
    <form className={styles.lms_admin_form} onSubmit={handleSubmit}>
      <FormField
        component="DatePicker"
        isRange
        onChange={handleChangeDate}
        value={filterDate}
      />
      <SelectComponent
        options={
          [
            { label: 'All', value: '' },
            ...allUsers?.map((user) => ({ label: user.name, value: user.id })),
          ] || []
        }
        value={filterUser}
        style={{
          fontSize: '0.7rem',
          fontWeight: 'bold',
          textAlign: 'left',
          minWidth: '190px',
        }}
        onChange={handleChangeUser}
      />
      <div className={styles.lms_admin_form_action}>
        <ButtonComponent htmlType="submit" btnText="Filter" />
        <ButtonComponent
          htmlType="button"
          btnText="Reset"
          danger
          onClick={handleReset}
        />
      </div>
    </form>
  )
}

export default LmsAdminForm
