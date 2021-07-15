import React, { useState } from 'react'
import FormField from 'elements/Form'
import Button from 'components/elements/Button'
import Select from 'components/elements/Select'
import { setFilterOptions } from 'utils/commonFunctions'
import useDidMountEffect from 'hooks/useDidMountEffect'

const projectTypes = { label: 'Show All Project Types', value: null }
const projectStatus = { label: 'Show All Project Status', value: null }
const allClients = { label: 'Show All Clients', value: null }
const allDevelopers = { label: 'Show All Developers', value: null }
const allDesigners = { label: 'Show All Designers', value: null }

const HomePageForm = ({
  styles,
  filterType, // : { projectTypes, projectStatus, clients, developers, designers },
  page,
  setPage,
  filterProject,
  pathname,
}) => {
  const [search_project, setSearchProject] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [select, setSelect] = useState({
    projectTypes,
    projectStatus,
    allClients,
    allDevelopers,
    allDesigners,
  })

  useDidMountEffect(
    () =>
      filterProject(
        search_project,
        select.projectTypes.value,
        select.projectStatus.value,
        select.allClients.value,
        select.allDevelopers.value,
        select.allDesigners.value,
        page.pageNumber,
        page.postPerPage,
      ),
    [search_project, select, page],
  )

  const resetPage = () => setPage({ pageNumber: 1, postPerPage: 20 })

  const handleReset = () => {
    setSelect({
      projectTypes,
      projectStatus,
      allClients,
      allDevelopers,
      allDesigners,
    })
    resetPage()
    setSearchProject('')
    setSearchValue('')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchProject(searchValue)
    resetPage()
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
            value={select.projectTypes}
            options={[
              projectTypes,
              ...filterType.projectTypes.map(setFilterOptions),
            ]}
            onChange={(d) => {
              setSelect((th) => ({ ...th, projectTypes: d }))
              resetPage()
            }}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Project Status"
            value={select.projectStatus}
            options={[
              projectStatus,
              ...filterType.projectStatus.map(setFilterOptions),
            ]}
            onChange={(d) => {
              setSelect((th) => ({ ...th, projectStatus: d }))
              resetPage()
            }}
          />
        </div>
        <div>
          <Select
            placeholder="Show All Clients"
            value={select.allClients}
            options={[allClients, ...filterType.clients.map(setFilterOptions)]}
            onChange={(d) => {
              setSelect((th) => ({ ...th, allClients: d }))
              resetPage()
            }}
          />
        </div>
        {pathname && (
          <>
            <div>
              <Select
                placeholder="All Developers"
                value={select.allDevelopers}
                options={[
                  allDevelopers,
                  ...filterType.developers.map(setFilterOptions),
                ]}
                onChange={(d) => {
                  setSelect((th) => ({ ...th, allDevelopers: d }))
                  resetPage()
                }}
              />
            </div>
            <div>
              <Select
                placeholder="All Designers"
                value={select.allDesigners}
                options={[
                  allDesigners,
                  ...filterType.designers.map(setFilterOptions),
                ]}
                onChange={(d) => {
                  setSelect((th) => ({ ...th, allDesigners: d }))
                  resetPage()
                }}
              />
            </div>{' '}
          </>
        )}
        <div>
          <Button btnText="Reset" onClick={handleReset} />
        </div>
      </div>
    </>
  )
}

export default HomePageForm
