import React, { useState } from 'react'
import Link from 'next/link'
import { Row, Col, Input } from 'antd'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import { getDataDetail } from 'utils/commonFunctions'
import Detail from 'components/elements/Detail'
import FilterSection from './FilterSection'
import styles from './HomePage.module.css'

const HomePage = ({ projects, filterType }) => {
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState({})
  const [data, setData] = useState([])
  // console.clear()
  // console.log(projects)

  React.useEffect(() => {
    const mainData = projects.map((x, i) => ({
      key: i + 1,
      id: x.id,
      name: (
        <span
          className={styles.timeloglink}
          onClick={() => handleModal(getDataDetail(x))}
          aria-hidden="true"
        >
          {x.title.rendered}
        </span>
      ),
      time_log: (
        <Link href="/project/idoine">
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
      project_status: 'On Going', // x._embedded['wp:term'][2][0]?.name,
      project_type: 'Custom Build', // x._embedded['wp:term'][1][0]?.name,
      start_date: x.acf_fields.start_date,
      deadline: x.acf_fields.end_date,
    }))
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
      <FilterSection styles={styles} filterType={filterType} />
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
      />

      <Modal
        title={detail.name}
        visible={open}
        handleCancel={handleModal}
        confirmText="Delete"
        cancelText="No"
        variant="medium"
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

export default HomePage
