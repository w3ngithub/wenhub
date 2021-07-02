import React, { useState } from 'react'
import FormField from 'elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'
import { setFilterOptions } from 'utils/commonFunctions'

const FilterSection = ({
  styles,
  filterType, // : { projectTypes, projectStatus, clients, developers, designers },
}) => {
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
            options={filterType.projectTypes.map(setFilterOptions)}
            onChange={(d) => setProjectTypes(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={projectStatus}
            options={filterType.projectStatus.map(setFilterOptions)}
            onChange={(d) => setProjectStatus(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={allClients}
            options={filterType.clients.map(setFilterOptions)}
            onChange={(d) => setAllClients(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Developers"
            value={allDevelopers}
            options={filterType.developers.map(setFilterOptions)}
            onChange={(d) => setAllDevelopers(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Designers"
            value={allDesigners}
            options={filterType.designers.map(setFilterOptions)}
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
