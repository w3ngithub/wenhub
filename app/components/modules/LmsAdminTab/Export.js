import React from 'react'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const Export = () => (
  <form className={styles.exportForm}>
    <span className={styles.labelStyle}>Date</span>
    <FormField component="DatePicker" isRange />

    <span className={styles.labelStyle}>Status</span>
    <SelectComponent
      placeholder="All"
      // value={{ label: 'All', value: null }}
      options={[
        { label: 'All', value: null },
        { label: 'Rujal', value: 1 },
        { label: 'Ujjwal', value: 2 },
      ]}
      style={{
        textAlign: 'left',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        minWidth: '150px',
      }}
    />

    <span className={styles.labelStyle}>Select User</span>
    <SelectComponent
      placeholder="All"
      // value={{ label: 'All', value: null }}
      options={[
        { label: 'All', value: null },
        { label: 'Rujal', value: 1 },
        { label: 'Ujjwal', value: 2 },
      ]}
      style={{
        textAlign: 'left',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        minWidth: '190px',
      }}
    />

    <div className={styles.exportFormAction}>
      <ButtonComponent htmlType="submit" btnText="Export" />
      <ButtonComponent htmlType="button" btnText="Reset" danger />
    </div>
  </form>
)

export default Export
