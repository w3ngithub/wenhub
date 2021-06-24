import React, { useState } from 'react'
import FormField from 'elements/Form'
import Button from 'elements/Button'
import Select from 'components/elements/Select'
const FilterSection = ({ styles }) => {
  const [projectTypes, setProjectTypes] = useState({})
  const [projectStatus, setProjectStatus] = useState({})
  const [allClients, setAllClients] = useState({})
  const [allDevelopers, setAllDevelopers] = useState({})
  const [allDesigners, setAllDesigners] = useState({})
  return (
    <>
      <div className={styles.filterItems}>
        <div>
          <FormField
            component="InputField"
            placeholder="Search Projects"
            borderRadius="3px"
            padding="0.4rem"
            value=""
          />
        </div>
        <div>
          <Button btnText="Search" />
        </div>
      </div>
      <div className={styles.filterItems}>
        <div>
          <Select
            placeholder="Show All Project Types"
            value={projectTypes}
            options={[{ label: 'haru', value: '1' }]}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={projectStatus}
            options={[]}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={allClients}
            options={[]}
          />
        </div>
        <div>
          <Select
            placeholder="All Developers"
            value={allDevelopers}
            options={[]}
          />
        </div>
        <div>
          <Select
            placeholder="All Designers"
            value={allDesigners}
            options={[]}
          />
        </div>
        <div>
          <Button btnText="Reset" />
        </div>
      </div>
    </>
  )
}

export default FilterSection
