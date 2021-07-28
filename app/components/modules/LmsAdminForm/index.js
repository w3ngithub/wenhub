import React from 'react'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const LmsAdminForm = () => {
  const [user, setUser] = React.useState({ label: 'All', value: null })

  return (
    <form className={styles.lms_admin_form}>
      <FormField component="DatePicker" isRange />
      <SelectComponent
        placeholder="All"
        value={user}
        options={[
          { label: 'All', value: null },
          { label: 'Rujal', value: 1 },
          { label: 'Ujjwal', value: 2 },
        ]}
        onChange={(d) => setUser(d)}
      />
      <ButtonComponent htmlType="submit" btnText="Filter" />
      <ButtonComponent htmlType="submit" btnText="Reset" />
    </form>
  )
}

export default LmsAdminForm