import React from 'react'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import Tab from 'components/elements/Tabs'
import Select from 'components/elements/Select'
import DropdownComponent from 'components/elements/Dropdown'
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
  const [personValue, setPerson] = React.useState([])
  const [panes, setPane] = React.useState([
    {
      id: '1',
      tab: 'Tab 1',
      content: <ContentOne />,
    },
    {
      id: '2',
      tab: 'Tab 2',
      content: <ContentTwo />,
      // paneStyle: {
      //   background: 'blue',
      //   height: '122px',
      //   fontSize: '33px',
      //   width: '90%',
      // },
    },
  ])
  return (
    <div>
      <div>
        <h1>Table</h1>
        <PaginateTable />
      </div>
      <div>
        <h1>Dropdown</h1>
        <DropdownComponent />
      </div>
      <div>
        <h1>Select</h1>
        <Select
          options={[
            { label: 'Hari', value: '0' },
            { label: 'Gita', value: '1' },
          ]}
          onChange={(data) => setPerson(data)}
          value={personValue}
          mode="multiple"
        />
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
          bodyStyle={{ color: 'black', background: 'white' }}
          confirmText="Delete"
          cancelText="No"
          variant="small"
        >
          These are the contents
        </Modal>
      </div>
      <div>
        <h1>Tabs</h1>
        <Tab
          type="editable-card"
          tabBarStyle={{ background: '#ddd', width: '100%' }}
          tabs={panes}
          // style={{ backgroundColor: '#ddd' }}
        />
      </div>
    </div>
  )
}

export default Test1
