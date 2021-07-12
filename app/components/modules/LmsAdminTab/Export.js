import React from 'react'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const Export = () => {
  return (
    <form className={styles.exportForm}>
      <label className={styles.labelStyle}>Date</label>
      <FormField component="DatePicker" isRange />
      <label className={styles.labelStyle}>Status</label>
      <SelectComponent
        placeholder="All"
        value={{ label: 'All', value: null }}
        options={[
          { label: 'All', value: null },
          { label: 'Rujal', value: 1 },
          { label: 'Ujjwal', value: 2 },
        ]}
      />
      <label className={styles.labelStyle}>Select User</label>
      <SelectComponent
        placeholder="All"
        value={{ label: 'All', value: null }}
        options={[
          { label: 'All', value: null },
          { label: 'Rujal', value: 1 },
          { label: 'Ujjwal', value: 2 },
        ]}
      />
      <ButtonComponent htmlType="submit" btnText="Export" />
      <ButtonComponent htmlType="submit" btnText="Reset" />
    </form>
  )
}

export default Export
