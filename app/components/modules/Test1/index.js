import React from 'react'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import Tab from 'components/elements/Tabs'

const ContentOne = () => (
  <div>
    <h1>Hey this is first Content</h1>
  </div>
)

const ContentTwo = () => (
  <div>
    <h1>Hey this is second Content</h1>
  </div>
)

const Test1 = () => {
  const [visible, setVisible] = React.useState(true)
  const [panes, setPane] = React.useState([
    {
      id: '1',
      tab: (
        <div style={{ background: 'yellow', color: 'red', fontSize: '2rem' }}>
          Tab 1
        </div>
      ),
      content: <ContentOne />,
    },
    {
      id: '2',
      tab: (
        <div style={{ background: 'green', color: 'pink', fontSize: '2rem' }}>
          Tab 2
        </div>
      ),
      content: <ContentTwo />,
      style: {
        background: 'blue',
        height: '122px',
        fontSize: '33px',
        width: '90%',
      },
    },
  ])
  return (
    <div>
      <div>
        <h1>Table</h1>
        <PaginateTable />
      </div>
      <div>
        <h1>Modal</h1>
        <button type="button" onClick={() => setVisible(true)}>
          Modal
        </button>

        <Modal
          visible={visible}
          handleOk={() => setVisible(false)}
          handleCancel={() => setVisible(false)}
          bodyStyle={{ color: 'purple', background: 'red' }}
          confirmText="Delete"
          cancelText="No"
          headerBackground="white"
          headerFontSize="1rem"
          headerTextColor="blue"
          footerBackground="white"
          variant="small"
        >
          These are the contents
        </Modal>
      </div>
      <div>
        <h1>Tabs</h1>
        <Tab
          tabBarStyle={{ background: 'blue', width: '90%' }}
          tabs={panes}
          style={{ background: 'ccff33' }}
        />
      </div>
    </div>
  )
}

export default Test1
