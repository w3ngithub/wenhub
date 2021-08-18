import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Input } from 'antd'
import { connect } from 'react-redux'
import PaginateTable from 'components/modules/PaginateTable'
import { getDataDetail } from 'utils/commonFunctions'
import { fetchFilteredProject } from 'redux/project/projectActions'
import HomePageForm from 'modules/HomePageForm'
import ModalDetail from 'components/modules/ModalDetail'
import { projectColumns, projectDetailColumns } from 'constants/homeConstants'
import styles from './HomePage.module.css'

const HomePage = ({
  projects,
  filterType,
  totalData,
  userDetail,
  ...props
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState({})
  const [data, setData] = useState([])
  const [page, setPage] = useState({ pageNumber: 1, postPerPage: 20 })
  const pathname = !router.pathname.includes('my-projects')

  const { projectTypes, projectStatus, developers, designers, projectTags } =
    filterType

  React.useEffect(() => {
    const mainData = projects.map((x, i) => {
      const projectType = projectTypes.find(
        (y) => y?.id === x?.acf_fields?.project_type?.[0],
      )
      const projectStat = projectStatus.find(
        (y) => y?.id === x?.acf_fields?.project_status,
      )

      const developer = developers.filter(
        (y) =>
          x?.acf_fields?.developers !== false &&
          x?.acf_fields?.developers?.includes(y?.id),
      )
      const designer = designers.filter(
        (y) =>
          x?.acf_fields?.designers !== false &&
          x?.acf_fields?.designers?.includes(y?.id),
      )
      const projectTag = projectTags.filter(
        (y) =>
          x?.acf_fields?.project_tags !== false &&
          x?.acf_fields?.project_tags?.includes(y?.id),
      )

      return {
        key: x.id,
        dataId: page.postPerPage * page.pageNumber - page.postPerPage + (i + 1),
        name: (
          <span
            className={styles.timeloglink}
            onClick={() =>
              handleModal(
                getDataDetail(
                  x,
                  projectType,
                  projectStat,
                  developer,
                  designer,
                  projectTag,
                ),
              )
            }
            aria-hidden="true"
          >
            {x.title.rendered}
          </span>
        ),
        time_log: (
          <Link href={{ pathname: `/project/${x.id}` }}>
            <span className={styles.timeloglink}>Go to Log</span>
          </Link>
        ),
        path: (
          <Input
            size="large"
            readOnly
            value={x.acf_fields.project_link}
            onFocus={(e) => e.target.select()}
            style={{ backgroundColor: '#eee', width: '205px' }}
          />
        ),
        project_status: projectStat?.name,
        project_type: projectType?.name,
        start_date: x.acf_fields.start_date,
        deadline: x.acf_fields.end_date,
      }
    })
    setData(mainData)
  }, [projects])

  const handleModal = (d) => {
    if (open === true) {
      setOpen(false)
      setDetail({})
    } else {
      setOpen(true)
      setDetail(d)
    }
  }

  return (
    <>
      {!pathname && (
        <div className={styles.entry_header}>
          <h1 style={{ margin: 0 }}>My Projects</h1>
        </div>
      )}
      <HomePageForm
        styles={styles}
        filterType={filterType}
        filterProject={props.fetchFilteredProject}
        page={page}
        setPage={setPage}
        pathname={pathname}
        userDetail={userDetail}
        developers={developers}
        designers={designers}
      />
      <PaginateTable
        columns={projectColumns}
        data={data}
        handlePagination={(pgNo, pgSize) =>
          setPage({ pageNumber: pgNo, postPerPage: pgSize })
        }
        currentPage={page.pageNumber}
        postPerPage={page.postPerPage}
        totalData={totalData}
      />
      {!pathname && (
        <div>
          <span>Edit</span>
        </div>
      )}
      <ModalDetail
        title={detail.name}
        visible={open}
        handleCancel={handleModal}
        variant="large"
        columns={projectDetailColumns}
        detail={detail}
      />
    </>
  )
}

const mapStateToProps = ({
  projectData: { projects, loading, error, totalData },
  commonData: { filterType },
  userData: { userDetail },
}) => ({
  projects,
  loading,
  error,
  filterType,
  totalData,
  userDetail,
})

export default connect(mapStateToProps, { fetchFilteredProject })(HomePage)
