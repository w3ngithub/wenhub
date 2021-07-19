import React from 'react'
import Link from 'next/link'
import TimeLog from 'components/modules/TimeLog'
import Tab from 'components/elements/Tabs'
import Details from 'components/elements/Detail'
import FormField from 'components/elements/Form'
import Checklist from 'components/modules/CheckList'
import styles from './styles.module.css'

function ProjectLog() {
  return (
    <div className={styles.time_log_container}>
      <div className={styles.time_log_header}>
        <h3>Kiosk</h3>
        <Link href="https://developer.wordpress.org/rest-api/">
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
            content: <TimeLog />,
          },
          {
            id: '2',
            tab: 'Project Details',
            content: (
              <Details
                columns={[
                  { title: 'PATH', keyIndex: 'path' },
                  { title: 'STATUS', keyIndex: 'status' },
                  { title: 'LIVE URL', keyIndex: 'live_url' },
                  { title: 'STAGING URL(S)', keyIndex: 'staging_urls' },
                  { title: 'START DATE', keyIndex: 'start_date' },
                  { title: 'DEADLINE', keyIndex: 'deadline' },
                  { title: 'PROJECT TAGS', keyIndex: 'project_tags' },
                  { title: 'DEVELPOERS', keyIndex: 'developers' },
                  { title: 'DESIGNERS', keyIndex: 'designers' },
                  { title: 'IMPORTANT NOTES', keyIndex: 'notes' },
                ]}
                detail={{
                  path: (
                    <FormField
                      component="InputField"
                      size="large"
                      readOnly
                      value="W:\kickstartup-projects\combier"
                      onFocus={(e) => e.target.select()}
                      styles={{ backgroundColor: '#eee', width: '100%' }}
                    />
                  ),
                  status: 'New Project',
                  live_url: 'fdsfdf',
                  staging_urls: 'dsdfdsfd',
                  start_date: 'On Going',
                  deadline: 'Custom Build',
                  project_tags: '06/08/2021',
                  developers: '06/30/2021',
                  designers: '06/30/2021',
                  notes: '06/30/2021',
                }}
              />
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
