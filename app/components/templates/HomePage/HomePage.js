import React, { useState } from 'react'
import Link from 'next/link'
import { Card, Row, Col, Input } from 'antd'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import styles from './HomePage.module.css'
import Detail from './Detail'
import FilterSection from './FilterSection'

const columns = [
  { title: '#', keyIndex: 'key' },
  { title: 'Name', keyIndex: 'name' },
  { title: 'Time Log', keyIndex: 'time_log' },
  { title: 'Path', keyIndex: 'path' },
  { title: 'Project Status', keyIndex: 'project_status' },
  { title: 'Project Type', keyIndex: 'project_type' },
  { title: 'Start Date', keyIndex: 'start_date' },
  { title: 'Deadline', keyIndex: 'deadline' },
]

const HomePage = () => {
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState({})

  const handleModal = (d) => {
    if (open === true) {
      setOpen(false)
      setDetail({})
    } else {
      setOpen(true)
      setDetail(d)
    }
  }

  const data = [
    {
      key: '1',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '2',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '3',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '4',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '5',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '6',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '7',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '8',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '9',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '10',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.9rem',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
    {
      key: '11',
      name: (
        <span
          className={styles.timeloglink}
          onClick={() =>
            handleModal({
              key: '1',
              name: 'New Project',
              time_log: 'href',
              path: (
                <Input
                  size="large"
                  readOnly
                  value="W:\kickstartup-projects\combier"
                  onFocus={(e) => e.target.select()}
                  style={{
                    backgroundColor: '#eee',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                />
              ),
              project_status: 'On Going',
              project_type: 'Custom Build',
              start_date: '06/08/2021',
              deadline: '06/30/2021',
            })
          }
          aria-hidden="true"
        >
          New Project
        </span>
      ),
      time_log: (
        <Link href="https://github.com">
          <span className={styles.timeloglink}>Go to Log</span>
        </Link>
      ),
      path: (
        <Input
          size="large"
          readOnly
          value="W:\kickstartup-projects\combier"
          onFocus={(e) => e.target.select()}
          style={{ backgroundColor: '#eee', width: '250px' }}
        />
      ),
      project_status: 'On Going',
      project_type: 'Custom Build',
      start_date: '06/08/2021',
      deadline: '06/30/2021',
    },
  ]

  return (
    <>
      <FilterSection styles={styles} />
      <PaginateTable
        tableBodyStyle={{
          background: 'white',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        }}
        columns={columns}
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
              <Detail columns={columns} detail={detail} styles={styles} />
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default HomePage
