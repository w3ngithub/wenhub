import React from 'react'
import Link from 'next/link'
import { shallowEqual, useSelector } from 'react-redux'
import { projectDetailColumns } from 'constants/homeConstants'
import { getDataDetail } from 'utils/commonFunctions'
import TimeLog from 'components/modules/TimeLog'
import Tab from 'components/elements/Tabs'
import Details from 'components/elements/Detail'
import Checklist from 'components/modules/CheckList'
import styles from './styles.module.css'

function ProjectLog() {
  const { projectDetailForTimeLog } = useSelector(
    (state) => state.projectLog,
    shallowEqual,
  )
  const {
    filterType: {
      projectTypes,
      projectStatus,
      developers,
      designers,
      projectTags,
    },
  } = useSelector((state) => state.commonData, shallowEqual)

  const projectType = projectTypes.find(
    (y) => y?.id === projectDetailForTimeLog?.acf_fields?.project_type?.[0],
  )
  const projectStat = projectStatus.find(
    (y) => y?.id === projectDetailForTimeLog?.acf_fields?.project_status,
  )
  const developer = developers.filter(
    (y) =>
      projectDetailForTimeLog?.acf_fields?.developers !== false &&
      projectDetailForTimeLog?.acf_fields?.developers?.includes(y?.id),
  )
  const designer = designers.filter(
    (y) =>
      projectDetailForTimeLog?.acf_fields?.designers !== false &&
      projectDetailForTimeLog?.acf_fields?.designers?.includes(y?.id),
  )
  const projectTag = projectTags.filter(
    (y) =>
      projectDetailForTimeLog?.acf_fields?.project_tags !== false &&
      projectDetailForTimeLog?.acf_fields?.project_tags?.includes(y?.id),
  )
  const details = getDataDetail(
    projectDetailForTimeLog,
    projectType,
    projectStat,
    developer,
    designer,
    projectTag,
  )

  return (
    <div className={styles.time_log_container}>
      <div className={styles.time_log_header}>
        <h3>{projectDetailForTimeLog?.title?.rendered}</h3>
        <Link
          href={`https://wendevs.com/wenhub-rt/wp-admin/post.php?post=${projectDetailForTimeLog?.id}&action=edit`}
        >
          <h3 className={styles.timelog_edit}>Edit</h3>
        </Link>
      </div>

      <Tab
        type="card"
        tabBarStyle={{
          background: '#fff',
          width: 'auto',
          overFlowX: 'scroll',
          whiteSpace: 'nowrap',
        }}
        tabs={[
          {
            id: '1',
            tab: 'Time Log',
            content: (
              <TimeLog
                estimatedHours={
                  projectDetailForTimeLog.acf_fields?.estimated_hours
                }
              />
            ),
          },
          {
            id: '2',
            tab: 'Project Details',
            content: (
              <>
                <Details columns={projectDetailColumns} detail={details} />
              </>
            ),
          },
          { id: '3', tab: 'Checklist', content: <Checklist /> },
        ]}
        getKey={() => {}}
      />
    </div>
  )
}

export default ProjectLog
