import React, { useState } from 'react'
import FormField from 'elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'
import { setFilterOptions } from 'utils/commonFunctions'
import useDidMountEffect from 'hooks/useDidMountEffect'

const type = { label: 'Show All Project Types', value: null }
const status = { label: 'Show All Project Status', value: null }
const client = { label: 'Show All Clients', value: null }
const developer = { label: 'Show All Developers', value: null }
const designer = { label: 'Show All Designers', value: null }

const HomePageForm = ({
  styles,
  filterType, // : { projectTypes, projectStatus, clients, developers, designers },
  setPageNumber,
  setPostPerPage,
  pageNumber,
  pageSize,
  filterProject,
}) => {
  const [search_project, setSearchProject] = useState('')
  const [projectTypes, setProjectTypes] = useState(type)
  const [projectStatus, setProjectStatus] = useState(status)
  const [allClients, setAllClients] = useState(client)
  const [allDevelopers, setAllDevelopers] = useState(developer)
  const [allDesigners, setAllDesigners] = useState(designer)
  const [searchValue, setSearchValue] = useState('')

  useDidMountEffect(() => {
    filterProject(
      search_project,
      projectTypes.value,
      projectStatus.value,
      allClients.value,
      allDevelopers.value,
      allDesigners.value,
      pageNumber,
      pageSize,
    )
  }, [
    search_project,
    projectTypes,
    projectStatus,
    allClients,
    allDevelopers,
    allDesigners,
    pageNumber,
    pageSize,
  ])

  const handleReset = () => {
    setProjectTypes(type)
    setProjectStatus(status)
    setAllClients(client)
    setAllDevelopers(developer)
    setAllDesigners(designer)
    setPageNumber(1)
    setPostPerPage(20)
    setSearchProject('')
    setSearchValue('')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchProject(searchValue)
  }

  return (
    <>
      <form className={styles.filterItems} onSubmit={handleSearch}>
        <div>
          <FormField
            component="InputField"
            placeholder="Search Projects"
            borderRadius="3px"
            width="190px"
            padding="7px"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
          <Button btnText="Search" htmlType="submit" />
        </div>
      </form>
      <div className={styles.filterItems}>
        <div>
          <Select
            placeholder="Show All Project Types"
            value={projectTypes}
            options={[type, ...filterType.projectTypes.map(setFilterOptions)]}
            onChange={(d) => setProjectTypes(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={projectStatus}
            options={[
              status,
              ...filterType.projectStatus.map(setFilterOptions),
            ]}
            onChange={(d) => setProjectStatus(d)}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={allClients}
            options={[client, ...filterType.clients.map(setFilterOptions)]}
            onChange={(d) => setAllClients(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Developers"
            value={allDevelopers}
            options={[
              developer,
              ...filterType.developers.map(setFilterOptions),
            ]}
            onChange={(d) => setAllDevelopers(d)}
          />
        </div>
        <div>
          <Select
            placeholder="All Designers"
            value={allDesigners}
            options={[designer, ...filterType.designers.map(setFilterOptions)]}
            onChange={(d) => setAllDesigners(d)}
          />
        </div>
        <div>
          <Button btnText="Reset" onClick={handleReset} />
        </div>
      </div>
    </>
  )
}

export default HomePageForm
