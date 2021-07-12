import React from 'react'
import Tab from 'components/elements/Tabs'
import Pending from './Pending'
import Approved from './Approved'
import Cancelled from './Cancelled'
import Export from './Export'
import OnLeave from './OnLeave'
import AddLeave from './AddLeave'
import UserLeaves from './UserLeaves'
import Users from './Users'

const LmsAdminTab = ({ getKey }) => {
  return (
    <Tab
      type="card"
      tabBarStyle={{
        background: '#fff',
        width: '100%',
        overFlowX: 'scroll',
        whiteSpace: 'nowrap',
      }}
      tabs={[
        {
          id: '1',
          tab: 'Pending',
          content: <Pending />,
        },
        {
          id: '2',
          tab: 'Approved',
          content: <Approved />,
        },
        {
          id: '3',
          tab: 'Cancelled',
          content: <Cancelled />,
        },
        {
          id: '4',
          tab: 'Export',
          content: <Export />,
        },
        {
          id: '5',
          tab: 'On Leave',
          content: <OnLeave />,
        },
        {
          id: '6',
          tab: 'Add Leave',
          content: <AddLeave />,
        },
        {
          id: '7',
          tab: 'User Leaves',
          content: <UserLeaves />,
        },
        {
          id: '8',
          tab: 'Users',
          content: <Users />,
        },
      ]}
      getKey={getKey}
    />
  )
}

export default LmsAdminTab
