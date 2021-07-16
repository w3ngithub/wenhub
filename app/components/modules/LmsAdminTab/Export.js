import React from 'react'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const Export = () => (
  <form className={styles.exportForm}>
    <div>
      <span className={styles.labelStyle}>Date</span>
      <FormField component="DatePicker" isRange />
    </div>
    <div>
      <span className={styles.labelStyle}>Status</span>
      <SelectComponent
        placeholder="All"
        // value={{ label: 'All', value: null }}
        options={[
          { label: 'All', value: null },
          { label: 'Rujal', value: 1 },
          { label: 'Ujjwal', value: 2 },
        ]}
      />
    </div>

    <div>
      <span className={styles.labelStyle}>Select User</span>
      <SelectComponent
        placeholder="All"
        // value={{ label: 'All', value: null }}
        options={[
          { label: 'All', value: null },
          { label: 'Rujal', value: 1 },
          { label: 'Ujjwal', value: 2 },
        ]}
      />
    </div>
    <ButtonComponent htmlType="submit" btnText="Export" />
    <ButtonComponent htmlType="submit" btnText="Reset" />
  </form>
)

export default Export
