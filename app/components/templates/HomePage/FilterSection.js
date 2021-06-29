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
              { label: 'Contao(2)', value: '1' },
              { label: 'Custom build(6)', value: '2' },
              { label: 'Fixing(5)', value: '3' },
            ]}
            onChange={(d) => setProjectTypes(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={projectStatus}
            options={[
              { label: 'Show All Project Status', value: '1' },
              { label: 'Awaiting Response(122)', value: '2' },
              { label: 'Completed(3)', value: '3' },
              { label: 'On Going(12)', value: '4' },
              { label: 'On Hold(23)', value: '5' },
            ]}
            onChange={(d) => setProjectStatus(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={allClients}
            options={[
              { label: '360', value: '1' },
              { label: 'Avasant', value: '2' },
              { label: 'Cyber Family', value: '3' },
            ]}
            onChange={(d) => setAllClients(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Developers"
            value={allDevelopers}
            options={[
              { label: 'Rujal Sapkota', value: '1' },
              { label: 'Ashok Ganika', value: '2' },
              { label: 'Pariskrit Moktan', value: '3' },
              { label: 'Sagar Shrestha', value: '4' },
            ]}
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
