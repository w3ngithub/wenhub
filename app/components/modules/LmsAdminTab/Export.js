import React from 'react'
import { Col, Row } from 'antd'
import { connect } from 'react-redux'
import FormField from 'elements/Form'
import SelectComponent from 'components/elements/Select'
import ListTable from 'components/elements/Table'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const Export = ({ developers, designers, lmsLoading }) => {
  const options = [
    ...developers.map((x) => ({ label: x.name, value: x.id })),
    ...designers.map((x) => ({ label: x.name, value: x.id })),
  ]
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <form className={styles.exportForm}>
          <span className={styles.labelStyle}>Date</span>
          <FormField component="DatePicker" isRange />

          <span className={styles.labelStyle}>Status</span>
          <SelectComponent
            placeholder="All"
            options={[
              { label: 'Pending', value: 150 },
              { label: 'Approved', value: 151 },
              { label: 'Cancelled', value: 152 },
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
            options={options}
            style={{
              textAlign: 'left',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              minWidth: '190px',
            }}
          />

          <div className={styles.exportFormAction}>
            <ButtonComponent
              htmlType="button"
              btnText="Filter"
              className={styles.filterButton}
            />
            <ButtonComponent htmlType="submit" btnText="Export" />
            <ButtonComponent htmlType="button" btnText="Reset" danger />
          </div>
        </form>
      </Col>
      <Col span={24}>
        <ListTable />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({
  commonData: {
    filterType: { developers, designers },
  },
  lmsData: { lmsLoading },
}) => ({
  developers,
  designers,
  lmsLoading,
})

export default connect(mapStateToProps)(Export)
