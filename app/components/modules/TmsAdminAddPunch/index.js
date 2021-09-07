import React, { useState } from 'react'
import { IoMdTime } from '@react-icons/all-files/io/IoMdTime'
import { Checkbox } from 'antd'
import { VscSaveAs } from '@react-icons/all-files/vsc/VscSaveAs'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import LiveTime from 'components/elements/LiveTime'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

function TmsAdminAddPunch() {
  const [user, setUser] = useState({})

  return (
    <div className={styles.add_punch_container}>
      <div className={styles.punch_in}>
        <div className={styles.action}>
          <SelectComponent
            value={user}
            placeholder="Select User"
            options={[
              { label: 'All', value: '1' },
              { label: 'Ashok Ganika', value: '2' },
              { label: 'Mukesh Dhungana', value: '3' },
              { label: 'Rujal Sapkota', value: '4' },
              { label: 'Sagar Shrestha', value: '5' },
              { label: 'Pariskrit Moktan', value: '6' },
            ]}
            onChange={(val) => setUser(val)}
            style={{
              minWidth: '150px',
              textAlign: 'left',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            }}
          />
          <FormField
            component="DatePicker"
            placeholder="Select Date"
            style={{ padding: '5px' }}
          />
          <div className={styles.real_time}>
            <LiveTime />
            <IoMdTime style={{ fontSize: '16px' }} />
          </div>
        </div>
        <div className={styles.input}>
          <form>
            <label className={styles.form_label} htmlFor="punchInNote">
              Punch-in-note
            </label>
            <FormField
              component="InputField"
              padding="15px"
              styles={{ marginTop: '5px', width: '100%', padding: '20px' }}
            />
            <ButtonComponent
              btnText="Save"
              htmlType="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '20px',
              }}
              icon={<VscSaveAs style={{ fontSize: '16px' }} />}
            />
          </form>
        </div>
      </div>
      <div className={styles.punch_in}>
        <div className={styles.action}>
          <div className={styles.real_time}>
            <LiveTime />
            <IoMdTime style={{ fontSize: '16px' }} />
          </div>
          <Checkbox>Mid-day Exit</Checkbox>
        </div>
        <div className={styles.input}>
          <form>
            <label className={styles.form_label} htmlFor="punchInNote">
              Punch-out-note
            </label>
            <FormField
              component="InputField"
              padding="15px"
              styles={{ marginTop: '5px', width: '100%', padding: '20px' }}
            />
            <ButtonComponent
              btnText="Save"
              htmlType="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '20px',
              }}
              icon={<VscSaveAs style={{ fontSize: '16px' }} />}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default TmsAdminAddPunch
