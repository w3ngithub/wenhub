import React, { useState } from 'react'
import FormField from 'elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'

const FilterSection = ({ styles }) => {
  const [projectTypes, setProjectTypes] = useState({})
  const [projectStatus, setProjectStatus] = useState({
    label: 'Show all project status',
    value: '3',
  })

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
            width="190px"
            padding="7px"
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
            options={[
              { label: 'haru', value: '1' },
              { label: 'gita', value: '2' },
            ]}
            onChange={(d) => setProjectTypes(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={projectStatus}
            options={[
              { label: 'Show all project status', value: '3' },
              { label: 'haru', value: '1' },
              { label: 'gita', value: '2' },
            ]}
            onChange={(d) => setProjectStatus(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={allClients}
            options={[]}
            onChange={(d) => setAllClients(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Developers"
            value={allDevelopers}
            options={[]}
            onChange={(d) => setAllDevelopers(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Designers"
            value={allDesigners}
            options={[]}
            onChange={(d) => setAllDesigners(d)}
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
