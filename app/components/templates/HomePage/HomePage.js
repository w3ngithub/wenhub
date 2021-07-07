import React, { useState } from 'react'
import Link from 'next/link'
import { Row, Col, Input } from 'antd'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import { getDataDetail } from 'utils/commonFunctions'
import { connect } from 'react-redux'
import Detail from 'components/elements/Detail'
import { fetchFilteredProject } from 'redux/project/projectActions'
import FilterSection from './FilterSection'
import styles from './HomePage.module.css'

const HomePage = ({ projects, filterType, totalData, ...props }) => {
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState({})
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [postPerPage, setPostPerPage] = useState(20)

  React.useEffect(() => {
    const mainData = projects.map((x, i) => {
      const {
        projectTypes,
        projectStatus,
        developers,
        designers,
        projectTags,
      } = filterType

      const projectType = projectTypes.find(
        (y) => y?.id === x?.acf_fields?.project_type[0],
      )
      const projectStat = projectStatus.find(
        (y) => y?.id === x?.acf_fields?.project_status,
      )

      const developer = developers.filter(
        (y) =>
          x?.acf_fields?.developers !== false &&
          x?.acf_fields?.developers.includes(y?.id),
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
        key: i + 1,
        id: x.id,
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
          <Link
            href={`/project/${x.title.rendered
              .split(' ')
              .join('-')
              .toLowerCase()}`}
          >
            <span className={styles.timeloglink}>Go to Log</span>
          </Link>
        ),
        path: (
          <Input
            size="large"
            readOnly
            value={x.acf_fields.project_link}
            onFocus={(e) => e.target.select()}
            style={{ backgroundColor: '#eee', width: '250px' }}
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

  const handlePagination = (pgNo, pgSize) => {
    setPageNumber(pgNo)
    setPostPerPage(pgSize)
  }

  return (
    <>
      <FilterSection
        styles={styles}
        filterType={filterType}
        pageNumber={pageNumber}
        pageSize={postPerPage}
        filterProject={props.fetchFilteredProject}
        setPageNumber={setPageNumber}
        setPostPerPage={setPostPerPage}
      />
      <PaginateTable
        tableBodyStyle={{
          background: 'white',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        }}
        columns={[
          { title: '#', keyIndex: 'key' },
          { title: 'Name', keyIndex: 'name' },
          { title: 'Time Log', keyIndex: 'time_log' },
          { title: 'Path', keyIndex: 'path' },
          { title: 'Project Status', keyIndex: 'project_status' },
          { title: 'Project Type', keyIndex: 'project_type' },
          { title: 'Start Date', keyIndex: 'start_date' },
          { title: 'Deadline', keyIndex: 'deadline' },
        ]}
        data={data}
        handlePagination={handlePagination}
        currentPage={pageNumber}
        postPerPage={postPerPage}
        totalData={totalData}
      />

      <Modal
        title={detail.name}
        visible={open}
        handleCancel={handleModal}
        confirmText="Delete"
        cancelText="No"
        variant="large"
      >
        <div className={`${styles.containerFluid}`}>
          <Row>
            <Col span={24}>
              <Detail
                columns={[
                  { title: 'Path', keyIndex: 'path' },
                  { title: 'Project Status', keyIndex: 'project_status' },
                  { title: 'Live Url', keyIndex: 'live_url' },
                  { title: 'Staging Url(s)', keyIndex: 'staging_url' },
                  { title: 'Start Date', keyIndex: 'start_date' },
                  { title: 'Deadline', keyIndex: 'deadline' },
                  { title: 'Project Type', keyIndex: 'project_type' },
                  { title: 'Project Tags', keyIndex: 'project_tags' },
                  { title: 'Developers', keyIndex: 'developers' },
                  { title: 'Designers', keyIndex: 'designers' },
                  { title: 'Important Notes', keyIndex: 'important_notes' },
                ]}
                detail={detail}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

const mapStateToProps = ({
  projectData: { projects, loading, error, totalData },
  commonData: { filterType },
}) => ({
  projects,
  loading,
  error,
  filterType,
  totalData,
})

export default connect(mapStateToProps, { fetchFilteredProject })(HomePage)
